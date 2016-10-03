module PhobosCheckpointUI
  class StaticApp < Sinatra::Base
    class << self
      attr_accessor :configs
    end

    set :logging, nil
    set :public_folder, -> { File.join(Dir.pwd, 'public') }

    get '/configs' do
      content_type :json
      self.class.configs.to_json
    end

    get '/*' do
      send_file File.join(settings.public_folder, 'index.html')
    end
  end
end
