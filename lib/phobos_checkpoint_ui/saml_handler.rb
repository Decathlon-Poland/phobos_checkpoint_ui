module PhobosCheckpointUI
  class SamlHandler
    def initialize(data)
    end

    def authorized?
      true
    end

    def user
      { username: 'checkpoint_ui_user' }
    end
  end
end
