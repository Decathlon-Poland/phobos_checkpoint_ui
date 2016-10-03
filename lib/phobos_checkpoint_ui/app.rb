module PhobosCheckpointUI
  module App
    def self.new(api_app)
      Rack::URLMap.new(
        '/' => PhobosCheckpointUI::StaticApp,
        '/api' => api_app
      )
    end
  end
end
