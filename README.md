[![CircleCI](https://circleci.com/gh/klarna/phobos_checkpoint_ui.svg?style=shield)](https://circleci.com/gh/klarna/phobos_checkpoint_ui)

# Phobos Checkpoint UI

Phobos Checkpoint UI is a GUI for phobos checkpoint API. It is compatible with [Phobos DB Checkpoint](https://github.com/klarna/phobos_db_checkpoint)

![Events list](https://github.com/klarna/phobos_checkpoint_ui/raw/master/screenshot1.png)
![Event overview](https://github.com/klarna/phobos_checkpoint_ui/raw/master/screenshot2.png)

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'phobos_checkpoint_ui'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install phobos_checkpoint_ui

## Usage

1) Add `require 'phobos_checkpoint_ui/tasks'` to your __Rakefile__

2) Run `rake phobos_checkpoint_ui:copy_assets`, this will copy the precompile assets to `./public`

3) Create/update `config.ru` and add:

```ruby
require 'phobos_checkpoint_ui'

# ...
# < keep the previous configurations >
# ...

# run PhobosDBCheckpoint::EventsAPI
run PhobosCheckpointUI::App.new(PhobosDBCheckpoint::EventsAPI)
```

It is possible to configure some aspects of the app, `App.new` accepts a hash with options to be delivered to the front-end. The fron-end is prepared to receive the following options:

* `logo` - Path of image to be used as a logo (can be something inside `/public`)
* `title` - App title
* `env_label` - Special label display the environment

Example:

```ruby
run PhobosCheckpointUI::App.new(PhobosDBCheckpoint::EventsAPI, {
  logo: '/assets/logo.png',
  title: 'Checkpoint',
  env_label: 'production'
})
```

## Development

The front-end is written with `React` and `Redux`, ensure that you have `nodejs` version >= 6.3 installed.

```sh
cd frontend
npm install
npm test:unit
```

Run `rake spec` to run the ruby tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/klarna/phobos_checkpoint_ui.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
