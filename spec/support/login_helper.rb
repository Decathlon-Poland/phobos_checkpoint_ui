# frozen_string_literal: true

module LoginHelper
  def login(saml_handler = PhobosCheckpointUI::SamlHandler, data = oauth_payload)
    user = saml_handler.new(data).user
    env 'rack.session', { user: user.to_json }
  end
end

RSpec.configure do |config|
  config.include LoginHelper
end
