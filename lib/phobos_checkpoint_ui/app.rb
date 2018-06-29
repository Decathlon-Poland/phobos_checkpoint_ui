module PhobosCheckpointUI
  module App
    def self.new(api_app:,
                 config: {},
                 saml_handler: PhobosCheckpointUI::SamlHandler,
                 logger_middleware: nil
                )

      StaticApp.configs = config

      if logger_middleware.present?
        middleware_klass = logger_middleware.dig(:class)
        raise ':class key missing in :logger_middleware parameter' unless middleware_klass

        StaticApp.use(middleware_klass, logger_middleware.dig(:opts) || {})
      else
        StaticApp.use(Rack::NullLogger)
      end

      Rack::URLMap.new(
        '/' => StaticApp.new(api_app, saml_handler),
        '/ping' => Proc.new { |env| ['200', { 'Content-Type' => 'text/plain' }, ['PONG']] }
      )
    end
  end
end
