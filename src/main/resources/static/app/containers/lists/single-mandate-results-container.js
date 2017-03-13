const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const SingleMandateListPresentation = require('../../presentations/lists/single-mandate-results-presentation');

var SingleMandateListContainer = React.createClass({
  getInitialState: function() {
    return {
      constituencies: [],
      searchText: ''
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/candidates-results/single-mandate/progress/')
    .then(function (response) {
      self.setState({
        constituencies: response.data
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
      <SingleMandateListPresentation
        constituencies={this.state.constituencies}
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