# frozen_string_literal: true
module SamlHelper
  def oauth_payload(overwrites = {})
    hash = {
      provider: 'saml',
      uid: 'TGUgQm9iIEhvcGU=',
      info: {
        email: 'bob.hope@example.com'
      },
      credentials: {},
      extra: {
        raw_info: {
          'mail' => ['bob.hope@example.com'],
          'givenName' => ['Bob'],
          'cn' => ['bob.hope'],
          'sn' => ['Hope'],
          'memberOf' => ['CN=foo'],
          'fingerprint' => 'fingerprint'
        }
      }
    }.merge(overwrites)

    hash[:extra][:raw_info] = OneLogin::RubySaml::Attributes.new(hash[:extra][:raw_info])
    OmniAuth::AuthHash.new(hash)
  end
end

RSpec.configure do |config|
  config.include SamlHelper
end
