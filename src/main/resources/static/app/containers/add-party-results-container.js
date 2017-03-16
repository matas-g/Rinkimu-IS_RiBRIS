const React = require('react');
const axios = require('axios');
const PartyResults = require('../presentations/add-party-results-presentation');

var AddPartyResults = React.createClass({
  getInitialState: function() {
    return {
      districts: [],
      voteArray: [],
      votesEnteredState: [],
      text: '',
      spoiledMulti: ''
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/polling-districts/').then(function(response) {
      self.setState({
        districts: response.data,
      });
    });
  },

  handleDistrictChange: function(e){
    var districtId = parseInt(e.target.value);
    var self = this;
    var constituencyId;
    axios.get('http://localhost:8090/polling-districts/' + districtId).then(function(response) {
      constituencyId = response.data.constituencyId;
      self.props.setIds(districtId, constituencyId, self.props.location.pathname);
    });
  },

  handleResultsChange: function(index) {
    var self = this;
    return function(e) {
      var voteArray = self.state.voteArray;
      var enteredState = self.state.votesEnteredState;
      voteArray[index] = e.target.value;
      enteredState[index] = 1;

      self.setState({
        voteArray: voteArray,
        votesEnteredState: enteredState
      });
    }
  },

  handleMultiChange: function(e) {
    var spoiledMulti = e.target.value;
    this.setState({
      spoiledMulti: spoiledMulti
    });
    this.props.onMultiChange(spoiledMulti);
  },

  handleValidStateChange: function(isValid) {
    this.setState({
      isValid: isValid
    });
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var partiesList = this.props.partiesList;
    var sum = this.state.votesEnteredState.reduce(function(acc, val) {
      return acc + val;
    }, 0);

    if (sum == partiesList.length && (this.state.spoiledSingle != '')) {
      var voteArray = this.state.voteArray;
      self.props.handleVotesReport('partyVotes', self.state.voteArray);
      self.context.router.push('/representative/results/parties/report');
    } else {
      this.setState({
        text: "Suveskite balsus visiems laukeliams, nepamirškite įrašyti 0"
      });
    }
  },

  render: function() {
    return (
      <PartyResults
        text={this.state.text}
        handleValidStateChange={this.handleValidStateChange}
        districtId={this.props.districtId}
        constituencyId={this.props.constituencyId}
        districts={this.state.districts}
        partiesList={this.props.partiesList}
        voteArray={this.state.voteArray}
        onDistrictChange={this.handleDistrictChange}
        onResultsChange={this.handleResultsChange}
        onMultiChange={this.handleMultiChange}
        onSaveClick={this.handleSaveClick}
        results={this.props.results}
      />
    );
  }
});

AddPartyResults.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddPartyResults;
