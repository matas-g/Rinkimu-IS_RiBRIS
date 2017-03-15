const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const ConsolidateResultsComponent = require('../../presentations/lists/consolidate-results-list-presentation');

var ConsolidateResultsListContainer = React.createClass({
  getInitialState: function() {
    return {
      parties: [],
      searchText: '',
    };
  },

  componentWillMount: function() {
    var self = this;
      axios.get('http://localhost:8090/party-results/consolidated-results/')
      .then(function (response) {
        self.setState({
            parties: response.data,
        });
      });
  },

  handleSearchTextChange: function(e) {
    var text = e.target.value;
    this.setState({
      searchText: text
  });
},
  

  render: function() {
    return (
      <ConsolidateResultsComponent
        parties={this.state.parties}
        onSearchTextChange={this.handleSearchTextChange}
        searchText={this.state.searchText}
      />
    );
  }
});

ConsolidateResultsListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = ConsolidateResultsListContainer;