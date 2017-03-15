const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const MultiMandateListPresentation = require('../../presentations/lists/multi-mandate-results-presentation');

var MultiMandateListContainer = React.createClass({
  getInitialState: function() {
    return {
      constituencies: [],
      searchText: ''
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/party-results/progress')
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
      <MultiMandateListPresentation
        constituencies={this.state.constituencies}
        onSearchTextChange={this.handleSearchTextChange}
        searchText={this.state.searchText}
      />
    );
  }
});

MultiMandateListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = MultiMandateListContainer;