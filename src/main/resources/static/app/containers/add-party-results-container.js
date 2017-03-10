const React = require('react');
const axios = require('axios');
const PartyResults = require('../presentations/add-party-results-presentation');

var AddPartyResults = React.createClass({
  getInitialState: function() {
    return {
      district: {
        id: 1
      },
      districts: [],
      partiesList: [],
      voteCount: [],
      votesEnteredState: [],
      valid: true
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/polling-districts/').then(function(response) {
      self.setState({
        districts: response.data,
        district: {
          id: response.data[0].id
        }
      });
      axios.get('http://localhost:8090/parties/').then(function(response) {
        self.setState({
          partiesList: response.data,
        });
      });
    });
  },

  handleDistrictChange: function(e){
    var districtId = parseInt(e.target.value);
    var self = this;
    axios.get('http://localhost:8090/parties/').then(function(response) {
      self.setState({
        partiesList: response.data,
        district: {
          id: districtId
        }
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
    }
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var partiesList = this.state.partiesList;
    var sum = this.state.votesEnteredState.reduce(function(acc, val) {
      return acc + val;
    }, 0);

    if (sum == partiesList.length) {
      self.setState({
        valid: true
      });
      var voteCount = this.state.voteCount;
      for (var i = 0; i < partiesList.length; i++) {
        var data = {
          numberOfVotes: voteCount[i],
          party: {
            id: partiesList[i].id
          },
          date: new Date(),
          district: {
            id: this.state.district.id
          }
        }
        axios.post('http://localhost:8090/party-results/', data);
      }
      self.context.router.push('representative/results/spoiled');
    } else {
      console.log("Alert");
    }
  },

  render: function() {
    return (
      <PartyResults
        district={this.state.district}
        constituencyId={this.state.constituencyId}
        districts={this.state.districts}
        partiesList={this.state.partiesList}
        voteCount={this.state.voteCount}
        onDistrictChange={this.handleDistrictChange}
        onResultsChange={this.handleResultsChange}
        onSaveClick={this.handleSaveClick}
      />
    );
  }
});

AddPartyResults.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddPartyResults;
