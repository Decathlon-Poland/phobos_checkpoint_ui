require 'spec_helper'
require 'phobos_checkpoint_ui/tasks'

RSpec.describe PhobosCheckpointUI::App do
  include Rack::Test::Methods

  class TestAPIApp < Sinatra::Base
    get('/v1/events') { 'api_app' }
  end

  def app
    PhobosCheckpointUI::App.new(TestAPIApp)
  end

  before(:context) do
    Rake.application['phobos_checkpoint_ui:copy_assets'].invoke
    expect(Dir.exists?('public')).to eql true
  end

  after(:context) do
    FileUtils.rm_rf('public')
  end

  let(:public_dir) do
    File.expand_path(File.join(File.dirname(__FILE__), '../../public'))
  end

  describe '/' do
    it 'points to static app' do
      get '/'
      expect(last_response.body).to eql File.read(File.join(public_dir, 'index.html'))

      get '/another'
      expect(last_response.body).to eql File.read(File.join(public_dir, 'index.html'))
    end
  end

  describe '/api' do
    it 'points to the configured API app' do
      get '/api/v1/events'
      expect(last_response.body).to eql 'api_app'
    end
  end
end
