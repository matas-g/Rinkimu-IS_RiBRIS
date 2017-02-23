const React = require('react');
const axios = require('axios');
const SingleMandateResults = require('../presentations/add-single-mandate-results-presentation');

var AddSingleMandateResults = React.createClass({
  getInitialState: function() {
    return {
      district: {
        id: 10
      },
      constituencyId: 1,
      districts: [],
      candidatesList: [],
      voteCount: []
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('http://localhost:8090/polling-districts/').then(function(response) {
      self.setState({
        districts: response.data,
        constituencyId: response.data[0].constituencyId,
        district: {
          id: response.data[0].id
        }
      });
      axios.get('http://localhost:8090/candidates/by-constituency/' + self.state.constituencyId).then(function(response) {
        self.setState({
          candidatesList: response.data,
        });
      });
    });
  },

  handleDistrictChange: function(e){
    var districtId = parseInt(e.target.value);
    var self = this;
    this.setState({
      district: {
        id: districtId
      }
    });
    axios.get('http://localhost:8090/polling-districts/' + this.state.district.id).then(function(response) {
      self.setState({
        constituencyId: response.data.constituencyId
      });

    });
    axios.get('http://localhost:8090/candidates/by-constituency/' + this.state.constituencyId).then(function(response) {
      self.setState({
        candidatesList: response.data,
      });
    });

  },

  handleResultsChange: function(index) {
    var self = this;
    return function(e) {
      var voteArray = self.state.voteCount;
      voteArray[index] = e.target.value;
      self.setState({
        voteCount: voteArray
      });
    };
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var candidatesList = this.state.candidatesList;

    var voteCount = this.state.voteCount;
    for (var i = 0; i < candidatesList.length; i++) {
      var data = {
        numberOfVotes: voteCount[i],
        candidate: {
          id: candidatesList[i].id
        }
      }
      axios.post('http://localhost:8090/candidates-results/single-mandate/', data);
    }
    self.context.router.push('/results');
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
