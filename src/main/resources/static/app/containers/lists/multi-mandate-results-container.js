const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const MultiMandateListPresentation = require('../../presentations/lists/multi-mandate-results-presentation');

var MultiMandateListContainer = React.createClass({
  getInitialState: function() {
    return {
      constituencies: [],
      parties: [],
      searchConstituency: '',
      searchParty: '',
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/party-results/progress')
    .then(function (response) {
        constituencies = response.data;
        axios.get('http://localhost:8090/party-results/winner-parties')
        .then(function (response) {
        	parties = response.data;
        	self.setState({
        		constituencies: constituencies,
        		parties: parties
        	});
        });
     })
  },
  
  handleSearchPartyTextChange: function(e) {
	  var party = e.target.value;
	  this.setState({
		  searchParty: party
	  });
  },

  handleSearchConstituenciesTextChange: function(e) {
      var constituency = e.target.value;
      this.setState({
        searchConstituency: constituency
    });
  },

  render: function() {
    return (
      <MultiMandateListPresentation
        constituencies={this.state.constituencies}
      	parties={this.state.parties}
        onSearchPartyTextChange={this.handleSearchPartyTextChange}
      	onSearchConstituencyTextChange={this.handleSearchConstituenciesTextChange}
      	searchConstituency={this.state.searchConstituency}
      	searchParty={this.state.searchParty}
      />
    );
  }
});

MultiMandateListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = MultiMandateListContainer;