const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const SingleMandateDistrictListComponent = require('../../presentations/lists/single-mandate-districts-presentation');

var SingleMandateDistrictListContainer = React.createClass({
  getInitialState: function() {
    return {
      districts: [],
      candidates: [],
      searchCandidate: '',
      searchDistrict: '',
      constituencyName: ''
    };
  },

  componentWillMount: function() {
    var self = this;
      axios.get('http://localhost:8090/candidates-results/single-mandate/districts-results-time/' + self.props.params.constituencyId)
      .then(function (response) {
        console.log(response.data[0].district.constituencyName);
        self.setState({
            districts: response.data,
            constituencyName: response.data[0].district.constituencyName
          });
        }).then(function() {
          axios.get('http://localhost:8090/candidates-results/single-mandate/constituency/' + self.props.params.constituencyId)
            .then(function (response) {

            self.setState({
              candidates: response.data
            });
        })
    })
},

    handleSearchCandidatesTextChange: function(e) {
      var candidate = e.target.value;
      this.setState({
        searchCandidate: candidate
    });
  },

    handleSearchDistrictsTextChange: function(e) {
      var district = e.target.value;
      this.setState({
        searchDistrict: district
    });
  },




  render: function() {
    return (
      <SingleMandateDistrictListComponent
        districts={this.state.districts}
        candidates={this.state.candidates}
        onSearchCandidatesTextChange={this.handleSearchCandidatesTextChange}
        searchCandidate={this.state.searchCandidate}
        onSearchDistrictsTextChange={this.handleSearchDistrictsTextChange}
        searchDistrict={this.state.searchDistrict}
        constituencyName={this.state.constituencyName}
      />
    );
  }
});

SingleMandateDistrictListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateDistrictListContainer;
