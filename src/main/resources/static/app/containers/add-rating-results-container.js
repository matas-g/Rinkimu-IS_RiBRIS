const React = require('react');
const axios = require('axios');
const SingleMandateResults = require('../presentations/add-single-mandate-results-presentation');

var AddSingleMandateResults = React.createClass({
  getInitialState: function() {
    return {
      district: {
        id: 1
      },
      districts: [],
      candidatesList: [],
      voteCount: [],
      votesEnteredState: [],
      valid: true
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/polling-districts/').then(function(response) {
        var districts = response.data;
        var district = {
          id: response.data[0].id
        };
      });
      axios.get('http://localhost:8090/candidates/rating').then(function(response) {
        self.setState({
          candidatesList: response.data,
          districts: districts,
          district: district
        });
      });
    });
  },

  handleDistrictChange: function(e) {
    var districtId = parseInt(e.target.value);
    var self = this;
    var constituencyId = 0;

    axios.get('http://localhost:8090/polling-districts/' + districtId).then(function(response) {
      constituencyId = response.data.constituencyId;
      axios.get('http://localhost:8090/candidates/by-constituency/' + constituencyId).then(function(response) {
        self.setState({
          constituencyId: constituencyId,
          candidatesList: response.data,
          district: {
            id: districtId
          }
        });
      });
    });
  },

  handleResultsChange: function(index) {
    var self = this;
    return function(e) {
      var voteArray = self.state.voteCount;
      var enteredState = self.state.votesEnteredState;
      voteArray[index] = e.target.value;
      enteredState[index] = 1;

      self.setState({
        voteCount: voteArray,
        votesEnteredState: enteredState
      });
    };
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var candidatesList = this.state.candidatesList;
    var sum = this.state.votesEnteredState.reduce(function(acc, val) {
      return acc + val;
    }, 0);

    if (sum == (candidatesList.length-1)) {
      self.setState({
        valid: true
      });
      var voteCount = this.state.voteCount;
      for (var i = 0; i < candidatesList.length; i++) {
        var data = {
          district: {
            id: this.state.district.id
          },
          numberOfVotes: voteCount[i],
          candidate: {
            id: candidatesList[i].id
          }
        }
        axios.post('http://localhost:8090/candidates-results/single-mandate/', data);
      }
      self.context.router.push('/representative/results/parties');
    } else {
      console.log("Alert");
    }
  },

  render: function() {
    return (
      <SingleMandateResults
        district={this.state.district}
        constituencyId={this.state.constituencyId}
        districts={this.state.districts}
        candidatesList={this.state.candidatesList}
        voteCount={this.state.voteCount}
        onDistrictChange={this.handleDistrictChange}
        onResultsChange={this.handleResultsChange}
        onSaveClick={this.handleSaveClick}
      />
    );
  }
});

AddSingleMandateResults.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddSingleMandateResults;
