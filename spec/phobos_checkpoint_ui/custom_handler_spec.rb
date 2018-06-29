require 'spec_helper'

RSpec.describe PhobosCheckpointUI::App do
  include Rack::Test::Methods

  class TestAPIApp < Sinatra::Base
    get('/v1/events') { 'api_app' }
  end

  class CustomSamlHandler < PhobosCheckpointUI::SamlHandler
    def user
      { username: 'my customer user' }
    end
  end

  def app
    PhobosCheckpointUI::App.new(
      api_app: TestAPIApp,
      saml_handler: CustomSamlHandler
    )
  end

  before do
    def session
      last_request.env['rack.session']
    end

    login(CustomSamlHandler)
  end

  let(:user_json) do
    {
      "username"=>"my customer user",
    }
  end

  describe 'POST /auth/saml/callback' do
    it 'signs in the user' do
      post '/auth/saml/callback'

      expect(session[:user]).to eq(
        user_json.to_json
      )
    end
  end

  describe 'GET /api/session' do
    it 'returns the session' do
      get '/api/session'

      expect(last_response.body).to eq(
        {
          "user" => user_json
        }.to_json
      )
    end
  end
end
