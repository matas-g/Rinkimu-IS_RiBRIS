const React = require('react');
const axios = require('axios');
const DistrictsActivityListPresentation = require('../../presentations/lists/districts-activity-list-presentation');

var DistrictsActivityListContainer = React.createClass({
  getInitialState: function() {
    return ({
    	districts: [],
      searchText: ''
    });
  },
  
  componentWillMount: function(){
	  var self = this;
	  axios.get('http://localhost:8090/polling-districts/activity/all/'+ this.props.params.constituencyId)
	  	.then(function(response){
	  		console.log(response.data);
	  		self.setState({
	  			districts: response.data
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
      <DistrictsActivityListPresentation
        districts={this.state.districts}
        onSearchTextChange={this.handleSearchTextChange}
        searchText={this.state.searchText}
      />
    );
  }
});

DistrictsActivityListContainer.contextTypes = {
	    router: React.PropTypes.object.isRequired
	};
  
module.exports = DistrictsActivityListContainer;
