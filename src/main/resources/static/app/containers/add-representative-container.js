const React = require('react');
const axios = require('axios');
const AddRepresentative = require('../presentations/add-representative-presentation');

var AddRepresentativeContainer = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      surname: '',
      pollingDistrict: {
        id: 1
      },
      districts: []
    };
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var elementsList = {
      name: this.state.name,
      surname: this.state.surname,
      pollingDistrict: {
        id: this.state.pollingDistrict.id
      }
    };
    axios.post('http://localhost:8090/representatives/', elementsList).then(function () {
      self.context.router.push('/districts');
    });
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/polling-districts/').then(function(response) {
      self.setState({
        districts: response.data,
      });
    });
  },

  handleDistrictChange : function(e){
    var districtId = parseInt(e.target.value);
    this.setState({
      pollingDistrict: {
        id: districtId
      }
    });
    console.log(this.state.pollingDistrict.id);
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

  handleCancelClick() {
    this.context.router.push('/districts');
  },

  render: function() {
    return (
      <AddRepresentative
        onNameChange={this.handleNameChange}
        name={this.state.name}
        onSurnameChange={this.handleSurnameChange}
        surname={this.state.surname}
        pollingDistrict={this.state.pollingDistrict}
        districts={this.state.districts}
        onDistrictChange={this.handleDistrictChange}
        onSaveClick={this.handleSaveClick}
        onCancelClick={this.handleCancelClick}
      />
    );
  }
});

AddRepresentativeContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddRepresentativeContainer;
