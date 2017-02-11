const React = require('react');
const axios = require('axios');
const PartiesListPresentation = require('../../presentations/lists/parties-list-presentation');

var PartiesListContainer = React.createClass({
  getInitialState: function() {
    return {
      parties: []
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('/parties/')
    .then(function (response) {
      self.setState({
        parties: response.data
      });
    });
  },

  handlePartyEdit: function(party) {
    var self = this;
    return function() {
      self.context.router.push('/parties/add/' + constituency.id);
    }
  },

  handlePartyRemove: function(party) {
    var self = this;
    return function() {
      axios.delete('/parties/'+ party.id).then(function(response) {
        console.log('Apygarda ištrinta');
        axios.get('/parties/')
        .then(function (response) {
          self.setState({
            parties: response.data
          });
        });
      });
    };
  },

  handleCandidatesListClick: function(party) {
    var self = this;
    return function() {
      self.context.router.push('/candidates/list/' + party.id);
    };
  },

  render: function() {
    return (
      <PartiesListPresentation
        parties={this.state.parties}
        onEditItem={this.handlePartyEdit}
        onRemoveItem={this.handlePartyRemove}
        onCandidatesListClick={this.handleCandidatesListClick}
      />
    );
  }
});

PartiesListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = PartiesListContainer;
