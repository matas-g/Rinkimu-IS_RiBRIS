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
			console.log(response.data);
			self.setState({
				candidates: response.data
			});
		});
	},

	render: function() {
		return (
			<CandidateBiographyComponent 
				candidates={this.state.candidates}
			/>
		);
	}
	
});

CandidateBiographyContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = CandidateBiographyContainer;