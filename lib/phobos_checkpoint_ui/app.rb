module PhobosCheckpointUI
  module App
    def self.new(api_app:, configs: {}, saml_handler: PhobosCheckpointUI::SamlHandler, logger_middleware: Rack::NullLogger)
      StaticApp.use(logger_middleware, app_name: 'checkpoint_ui')
      StaticApp.configs = configs
      Rack::URLMap.new(
        '/' => StaticApp.new(api_app, saml_handler),
        '/ping' => Proc.new { |env| ['200', { 'Content-Type' => 'text/plain' }, ['PONG']] }
      )
    end
  end
end
