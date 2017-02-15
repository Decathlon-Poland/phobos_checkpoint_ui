module PhobosCheckpointUI
  module App
    def self.new(api_app, configs = {})
      StaticApp.configs = configs
      Rack::URLMap.new(
        '/' => StaticApp,
        '/ping' => Proc.new { |env| ['200', { 'Content-Type' => 'text/plain' }, ['PONG']] },
        '/api' => api_app
      )
    end
  end
end
