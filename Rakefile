require "bundler/gem_tasks"
require "rspec/core/rake_task"

RSpec::Core::RakeTask.new(:spec)

task :default => :spec

desc 'Compile front-end app'
task :compile_frontend do
  `rm -rf assets/`
  puts `cd frontend; npm run dist`
end
