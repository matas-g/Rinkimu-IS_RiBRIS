const React = require('react');
const axios = require('axios');
const ConstituenciesListPresentation = require('../../presentations/lists/constituencies-list-presentation');

var ConstituenciesListContainer = React.createClass({
  getInitialState: function() {
    return {
      constituencies: []
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/constituencies/')
    .then(function (response) {
      self.setState({
        constituencies: response.data
      });
    });
  },

  handleConstituencyEdit: function(constituency) {
    var self = this;
    return function() {
      self.context.router.push('/constituencies/edit/' + constituency.id);
    }
  },

  handleConstituencyRemove: function(constituency) {
    var self = this;
    return function() {
      axios.delete('http://localhost:8090/constituencies/'+ constituency.id).then(function(response) {
        console.log('Apygarda ištrinta');
        axios.get('http://localhost:8090/constituencies/')
        .then(function (response) {
          self.setState({
            constituencies: response.data
          });
        });
      });
    };
  },

  handleDistrictsList: function(constituency) {
    var self = this;
    return function() {
      self.context.router.push('/districts/list/' + constituency.id);
    };
  },

  render: function() {
    return (
      <ConstituenciesListPresentation
        constituencies={this.state.constituencies}
        onEditItem={this.handleConstituencyEdit}
        onRemoveItem={this.handleConstituencyRemove}
        onDistrictsListClick={this.handleDistrictsList}
      />
    );
  }
});

ConstituenciesListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = ConstituenciesListContainer;
