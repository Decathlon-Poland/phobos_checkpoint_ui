require 'rake'
require 'fileutils'

module PhobosCheckpointUI
  module Tasks
    extend Rake::DSL if defined? Rake::DSL

    namespace :phobos_checkpoint_ui do
      desc 'Copy Assets to ./public folder. It creates the folder if it doesn\'t exist'
      task :copy_assets do
        public = File.join(Dir.pwd, 'public')
        assets = File.join(Dir.pwd, 'public', 'assets')
        content = File.expand_path(File.join(File.dirname(__FILE__), '../../assets'))
        FileUtils.rm_rf(assets)
        FileUtils.mkdir_p(assets)
        FileUtils.cp_r(content, public)
        FileUtils.mv(File.join(assets, 'index.html'), File.join(public, 'index.html'))
      end
    end
  end
end
