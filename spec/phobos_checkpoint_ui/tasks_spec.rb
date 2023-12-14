require 'spec_helper'

RSpec.describe PhobosCheckpointUI::Tasks do

  it 'loads copy assets task' do
    expect(Rake.application.tasks.map(&:name)).to include *%w( phobos_checkpoint_ui:copy_assets )
  end

  describe 'phobos_checkpoint_ui:copy_assets' do
    before do
      Rake.application['phobos_checkpoint_ui:copy_assets'].reenable
      Rake.application['phobos_checkpoint_ui:copy_assets'].invoke
      expect(Dir.exist?('public')).to eql true
    end

    after do
      FileUtils.rm_rf('public')
    end

    let(:public_dir) { File.expand_path(File.join(File.dirname(__FILE__), '../../public')) }
    let(:assets_dir) { File.expand_path(File.join(File.dirname(__FILE__), '../../assets')) }

    it 'copies assets/index.html to public/index.html' do
      expect(File.exist?(File.join(public_dir, 'index.html'))).to eql true
    end

    it 'copies assets/*.{js,css,map} to public/assets/*.{js,css,map}' do
      assets = Dir
        .entries(assets_dir)
        .select { |f| f =~ /\.(js|css|map)\Z/}

      assets.each do |asset|
        asset_path = File.join(public_dir, "assets/#{asset}")
        expect(File.exist?(asset_path)).to eql(true), "#{asset_path} doesn't exist"
      end
    end
  end
end
