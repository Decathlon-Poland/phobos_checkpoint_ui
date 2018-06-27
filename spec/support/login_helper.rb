# frozen_string_literal: true

module LoginHelper
  def login(saml_handler = PhobosCheckpointUI::SamlHandler, data = oauth_payload)
    env 'rack.session', {
      user: saml_handler.new(data).user
    }
  end
end

RSpec.configure do |config|
  config.include LoginHelper
end
