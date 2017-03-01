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
      district: {}
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/polling-districts/' + this.props.params.districtId).then(function(response) {
      self.setState({
        district: response.data,
        pollingDistrict: {
          id: response.data.id
        },
      });
    });
  },

  handleDistrictChange: function(e){
    var districtId = e.target.value;
    pollingDistrict: {
      id: districtId
    }
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
        district={this.state.district}
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
