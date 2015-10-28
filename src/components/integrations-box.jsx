var React = require('react');
var request = require('superagent');

var IntegrationsBox = React.createClass({
  getIntegrationsFromAPI: function(url) {
    // TODO: call API and set response to state
    var response = request.get(url).end(function(err, res) {
      if (err) {
        console.error(endpoint, err.stack);
      } else {
        console.log("É nozes");
        this.setState({data: res.body});
      }
    }.bind(this));
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var url = "http://localhost:8000/mocks/integrations.json"
    this.getIntegrationsFromAPI(url);
  },
  render: function() {
    var integrations = this.state.data.map(function(integration) {
      return (
        <div className="integration">
          {integration.name}
        </div>
      );
    });
    return(
      <div className="integrationsBox">
        <h1>Integrations</h1>
        { integrations }
      </div>
    );
  }
});

module.exports = IntegrationsBox
