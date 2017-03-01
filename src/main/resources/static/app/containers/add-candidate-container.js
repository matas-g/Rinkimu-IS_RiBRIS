const React = require('react');
const axios = require('axios');
const AddCandidate = require('../presentations/add-candidate-presentation');

var AddCandidateContainer = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      surname: '',
      birthDate: '',
      party: {
        id: 1
      },
      biography: '',
      parties: []
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/parties/').then(function(response) {
      self.setState({
        parties: response.data
      });
    });
  },

  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },

  handleSurnameChange: function(e) {
    this.setState({
      surname: e.target.value
    });
  },

  handleDateChange: function(e) {
    this.setState({
      birthDate: e.target.value
    });
  },

  handlePartyChange : function(e){
    var partyId = parseInt(e.target.value);
    this.setState({
      party: {
        id: partyId
      }
    });
  },

  handleBiographyChange: function(e) {
    this.setState({
      biography: e.target.value
    });
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var elementsList = {
      name: this.state.name,
      surname: this.state.surname,
      birthDate: this.state.birthDate,
      party: {
        id: this.state.party.id
      },
      biography: this.state.biography
    };
    axios.post('http://localhost:8090/candidates/', elementsList).then(function () {
      self.context.router.push('/admin/candidates');
    });
  },

  handleCancelClick() {
    this.context.router.push('/admin/candidates');
  },

  render: function() {
    return (
      <AddCandidate
        onBiographyChange={this.handleBiographyChange}
        onDateChange={this.handleDateChange}
        birthDate={this.state.birthDate}
        onNameChange={this.handleNameChange}
        name={this.state.name}
        onSurnameChange={this.handleSurnameChange}
        surname={this.state.surname}
        party={this.state.party}
        parties={this.state.parties}
        onPartyChange={this.handlePartyChange}
        onSaveClick={this.handleSaveClick}
        onCancelClick={this.handleCancelClick}
      />
    );
  }
});

AddCandidateContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddCandidateContainer;
