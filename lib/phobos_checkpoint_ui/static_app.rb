module PhobosCheckpointUI
  class StaticApp < Sinatra::Base
    set :logging, nil
    set :public_folder, -> { File.join(Dir.pwd, 'public') }

    get '/*' do
      send_file File.join(settings.public_folder, 'index.html')
    end
  end
end
