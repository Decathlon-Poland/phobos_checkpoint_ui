require 'rake'
require 'fileutils'

module PhobosCheckpointUI
  module Tasks
    extend Rake::DSL if defined? Rake::DSL

    namespace :phobos_checkpoint_ui do
      desc 'Copy Assets to ./public folder. It creates the folder if it doesn\'t exist'
      task :copy_assets do
        folder = File.join(Dir.pwd, 'public')
        assets = File.expand_path(File.join(File.dirname(__FILE__), '../../assets'))
        FileUtils.rm_rf(folder)
        FileUtils.mkdir_p(folder)
        FileUtils.cp_r(assets, File.join(folder, 'assets'))
        FileUtils.mv(File.join(folder, 'assets/index.html'), File.join(folder, 'index.html'))
      end
    end
  end
end
