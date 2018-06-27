require 'spec_helper'

RSpec.describe PhobosCheckpointUI::App do
  include Rack::Test::Methods

  class TestAPIApp < Sinatra::Base
    get('/v1/events') { 'api_app' }
  end

  class CustomSamlHandler
    def initialize(data)
      @omniauth_data = data
    end

    def self.authorized?(user_json)
      user = JSON(user_json)

      ['foo'].any? do |group|
        user.dig('member_of').include?(group)
      end
    end

    def self.username(user_json)
      JSON(user_json).dig('username')
    end

    def user
      return @user if @user

      email = @omniauth_data.dig(:info, :email)
      raw_info = @omniauth_data.dig(:extra, :raw_info)
      @user = {
        username: email.split('@').first,
        first_name: raw_info.attributes['givenName'].first,
        family_name: raw_info.attributes['sn'].first,
        email: email,
        member_of: groups_from(raw_info)
      }
    end

    private

    def groups_from(raw_info)
      groups = raw_info.attributes['memberOf']
      group_name_from(groups)
    end

    def group_name_from(groups)
      groups.map { |group| extract_group_name(group) }
    end

    def extract_group_name(group)
      match = group.match(/CN=(ldap-)?(?<group_name>.+?),/i)
      match[:group_name]
    end
  end

  def app
    PhobosCheckpointUI::App.new(
      TestAPIApp,
      {},
      CustomSamlHandler
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
      "username"=>"bob.hope",
      "first_name"=>"Bob",
      "family_name"=>"Hope",
      "email"=>"bob.hope@example.com",
      "member_of"=>["foo"]
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
