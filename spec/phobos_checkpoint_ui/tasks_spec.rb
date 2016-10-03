require 'spec_helper'
require 'phobos_checkpoint_ui/tasks'

RSpec.describe PhobosCheckpointUI::Tasks do

  it 'loads copy assets task' do
    expect(Rake.application.tasks.map(&:name)).to include *%w( phobos_checkpoint_ui:copy_assets )
  end

  describe 'phobos_checkpoint_ui:copy_assets' do
    before(:context) do
      Rake.application['phobos_checkpoint_ui:copy_assets'].invoke
      expect(Dir.exists?('public')).to eql true
    end

    after(:context) do
      FileUtils.rm_rf('public')
    end

    let(:public_dir) { File.expand_path(File.join(File.dirname(__FILE__), '../../public')) }
    let(:assets_dir) { File.expand_path(File.join(File.dirname(__FILE__), '../../assets')) }

    it 'copies assets/index.html to public/index.html' do
      expect(File.exists?(File.join(public_dir, 'index.html'))).to eql true
    end

    it 'copies assets/*.{js,css,map} to public/assets/*.{js,css,map}' do
      assets = Dir
        .entries(assets_dir)
        .select { |f| f =~ /\.(js|css|map)\Z/}

      assets.each do |asset|
        asset_path = File.join(public_dir, "assets/#{asset}")
        expect(File.exists?(asset_path)).to eql(true), "#{asset_path} doesn't exist"
      end
    end
  end
end
