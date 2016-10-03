require 'spec_helper'
require 'phobos_checkpoint_ui/tasks'

RSpec.describe PhobosCheckpointUI::StaticApp do
  include Rack::Test::Methods

  def app
    PhobosCheckpointUI::StaticApp
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

  describe 'GET /' do
    it 'returns index.html' do
      get '/'
      expect(last_response.body).to eql File.read(File.join(public_dir, 'index.html'))
    end
  end

  describe 'GET /wrong-path' do
    it 'returns index.html' do
      get '/wrong-path'
      expect(last_response.body).to eql File.read(File.join(public_dir, 'index.html'))
    end
  end

  describe 'GET /assets/*' do
    it 'returns the assets' do
      assets = Dir
        .entries(File.join(public_dir, 'assets'))
        .select { |f| f =~ /\.(js|css|map)\Z/}

      assets.each do |filename|
        get "/assets/#{filename}"
        expect(last_response.ok?).to eql true
      end
    end
  end
end
