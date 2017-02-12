const React = require('react');
const axios = require('axios');
const DistrictListComponent = require('../../presentations/lists/districts-list-presentation');

var DistrictListContainer = React.createClass({
  getInitialState: function() {
    return {
      districts: []
    };
  },

  componentWillMount: function() {
    var self = this;
    console.log(self.props.params.constituencyId);
    if (self.props.params.constituencyId == undefined) {
      axios.get('/polling-districts/')
      .then(function (response) {
        self.setState({
            districts: response.data,
        });
      });
    } else {
      axios.get('/constituencies/' + self.props.params.constituencyId)
      .then(function (response) {
        self.setState({
            districts: response.data.pollingDistricts,
        });
      });
    }
  },

  handleDistrictEdit: function(district) {
    var self = this;
    return function() {
      self.context.router.push('/districts/edit/' + district.id);
    }
  },

  handleDistrictRemove: function(district) {
    var self = this;
    return function() {
      axios.delete('/polling-districts/'+ district.id).then(function(response) {
        console.log('Apylinkė ištrinta');
        axios.get('/polling-districts/')
        .then(function (response) {
          self.setState({
            districts: response.data
          });
        });
      });
    };
  },

  render: function() {
    return (
      <DistrictListComponent
        districts={this.state.districts}
        onAddClick={this.handleAddDistrict}
        onEditItem={this.handleDistrictEdit}
        onRemoveItem={this.handleDistrictRemove}
      />
    );
  }
});

DistrictListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = DistrictListContainer;