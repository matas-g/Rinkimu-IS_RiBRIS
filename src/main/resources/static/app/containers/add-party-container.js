const React = require('react');
const axios = require('axios');
const AddParty = require('../presentations/add-party-presentation');

var AddPartyContainer = React.createClass({
    getInitialState: function() {
        return {
          party: {
            name: '',
            partyNo: ''
          }
        }
    },

    handleSaveClick: function(e) {
      e.preventDefault();
      var self = this;
      var party = this.state.party
      axios.post('http://localhost:8090/parties/', party).then(function (response) {
        self.context.router.push('/parties/');
      });
    },

    handleFieldChange: function(fieldName) {
        var self = this;
        return function(e) {
          var party = self.state.party;
          party[fieldName] = e.target.value;
          self.setState({
            party: party
          });
        };
      },

    handleCancelClick() {
        this.context.router.push('/parties');
    },

    render: function() {
        return (
            <AddParty
                party={this.state.party}
                onSaveClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}
                onFieldChange={this.handleFieldChange}
            />
        );
    }
});

AddPartyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddPartyContainer;
