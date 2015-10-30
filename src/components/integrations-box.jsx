var React = require('react');
var request = require('superagent');
var Integration = require('./integration');

var IntegrationsBox = React.createClass({
  getIntegrationsFromAPI: function(url) {
    // TODO: call API and set response to state
    var response = request.get(url).end(function(err, res) {
      if (err) {
        console.error(endpoint, err.stack);
      } else {
        this.setState({data: res.body});
      }
    }.bind(this));
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var url = "http://localhost:3000/integrations"
    this.getIntegrationsFromAPI(url);
  },
  render: function() {
    var count = 0;
    var integrations = this.state.data.map(function(integration) {
      count++;
      if(count % 2 == 0 ) {
        return (
          <Integration className='' display_name={integration.display_name} />
        );
      }
      else  {
        return (
          <Integration className='odd' display_name={integration.display_name} />
        );   
      }
    });
    return(
      <div className="panel panel-default">
        <p className="integration-title">Integrations</p>
        <div className="panel-body">
          <ul className="list-group">
              {integrations}    
          </ul>  
        </div>


      </div>
    );
  }
});

module.exports = IntegrationsBox
