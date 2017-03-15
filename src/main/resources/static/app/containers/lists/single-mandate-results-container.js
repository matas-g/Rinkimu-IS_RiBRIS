const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const SingleMandateListPresentation = require('../../presentations/lists/single-mandate-results-presentation');

var SingleMandateListContainer = React.createClass({
  getInitialState: function() {
    return {
      constituencies: [],
      candidates: [],
      searchText: ''
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



  handleSearchTextChange: function(e) {
      var text = e.target.value;
      this.setState({
        searchText: text
    });
  },

  render: function() {
    return (
      <SingleMandateListPresentation
        constituencies={this.state.constituencies}
        candidates={this.state.candidates}
        onSearchTextChange={this.handleSearchTextChange}
        searchText={this.state.searchText}
      />
    );
  }
});

SingleMandateListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateListContainer;