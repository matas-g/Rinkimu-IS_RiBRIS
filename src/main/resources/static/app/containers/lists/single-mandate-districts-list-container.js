const React = require('react');
const axios = require('axios');
const SingleMandateDistrictListComponent = require('../../presentations/lists/single-mandate-districts-presentation');

var SingleMandateDistrictListContainer = React.createClass({
  getInitialState: function() {
    return {
      districts: []
    };
  },

  componentWillMount: function() {
    var self = this;
    if (self.props.params.constituencyId == undefined) {
      axios.get('http://localhost:8090/polling-districts/')
      .then(function (response) {
        self.setState({
            districts: response.data,
        });
      });
    } else {
      axios.get('http://localhost:8090/constituencies/' + self.props.params.constituencyId)
      .then(function (response) {
        console.log(response);
        self.setState({
            districts: response.data.pollingDistricts,
        });
      });
    }
  },

  render: function() {
    return (
      <SingleMandateDistrictListComponent
        districts={this.state.districts}
      />
    );
  }
});

SingleMandateDistrictListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateDistrictListContainer;
