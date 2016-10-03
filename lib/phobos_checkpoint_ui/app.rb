module PhobosCheckpointUI
  module App
    def self.new(api_app, configs = {})
      StaticApp.configs = configs
      Rack::URLMap.new(
        '/' => StaticApp,
        '/api' => api_app
      )
    end
  end
end
