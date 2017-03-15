const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const MultiMandateListPresentation = require('../../presentations/lists/multi-mandate-results-presentation');

var MultiMandateListContainer = React.createClass({
  getInitialState: function() {
    return {
      constituencies: [],
      parties: [],
      searchText: '',
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

  handleSearchTextChange: function(e) {
      var text = e.target.value;
      this.setState({
        searchText: text
    });
  },

  render: function() {
    return (
      <MultiMandateListPresentation
        constituencies={this.state.constituencies}
      	parties={this.state.parties}
        onSearchTextChange={this.handleSearchTextChange}
        searchText={this.state.searchText}
      	searchParty={this.state.searchParty}
      />
    );
  }
});

MultiMandateListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = MultiMandateListContainer;