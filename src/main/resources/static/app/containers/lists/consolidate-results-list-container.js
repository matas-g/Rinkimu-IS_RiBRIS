const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const ConsolidateResultsComponent = require('../../presentations/lists/consolidate-results-list-presentation');

var ConsolidateResultsListContainer = React.createClass({
  getInitialState: function() {
    return {
      parties: [],
      candidates: [],
      searchText: '',
      candidateSearch: ''
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/party-results/consolidated-results/')
    .then(function (response) {
        parties = response.data;
     axios.get('http://localhost:8090/party-results/consolidated-candidates/')
    .then(function (response) {
        candidates = response.data;
        self.setState({
            parties: parties,
            candidates: candidates
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

  handleCandidatesSearchTextChange: function(e) {
    var candidate = e.target.value;
    this.setState({
      candidateSearch: candidate
  });
},
  

  render: function() {
    return (
      <ConsolidateResultsComponent
        parties={this.state.parties}
        candidates={this.state.candidates}
        onSearchTextChange={this.handleSearchTextChange}
        searchText={this.state.searchText}
        onCandidateSearchTextChange={this.handleCandidatesSearchTextChange}
        candidateSearch={this.state.candidateSearch}
      />
    );
  }
});

ConsolidateResultsListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = ConsolidateResultsListContainer;