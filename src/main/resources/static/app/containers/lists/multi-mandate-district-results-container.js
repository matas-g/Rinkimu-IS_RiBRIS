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
    axios.get('http://localhost:8090/party-results/district/'+ this.props.params.districtId)
    .then(function (response) {
    	self.setState({
            parties: response.data
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