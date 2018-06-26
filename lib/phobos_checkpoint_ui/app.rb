module PhobosCheckpointUI
  module App
    def self.new(api_app, configs = {})
      StaticApp.configs = configs
      Rack::URLMap.new(
        '/' => StaticApp.new(api_app),
        '/ping' => Proc.new { |env| ['200', { 'Content-Type' => 'text/plain' }, ['PONG']] }
      )
    end
  end
end
