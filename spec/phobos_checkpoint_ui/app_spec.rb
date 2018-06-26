require 'spec_helper'

RSpec.describe PhobosCheckpointUI::App do
  include Rack::Test::Methods

  class TestAPIApp < Sinatra::Base
    get('/v1/events') { 'api_app' }
  end

  def app
    PhobosCheckpointUI::App.new(TestAPIApp, configs)
  end

  before do
    Rake.application['phobos_checkpoint_ui:copy_assets'].reenable
    Rake.application['phobos_checkpoint_ui:copy_assets'].invoke
    expect(Dir.exists?('public')).to eql true
    login
  end

  after do
    FileUtils.rm_rf('public')
  end

  let(:configs) { Hash(key: 'value') }

  let(:public_dir) do
    File.expand_path(File.join(File.dirname(__FILE__), '../../public'))
  end

  it 'configures StaticApp' do
    PhobosCheckpointUI::StaticApp.configs = nil
    PhobosCheckpointUI::App.new(TestAPIApp, configs)
    expect(PhobosCheckpointUI::StaticApp.configs).to eql configs
  end

  describe 'GET /' do
    it 'points to static app' do
      get '/'
      expect(last_response.body).to eql File.read(File.join(public_dir, 'index.html'))

      get '/another'
      expect(last_response.body).to eql File.read(File.join(public_dir, 'index.html'))
    end
  end

  describe 'GET /ping' do
    it 'responds with 200 PONG' do
      get '/ping'
      expect(last_response.status).to eql 200
      expect(last_response.body).to eql('PONG')
    end
  end

  describe 'GET /api' do
    it 'points to the configured API app' do
      get '/api/v1/events'
      expect(last_response.body).to eql 'api_app'
    end
  end
end
