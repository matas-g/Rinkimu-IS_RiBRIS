const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const SingleMandateListPresentation = require('../../presentations/lists/single-mandate-results-presentation');

var SingleMandateListContainer = React.createClass({
  getInitialState: function() {
    return {
      constituencies: [],
      candidates: [],
      searchCandidate: '',
      searchConstituency: '',
    };
  },

componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/candidates-results/single-mandate/progress/')
    .then(function (response) {
        constituencies = response.data;
     axios.get('http://localhost:8090/candidates-results/single-mandate/winner-candidates/')
    .then(function (response) {
        candidates = response.data;
        self.setState({
            constituencies: constituencies,
            candidates: candidates
        });
    });
  })
},



  handleSearchCandidatesTextChange: function(e) {
      var candidate = e.target.value;
      this.setState({
        searchCandidate: candidate
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
      <SingleMandateListPresentation
        constituencies={this.state.constituencies}
        candidates={this.state.candidates}
        onSearchCandidatesTextChange={this.handleSearchCandidatesTextChange}
        searchCandidate={this.state.searchCandidate}
        onSearchConstituenciesTextChange={this.handleSearchConstituenciesTextChange}
        searchConstituency={this.state.searchConstituency}
      />
    );
  }
});

SingleMandateListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateListContainer;