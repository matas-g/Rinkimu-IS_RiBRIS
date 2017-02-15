const React = require('react');
const axios = require('axios');
const CandidatesList = require('../../presentations/lists/candidates-list-presentation');

var PartiesListContainer = React.createClass({
  getInitialState: function() {
    return {
      candidates: []
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/candidates/')
    .then(function (response) {
      self.setState({
        candidates: response.data
      });
    });
  },

  handleCandidateEdit: function(candidate) {
    var self = this;
    return function() {
      self.context.router.push('/parties/add/' + constituency.id);
    }
  },

  handleCandidateRemove: function(candidate) {
    var self = this;
    return function() {
      axios.delete('http://localhost:8090/candidate/'+ party.id).then(function(response) {
        axios.get('http://localhost:8090/candidate/')
        .then(function (response) {
          self.setState({
            candidates: response.data
          });
        });
      });
    };
  },

  render: function() {
    return (
      <CandidatesList
        candidates={this.state.candidates}
        onEditItem={this.handleCandidateEdit}
        onRemoveItem={this.handleCandidateRemove}
      />
    );
  }
});

PartiesListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = PartiesListContainer;
