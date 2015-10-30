# Google Calendar Experience

This project was based on Stephen Grider's
[ReactStarter project](https://github.com/StephenGrider/ReactStarter).

Google calendar experience is an attempt to integrate react with a stub API and
Google Calendar API v3.

### Running

First, setup the
[integrations-api project](https://github.com/danielbucher/integrations-api):

```
git clone https://github.com/danielbucher/integrations-api.git
cd integrations-api
bundle install
rake db:create
rake db:migrate
rails server
```

You'll need version 2.2.3 of ruby installed

Then setup google calendar experience:

```
git clone https://github.com/danielbucher/google-calendar-experience.git
cd google-calendar-experience
npm install
gulp
```
