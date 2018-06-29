module PhobosCheckpointUI
  class StaticApp < Sinatra::Base
    class << self
      attr_accessor :configs
    end

    def initialize(app = nil, saml_handler = SamlHandler)
      super()
      @app = app
      @saml_handler = saml_handler
      @template_cache = Tilt::Cache.new
      yield self if block_given?
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

      if PhobosCheckpointUI.use_saml?
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

      if PhobosCheckpointUI.use_saml?
        return if no_auth_path?

        if api_request?
          return reply_unauthorized if !signed_in?
          return reply_forbidden unless @saml_handler.authorized?(session[:user])
        end

        return reply_redirect_to_login if !signed_in?
        request.env['REMOTE_USER'] = @saml_handler.username(session[:user])
      end
    end

    get '/configs' do
      content_type :json
      self.class.configs.to_json
    end

   if PhobosCheckpointUI.use_saml?
     post '/auth/saml/callback' do
      origin         = cookies.delete(:origin)
      session[:user] = @saml_handler.new(omniauth_data).user.to_json
      redirect to(origin || '/')
    end

    get '/logout' do
      session[:user] = nil
      redirect to(PhobosCheckpointUI.config.dig(:saml, :idp_logout_url))
    end

    get '/api/session' do
      content_type :json

      { user: JSON(session[:user]) }.to_json
    end
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

    def reply_forbidden
      content_type :json
      halt 403, { error: 'Forbidden' }.to_json
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
