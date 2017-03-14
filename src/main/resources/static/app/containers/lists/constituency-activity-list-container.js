const React = require('react');
const axios = require('axios');
const ActivityListPresentation = require('../../presentations/lists/activity-list-presentation');

var ConstituencyActivityListContainer = React.createClass({
  getInitialState: function() {
    return ({
    	constituencies: [],
      searchText: ''
    });
  },
  
  componentWillMount: function(){
	  var self = this;
	  axios.get('http://localhost:8090/constituencies/activity/all/')
	  	.then(function(response){
	  		self.setState({
	  			constituencies: response.data
	  		});
	  	})
  },

    handleSearchTextChange: function(e) {
      var text = e.target.value;
      this.setState({
        searchText: text
    });
  },
  

  render: function() {
	  return (
      <ActivityListPresentation
        constituencies={this.state.constituencies}
        onSearchTextChange={this.handleSearchTextChange}
        searchText={this.state.searchText}
      />
    );
  }
});

ConstituencyActivityListContainer.contextTypes = {
	    router: React.PropTypes.object.isRequired
	};
  
module.exports = ConstituencyActivityListContainer;
