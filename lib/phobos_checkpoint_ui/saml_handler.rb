module PhobosCheckpointUI
  class SamlHandler
    def initialize(data)
    end

    def self.authorized?(user_json)
      true
    end

    def self.username(user_json)
      JSON(user_json).dig('username')
    end

    def user
      { username: 'checkpoint_ui_user' }
    end
  end
end
