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
          candidatesList: this.props.candidatesList,
          partiesList: this.props.partiesList,
          results: this.props.results
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
          onSingleSaveClick={this.props.handleSingleSaveClick}
          onMultiSaveClick={this.props.handleMultiSaveClick}
        />
      );
    }
});

ResultsReportContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = ResultsReportContainer;
