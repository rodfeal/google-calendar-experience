var React = require('react');
var jQuery = require('jquery');

var IntegrationsBox = React.createClass({
  getIntegrationsFromAPI: function(url) {
    jQuery.ajax({
      url: url,
      dataType: 'json',
      cache: 'false',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
     });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getIntegrationsFromAPI();
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
