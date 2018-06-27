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
          'memberOf' => ['CN=foo,OU=Tango,DC=tele,DC=hq'],
          'fingerprint' => 'D2:67:4F:DA:29:B9:F6:78:FF:59:EB:9F:C3:AA:AD:C5:CA:5C:CC:7D'
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
