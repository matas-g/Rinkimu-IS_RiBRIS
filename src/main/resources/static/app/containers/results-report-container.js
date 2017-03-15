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
      if(this.props.location.pathname == "representative/results/parties/report") {
        axios.get('http://localhost:8090/polling-districts/' + self.state.district.id).then(function(response) {
          districtName = response.data.name;
          axios.get('http://localhost:8090/parties/').then(function(response) {
            partiesList = response.data;
            self.setState({
              districtName: districtName,
              partiesList: partiesList
            });
          });
        });
      } else {
        axios.get('http://localhost:8090/polling-districts/' + self.state.district.id).then(function(response) {
          districtName = response.data.name;
          axios.get('http://localhost:8090/candidates/by-constituency/' + self.state.constituencyId).then(function(response) {
            candidatesList = response.data;
            self.setState({
              districtName: districtName,
              candidatesList: candidatesList
            });
          });
        });
      }
    },

    handleCancelClick() {
        this.context.router.push('/representative/results/single');
    },

    render: function() {
      return (
        <ResultsReport
          districtName={this.state.districtName}
          candidatesList={this.state.candidatesList}
          partiesList={this.state.partiesList}
          onCancelClick={this.handleCancelClick}
          results={this.props.results}
          onSaveClick={this.props.handleSaveClick}
        />
      );
    }
});

ResultsReportContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = ResultsReportContainer;
