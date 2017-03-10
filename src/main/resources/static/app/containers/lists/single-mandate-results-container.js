const React = require('react');
const axios = require('axios');
const SingleMandateListPresentation = require('../../presentations/lists/single-mandate-results-presentation');

var SingleMandateListContainer = React.createClass({
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

   activeFormatter(cell, row) {
    return (
      <SingleMandateComponent active={ cell } />
    );
  },

  cellButton(cell, row, enumObject, rowIndex) {
    return (
       <button 
          type="button" 
          onClick={() => 
          this.onClickProductSelected(cell, row, rowIndex)}
       >
       Click me { rowIndex }
       </button>
    )
  },

  handleClickProductSelected(cell, row, rowIndex){
     console.log('Product #', rowIndex);
    },

  handleDistrictsList: function(constituency) {
    var self = this;
    return function() {
      self.context.router.push('/admin/districts/list/' + constituency.id);
    };
  },

  render: function() {
    return (
      <SingleMandateListPresentation
        constituencies={this.state.constituencies}
        activeFormatter={this.props.activeFormatter}
        onClickProductSelected={this.handleClickProductSelected}
        cellButton={this.cellButton}
      />
    );
  }
});

SingleMandateListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateListContainer;