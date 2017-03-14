const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const SingleMandateDistrictResultsComponent = require('../../presentations/lists/single-mandate-district-results-presentation');

var SingleMandateDistrictListResultsContainer = React.createClass({
  getInitialState: function() {
    return {
      candidates: [],
    };
  },

  componentWillMount: function() {
    var self = this;
      axios.get('http://localhost:8090/candidates-results/single-mandate/district/' + self.props.params.districtId)
      .then(function (response) {
        self.setState({
            candidates: response.data,
        });
      });
  },

  

  render: function() {
    return (
      <SingleMandateDistrictResultsComponent
        candidates={this.state.candidates}
      />
    );
  }
});

SingleMandateDistrictListResultsContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateDistrictListResultsContainer;
