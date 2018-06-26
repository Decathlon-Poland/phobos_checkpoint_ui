# frozen_string_literal: true

module LoginHelper
  def login(user=omniauth_data)
    env 'rack.session', { user: user }
  end

  def omniauth_data
    {
      username: 'john.authorized',
      first_name: 'john',
      family_name: 'authorized',
      email: 'john.authorized@example.com'
    }
  end
end

RSpec.configure do |config|
  config.include LoginHelper
end
