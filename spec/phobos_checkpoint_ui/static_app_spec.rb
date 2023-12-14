require 'spec_helper'

RSpec.describe PhobosCheckpointUI::StaticApp do
  include Rack::Test::Methods

  def app
    PhobosCheckpointUI::StaticApp
  end

  before do
    PhobosCheckpointUI::StaticApp.configs = configs

    Rake.application['phobos_checkpoint_ui:copy_assets'].reenable
    Rake.application['phobos_checkpoint_ui:copy_assets'].invoke
    expect(Dir.exist?('public')).to eql true

    login
  end

  after do
    FileUtils.rm_rf('public')
  end

  let(:configs) { Hash(key: 'value') }

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

  describe 'GET /configs' do
    it 'returns configs' do
      get '/configs'
      expect(last_response.body).to eql configs.to_json
    end
  end
end
