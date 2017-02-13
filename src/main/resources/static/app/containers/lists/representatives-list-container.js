const React = require('react');
const axios = require('axios');
const RepresentativesList = require('../../presentations/lists/representatives-list-presentation');

var RepresentativesContainer = React.createClass({
  getInitialState: function() {
    return {
      representatives: []
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/representatives/')
    .then(function (response) {
      self.setState({
          representatives: response.data,
      });
    });
  },

  handleRepresentativesEdit: function(representative) {
    var self = this;
    return function() {
      self.context.router.push('/districts/edit/' + district.id);
    }
  },

  handleRepresentativesRemove: function(representative) {
    var self = this;
    return function() {
      axios.delete('http://localhost:8090/representatives/'+ district.id).then(function(response) {
        axios.get('http://localhost:8090/representatives/')
        .then(function (response) {
          self.setState({
            representatives: response.data
          });
        });
      });
    };
  },

  render: function() {
    return (
      <RepresentativesList
        representatives={this.state.districts}
        onAddClick={this.handleAddDistrict}
        onEditItem={this.handleDistrictEdit}
        onRemoveItem={this.handleDistrictRemove}
        constituency={this.state.constituency}
      />
    );
  }
});

RepresentativesContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = RepresentativesContainer;
