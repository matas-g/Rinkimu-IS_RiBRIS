const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const MultiMandateDistrictListComponent = require('../../presentations/lists/multi-mandate-districts-presentation');

var MultiMandateDistrictListContainer = React.createClass({
  getInitialState: function() {
    return {
      districts: [],
      parties: [],
      searchParty: '',
      searchDistrict: '',
      constituencyName: ''
    };
  },

  componentWillMount: function() {
    var self = this;
      axios.get('http://localhost:8090/party-results/districts-results-time/' + self.props.params.constituencyId)
      .then(function (response) {
        self.setState({
            districts: response.data,
            constituencyName: response.data[0].district.constituencyName
          });
        }).then(function() {
          axios.get('http://localhost:8090/party-results/winner-parties/')
            .then(function (response) {

            self.setState({
              parties: response.data
            });
        })
    })
},

    handleSearchPartyTextChange: function(e) {
      var party = e.target.value;
      this.setState({
        searchParty: party
    });
  },
  
  handleSearchDistrictTextChange: function(e) {
      var district = e.target.value;
      this.setState({
        searchDistrict: district
    });
  },


  render: function() {
    return (
      <MultiMandateDistrictListComponent
        districts={this.state.districts}
        parties={this.state.parties}
        onSearchPartyChange={this.handleSearchPartyTextChange}
      	onSearchDistrictChange={this.handleSearchDistrictTextChange}
        searchParty={this.state.searchParty}
      	searchDistrict={this.state.searchDistrict}
        constituencyName={this.state.constituencyName}
      />
    );
  }
});

MultiMandateDistrictListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = MultiMandateDistrictListContainer;
