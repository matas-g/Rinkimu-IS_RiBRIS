const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const MultiMandateListPresentation = require('../../presentations/lists/multi-mandate-district-results-presentation');

var MultiMandateDistrictListResultContainer = React.createClass({
  getInitialState: function() {
    return {
      parties: [],
      searchParty: '',
      districtName:''
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/party-results/district/'+ this.props.params.districtId)
    .then(function (response) {
    	self.setState({
            parties: response.data
        });
    });
    axios.get('http://localhost:8090/polling-districts/'+ this.props.params.districtId)
    .then(function (response) {
    	self.setState({
            districtName: response.data.name
        });
    });
  },



  handleSearchPartyTextChange: function(e) {
      var party = e.target.value;
      this.setState({
        searchParty: party
    });
  },

  render: function() {
    return (
      <MultiMandateListPresentation
        parties={this.state.parties}
        onSearchPartyTextChange={this.handleSearchPartyTextChange}
        searchParty={this.state.searchParty}
        constituencyName={this.state.constituencyName}
        districtName={this.state.districtName}
      />
    );
  }
});

MultiMandateDistrictListResultContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = MultiMandateDistrictListResultContainer;
