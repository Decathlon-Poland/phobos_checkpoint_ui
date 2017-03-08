# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'phobos_checkpoint_ui/version'

Gem::Specification.new do |spec|
  spec.name          = 'phobos_checkpoint_ui'
  spec.version       = PhobosCheckpointUI::VERSION
  spec.authors       = [
    'Túlio Ornelas',
    'Mathias Klippinge',
    'Sergey Evstifeev',
    'Thiago R. Colucci',
    'Martin Svalin',
    'Francisco Juan'
  ]
  spec.email         = [
    'ornelas.tulio@gmail.com',
    'mathias.klippinge@gmail.com',
    'sergey.evstifeev@gmail.com',
    'ticolucci@gmail.com',
    'martin@lite.nu',
    'francisco.juan@gmail.com'
  ]

  spec.summary       = 'Phobos Checkpoint UI is a GUI for phobos checkpoint API'
  spec.description   = 'Phobos Checkpoint UI is a GUI for phobos checkpoint API, it is compatible with https://github.com/klarna/phobos_db_checkpoint'
  spec.homepage      = 'https://github.com/klarna/phobos_checkpoint_ui'
  spec.license       = 'MIT'

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = 'https://rubygems.org'
  else
    raise 'RubyGems 2.0 or newer is required to protect against public gem pushes.'
  end

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = 'bin'
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 1.12'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'rspec', '~> 3.0'
  spec.add_development_dependency 'pry-byebug'
  spec.add_development_dependency 'rack-test'
  spec.add_development_dependency 'rspec_junit_formatter', '0.2.2'

  spec.add_dependency 'rake'
  spec.add_dependency 'sinatra'
  spec.add_dependency 'phobos_db_checkpoint', '~> 2.0'
end
