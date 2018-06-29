require 'json'
require 'rack'
require 'sinatra'
require 'phobos_db_checkpoint'
require 'phobos_db_checkpoint/events_api'
require 'phobos_checkpoint_ui/saml_handler'
require 'phobos_checkpoint_ui/version'

module PhobosCheckpointUI
  class << self
    def config
      @config || {}
    end

    def use_saml?
      self.config.dig(:saml).present?
    end

    def configure(path='config/checkpoint_ui.yml')
      @config = read_config(path)
    end

    def read_config(path)
      YAML.load(
        ERB.new(
          File.read(
            File.expand_path(path)
          )
        ).result
      ).deep_symbolize_keys
    end
  end
end

require 'phobos_checkpoint_ui/static_app'
require 'phobos_checkpoint_ui/app'
