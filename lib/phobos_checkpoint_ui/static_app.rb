module PhobosCheckpointUI
  class StaticApp < Sinatra::Base
    class << self
      attr_accessor :configs
    end

    SESSION_KEY = '_phobos_checkpoint_ui'
    NO_AUTH = %w(
      /ping
      /auth/saml
      /auth/failure
      /auth/saml/callback
    ).freeze

    set :logging, nil
    set :show_exceptions, false
    set :public_folder, -> { File.join(Dir.pwd, 'public') }

    configure do
      PhobosCheckpointUI.configure

      if PhobosCheckpointUI.config.dig(:saml).present?
        require 'omniauth'
        require 'omniauth-saml'
        require 'sinatra/cookies'

        set(:sessions, key: SESSION_KEY, expire_after: 1_800) # 30 min in seconds
        set(:session_secret, PhobosCheckpointUI.config.dig(:session_secret))

        use OmniAuth::Strategies::SAML, PhobosCheckpointUI.config.dig(:saml)
        helpers Sinatra::Cookies
      end
    end

    before do
      cache_control :no_cache

      if PhobosCheckpointUI.config.dig(:saml).present?
        return if no_auth_path? || signed_in?
        return reply_unauthorized if api_request?
        return reply_redirect_to_login
      end
    end

    get '/configs' do
      content_type :json
      self.class.configs.to_json
    end

    post '/auth/saml/callback' do
      origin         = cookies.delete(:origin)
      session[:user] = omniauth_data
      redirect to(origin || '/')
    end

    get '/logout' do
      session[:user] = nil
      redirect to(PhobosCheckpointUI.config.dig(:saml, :idp_logout_url))
    end

    get '/api/*' do
      env['PATH_INFO'] = env['PATH_INFO'].sub(/^\/api/, '')
      status, headers, body = app.call(env)
      @response.status = status
      @response.body = body
      @response.headers.merge! headers
      nil
    end

    get '/*' do
      send_file File.join(settings.public_folder, 'index.html')
    end

    private

    def no_auth_path?
      NO_AUTH.include?(request.path)
    end

    def api_request?
      !!(request.path_info =~ %r{^/api})
    end

    def reply_unauthorized
      content_type :json
      halt 401, { error: 'Unauthorized' }.to_json
    end

    def reply_redirect_to_login
      cookies[:origin] = request.fullpath
      redirect to('/auth/saml')
    end

    def signed_in?
      !session[:user].nil?
    end

    def omniauth_data
      request.env['omniauth.auth']
    end
  end
end
