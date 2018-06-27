require 'spec_helper'
require 'phobos_db_checkpoint/events_api'

RSpec.describe 'Session requests' do
  include Rack::Test::Methods

  class TestPhobosDbCheckpointDatabaseMiddlewareApp
    def call(request_env); end
  end

  def app
    PhobosCheckpointUI::StaticApp.new(
      TestPhobosDbCheckpointDatabaseMiddlewareApp
    )
  end

  before do
    OmniAuth.config.mock_auth[:saml] = oauth_payload

    def session
      last_request.env['rack.session']
    end

    def cookies
      rack_mock_session.cookie_jar
    end
  end

  describe 'authentication' do
    {
      '/ping' => :get,
      '/auth/saml' => :get,
      '/auth/failure' => :get,
      '/auth/saml/callback' => :post
    }.each do |no_auth_path, http_method|
      context "for the NO_AUTH path #{no_auth_path}" do
        it 'does not require authentication' do
          public_send(http_method, no_auth_path)

          expect(last_response.status).to_not eql(401)
        end
      end
    end

    context 'for routes requiring authentication' do
      it 'returns status 401 UNAUTHORIZED when not authorized for api requests' do
        get '/api/v1/events/1'

        expect(last_response.status).to eql(401)
        expect(last_response.body).to eql({ error: 'Unauthorized' }.to_json)
      end

      describe 'when not authorized for page requests' do
        before do
          def cookies
            rack_mock_session.cookie_jar
          end

          get '/some-page?param=true'
        end

        it 'redirects to the authentication page' do
          expect(last_response.status).to eql(302)
          expect(last_response.headers['Location']).to eql('http://example.org/auth/saml')
        end

        it 'creates origin cookie with original location' do
          expect(cookies['origin']).to eql '/some-page?param=true'
        end
      end
    end
  end

  describe 'GET /auth/saml' do
    it 'redirects to SSO' do
      get '/auth/saml'
      expect(last_response.status).to eql 302
      expect(last_response.headers['Location']).to eql('http://example.org/auth/saml/callback')
    end
  end

  describe 'POST /auth/saml/callback' do
    it 'redirects the user to where they were trying to go' do
      get '/some-url?param=true'
      follow_redirect!
      post last_response.headers['Location']
      expect(last_response.headers['Location']).to eql('http://example.org/some-url?param=true')
      expect(cookies['origin']).to be_empty
    end

    it 'signs in the user' do
      post '/auth/saml/callback'
      expect(session[:user]).to eq(
        {
          user: { username: 'checkpoint_ui_user' }
        }
      )
    end
  end

  describe 'GET /logout' do
    it 'clears the session and redirects to the IDP logout page' do
      login
      get '/logout'

      expect(session[:user]).to eql(nil)
      expect(last_response.status).to eql(302)
      expect(last_response.headers['Location']).to eql("http://example.org/#{PhobosCheckpointUI.config.dig(:saml, :idp_logout_url)}")
      expect(last_response.headers['Cache-Control']).to eql 'no-cache'
    end
  end
end
