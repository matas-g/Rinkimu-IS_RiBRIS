const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const MultiMandateListPresentation = require('../../presentations/lists/multi-mandate-results-presentation');

var MultiMandateListContainer = React.createClass({
  getInitialState: function() {
    return {
      districts: [],
      parties: [],
      searchParty: '',
      districtName:''
    };
  },

componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/candidates-results/single-mandate/progress/')
    .then(function (response) {
        constituencies = response.data;
     axios.get('http://localhost:8090/candidates-results/single-mandate/winner-candidates/')
    .then(function (response) {
        candidates = response.data;
        self.setState({
            constituencies: constituencies,
            candidates: candidates
        });
    });
  })
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
      	districtName={this.state.distrcitName}
      />
    );
  }
});

MultiMandateListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = MultiMandateListContainer;