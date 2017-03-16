const React = require('react');
const axios = require('axios');
const CandidateBiographyComponent = require('../presentations/candidate-biography-presentation');

var CandidateBiographyContainer = React.createClass({
	getInitialState: function() {
		return {
			candidates: []
		}
	},

	componentWillMount: function() {
		var self = this;
		axios.get('http://localhost:8090/candidates/' + this.props.params.candidateId)
		.then(function(response) {
			self.setState({
				candidates: response.data
			});
		});
	},

	handleGoBack: function() {
		this.context.router.goBack();
	},

	render: function() {
		return (
			<CandidateBiographyComponent
				candidates={this.state.candidates}
				handleGoBack={this.handleGoBack}
			/>
		);
	}

});

CandidateBiographyContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = CandidateBiographyContainer;
