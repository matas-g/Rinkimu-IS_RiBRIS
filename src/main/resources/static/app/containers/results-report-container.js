const React = require('react');
const axios = require('axios');
const ResultsReport = require('../presentations/results-report-presentation');

var ResultsReportContainer = React.createClass({
    getInitialState: function() {
        return {
          district: {
            id: this.props.districtId
          },
          constituencyId: this.props.constituencyId,
          districtName: '',
          candidatesList: [],
          partiesList: [],
          results: this.props.results
        }
    },

    componentWillMount: function() {
      var self = this;
      axios.get('http://localhost:8090/candidates/by-constituency/' + this.state.constituencyId).then(function(response) {
        candidatesList = response.data;
        axios.get('http://localhost:8090/polling-districts/' + self.state.district.id).then(function(response) {
          districtName = response.data.name;
          axios.get('http://localhost:8090/parties/').then(function(response) {
            partiesList = response.data;
            self.setState({
              districtName: districtName,
              candidatesList: candidatesList,
              partiesList: partiesList
            });
          });
        });
      });
    },

    handleCancelClick() {
        this.context.router.push('/representative/results/single');
    },

    handleSaveClick() {
			var results = this.state.results;
			for (var i = 0; i < candidatesList.length; i++) {
				var data = {
					district: {
						id: this.state.districtId
					},
					numberOfVotes: results.singleMandateVotes[i],
					candidate: {
						id: candidatesList[i].id
					}
				}
				axios.post('http://localhost:8090/candidates-results/single-mandate/', data);
			}
			for (var i = 0; i < partiesList.length; i++) {
				var data = {
					numberOfVotes: results.partyVotes[i],
					party: {
						id: partiesList[i].id
					},
					district: {
						id: this.state.districtId
					}
				}
				axios.post('http://localhost:8090/party-results/', data);
			}
			var dataList = {
				spoiledSingle: this.state.spoiledSingle,
				spoiledMulti: this.state.spoiledMulti
			}
			axios.post('http://localhost:8090/polling-districts/spoiled-ballots/'+this.state.districtId, dataList);
      this.context.router.push('/representative/results/success');
		},

    render: function() {
      return (
        <ResultsReport
          districtName={this.state.districtName}
          candidatesList={this.state.candidatesList}
          partiesList={this.state.partiesList}
          onCancelClick={this.handleCancelClick}
          results={this.props.results}
          onSaveClick={this.handleSaveClick}
        />
      );
    }
});

ResultsReportContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = ResultsReportContainer;
