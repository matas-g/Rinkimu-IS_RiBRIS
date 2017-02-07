const React = require('react');
const axios = require('axios');
const ConstituenciesListComponent = require('../../presentations/lists/constituencies-list-presentation');

var ConstituenciesListContainer = React.createClass({
  getInitialState: function() {
    return {
      constituencies: []
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('/constituencies/')
    .then(function (response) {
      self.setState({
        constituencies: response.data
      });
    });
  },

  handleCancelClick() {
    this.context.router.push('/constituencies');
  },

  handleAddConstituency() {
    this.context.router.push('/constituencies/add');
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
      axios.delete('/constituencies/'+ constituency.id).then(function(response) {
        console.log('Apygarda ištrinta');
        axios.get('/constituencies/')
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
      self.context.router.push('/constituencies/' + constituency.id + '/district');
    }
  },



  render: function() {
    return (
      <ConstituenciesListComponent
        onCancelClick={this.handleCancelClick}
        constituencies={this.state.constituencies}
        onAddClick={this.handleAddConstituency}
        onEditItem={this.handleConstituencyEdit}
        onRemoveItem={this.handleConstituencyRemove}
        onDistrictsList={this.handleDistrictsList}
      />
    );
  }
});

ConstituenciesListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = ConstituenciesListContainer;
