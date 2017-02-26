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
      district: {},
      districts: []
    };
  },

  componentWillMount: function() {
    var self = this;
    if (this.props.params.districtId != undefined) {
      axios.get('http://localhost:8090/polling-districts/' + this.props.params.districtId).then(function(response) {
        self.setState({
          district: response.data
        });
      });
    } else {
      axios.get('http://localhost:8090/polling-districts/').then(function(response) {
        self.setState({
          districts: response.data,
          pollingDistrict: {
            id: response.data[0].id
          }
        });
      });
    }
  },

  handleDistrictChange : function(e){
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
        id: this.state.district.id
      }
    };
    axios.post('http://localhost:8090/representatives/', elementsList).then(function () {
      if (this.props.params.districtId != undefined) {
        this.context.router.push('/representatives');
      } else {
        this.context.router.push('/districts');
      }
    });
  },

  handleCancelClick() {
    if (this.props.params.districtId == undefined) {
      this.context.router.push('/representatives');
    } else {
      this.context.router.push('/districts');
    }
  },

  render: function() {
    return (
      <AddRepresentative
        route={this.state.route}
        onNameChange={this.handleNameChange}
        name={this.state.name}
        onSurnameChange={this.handleSurnameChange}
        surname={this.state.surname}
        pollingDistrict={this.state.pollingDistrict}
        district={this.state.district}
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
