var React = require('react');
var GoogleApi = require('google-client-api');
var request = require('superagent');

var CLIENT_ID = '870409745101-5ulmofmtv0or4pnd40eatp7p2cnrp2pc.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

var Integration = React.createClass({
  handleAuthClick: function(e) {
    // Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      this.handleAuthResult);
    return false;
  },
  handleAuthResult: function(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      request.post('localhost:8003/oauth').send('{}');
      console.log(authResult);
      this.loadCalendarApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      console.log("no");
    }
  },
  loadCalendarApi: function() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
  },
  listUpcomingEvents: function() {
    
  },
  render: function() {
    return(
      <div className="integration">
        { this.props.name }
        <a type="button" className="btn btn-primary integrationBt" onClick={this.handleAuthClick}>Configurar</a>
      </div>
    );
  }
});
module.exports = Integration