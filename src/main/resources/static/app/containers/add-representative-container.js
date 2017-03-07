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
      districtName: ''
    };
  },

  componentWillMount: function() {
    var self = this;
    if(this.props.params.representativeId == undefined) {
      axios.get('http://localhost:8090/polling-districts/' + self.props.params.districtId).then(function(response) {
        self.setState({
          districtName: response.data.name,
          pollingDistrict: {
            id: response.data.id
          },
        });
      });
    } else {
      axios.get('http://localhost:8090/representatives/' + self.props.params.representativeId).then(function(response) {
        console.log(response.data);
        self.setState({
          name: response.data.name,
          surname: response.data.surname,
          pollingDistrict: {
            id: response.data.id
          },
        });
      });
    }
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
      self.context.router.push('/admin/districts');
    });
  },

  handleCancelClick() {
    this.context.router.push('/admin/districts');
  },

  render: function() {
    return (
      <AddRepresentative
        districtName={this.state.districtName}
        representativeId={this.props.params.representativeId}
        onNameChange={this.handleNameChange}
        name={this.state.name}
        onSurnameChange={this.handleSurnameChange}
        surname={this.state.surname}
        pollingDistrict={this.state.pollingDistrict}
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
