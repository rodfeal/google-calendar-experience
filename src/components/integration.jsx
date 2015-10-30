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
      console.log(authResult);
      url = "http://localhost:3000/credentials";
      console.log("Post to " + url)
      request.post(url).send(authResult).end(function(err, res){
        console.log("err")
        console.log(err)
        console.log("res")
        console.log(res)
      });
    } else {
      console.error(authResult.error || "Failed to authorize application");
    }
  },
  render: function() {
    console.log(this.props.className);
    return(
      <li className={'list-group-item ' + this.props.className}>
        { this.props.display_name }
        <button className="integration-button" onClick={this.handleAuthClick}> 
          Configurar
        </button>
      </li>
    );
  }
});
module.exports = Integration
