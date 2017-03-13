const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const SingleMandateDistrictResultsComponent = require('../../presentations/lists/single-mandate-district-results-presentation');

var SingleMandateDistrictListResultsContainer = React.createClass({
  getInitialState: function() {
    return {
      districts: []
    };
  },

  componentWillMount: function() {
    var self = this;
      axios.get('http://localhost:8090/candidates-results/single-mandate/district/' + self.props.params.districtId)
      .then(function (response) {
        self.setState({
            districts: response.data,
        });
      });
  },

  

  render: function() {
    return (
      <SingleMandateDistrictResultsComponent
        districts={this.state.districts}
        cellButton={this.cellButton}
      />
    );
  }
});

SingleMandateDistrictListResultsContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateDistrictListResultsContainer;
