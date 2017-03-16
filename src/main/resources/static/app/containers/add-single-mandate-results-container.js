const React = require('react');
const axios = require('axios');
const SingleMandateResults = require('../presentations/add-single-mandate-results-presentation');

var AddSingleMandateResults = React.createClass({
  getInitialState: function() {
    return {
      districts: [],
      voteArray: [],
      votesEnteredState: [],
      text: '',
      spoiledSingle: ''
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/polling-districts/').then(function(response) {
      self.setState({
        districts: response.data
      });
    });
  },

  handleDistrictChange: function(e) {
    var districtId = parseInt(e.target.value);
    var self = this;
    var constituencyId;
    axios.get('http://localhost:8090/polling-districts/' + districtId).then(function(response) {
      constituencyId = response.data.constituencyId;
      self.props.setIds(districtId, constituencyId, self.props.location.pathname);
    });
  },

  handleValidStateChange: function(isValid) {
    this.setState({
      isValid: isValid
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
    };
  },

  handleSingleChange: function(e) {
    var spoiledSingle = e.target.value;
    this.setState({
      spoiledSingle: spoiledSingle
    });
    this.props.onSingleChange(spoiledSingle);
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var candidatesList = this.props.candidatesList;
    var sum = this.state.votesEnteredState.reduce(function(acc, val) {
      return acc + val;
    }, 0);
    if (sum == (candidatesList.length) && (this.state.spoiledSingle != '')) {
      self.props.handleVotesReport('singleMandateVotes', self.state.voteArray);
      self.context.router.push('/representative/results/single/report');
    } else {
      this.setState({
        text: "Suveskite balsus visiems laukeliams, nepamirškite įrašyti 0"
      });
    }
  },

  render: function() {
    return (
      <SingleMandateResults
        text={this.state.text}
        handleValidStateChange={this.handleValidStateChange}
        districtId={this.props.districtId}
        constituencyId={this.state.constituencyId}
        districts={this.state.districts}
        candidatesList={this.props.candidatesList}
        voteArray={this.state.voteArray}
        onDistrictChange={this.handleDistrictChange}
        onResultsChange={this.handleResultsChange}
        onSaveClick={this.handleSaveClick}
        onSingleChange={this.handleSingleChange}
        results={this.props.results}
      />
    );
  }
});

AddSingleMandateResults.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddSingleMandateResults;
