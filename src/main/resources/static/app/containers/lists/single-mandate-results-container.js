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
      />
    );
  }
});

SingleMandateListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateListContainer;