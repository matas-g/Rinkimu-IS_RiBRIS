const React = require('react');
const axios = require('axios');
const AddDistrictComponent = require('../presentations/add-district-presentation');

var AddDistrictContainer = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      address: '',
      numOfVoters: '',
      constituencies: [],
      constituency: {
        id: 1,
      }
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/constituencies/').then(function(response) {
      self.setState({
        constituencies: response.data
      });
    });
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var dataList = {
      name: this.state.name.trim(),
      address: this.state.address,
      numOfVoters: this.state.numOfVoters,
      constituency: {
        id : this.state.constituency.id
      }
    };
    axios.post('http://localhost:8090/polling-districts/', dataList).then(function (response) {
      self.context.router.push('/districts/');
    });
  },

  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },

  handleAddressChange: function(e) {
    this.setState({
      address: e.target.value
    });
  },

  handleVotersChange: function(e) {
    this.setState({
      numOfVoters: e.target.value
    });
  },

  handleConstituencyChange: function(e){
    var constituencyId = parseInt(e.target.value);
    this.setState({
      constituency: {
        id: constituencyId
      }
    });
},

  handleCancelClick() {
      this.context.router.push('/districts/');
  },

  render: function() {
    return (
      <AddDistrictComponent
        onVotersChange={this.handleVotersChange}
        onAddressChange={this.handleAddressChange}
        onNameChange={this.handleNameChange}
        onConstituencyChange={this.handleConstituencyChange}
        constituency={this.state.constituency}
        constituencies={this.state.constituencies}
        onSaveClick={this.handleSaveClick}
        onCancelClick={this.handleCancelClick}
        district={this.state.district}
      />
    );
  }
});

AddDistrictContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = AddDistrictContainer;
