module PhobosCheckpointUI
  module App
    def self.new(api_app:, config: {}, saml_handler: PhobosCheckpointUI::SamlHandler, logger_middleware: Rack::NullLogger)
      StaticApp.use(logger_middleware)
      StaticApp.configs = config
      Rack::URLMap.new(
        '/' => StaticApp.new(api_app, saml_handler),
        '/ping' => Proc.new { |env| ['200', { 'Content-Type' => 'text/plain' }, ['PONG']] }
      )
    end
  end
end
