const React = require('react');
const axios = require('axios');
const Modal = require('react-bootstrap');
const NavPresentation = require('../../presentations/navigation/navbar-rep-presentation');
const ResultsOptions = require('../../util/options-for-menu/results-options');

var NavRepContainer = React.createClass({

	  getInitialState: function() {
	    return {
	      options: ResultsOptions,
				districtId: 0,
				constituencyId: 0,
				results: {
	        singleMandateVotes: [],
	        partyVotes: [],
	        ratingMandateVotes: [],
					spoiledSingle: '',
					spoiledMulti: ''
	      }
	    };
	  },

		handleSingleChange: function(e) {
	    var count = e.target.value;
			var results = this.state.results;
			results.spoiledSingle = count;
	    this.setState({
	      results: results
	    });
	  },

    handleMultiChange: function(e) {
      var count = e.target.value;
			var results = this.state.results;
			results.spoiledMulti = count;
      this.setState({
        results: results
      });
    },

		handleDistrictChange(districtId, constituencyId) {
			this.setState({
				districtId: districtId,
				constituencyId: constituencyId
			});
		},

		handleVotesReport(fieldName, votes) {
			var results = this.state.results;
      results[fieldName] = votes;
      this.setState({
        results: results
      });
	  },

	  render: function() {
			var self = this;

			const childs = React.Children.map(this.props.children,
	      function(child) {
	        return React.cloneElement(child, {
	          handleVotesReport: self.handleVotesReport,
						results: self.state.results,
						setIds: self.handleDistrictChange,
						districtId: self.state.districtId,
						constituencyId: self.state.constituencyId,
						onSingleChange: self.handleSingleChange,
						onMultiChange: self.handleMultiChange
	        })
	      }
	    );
	    return (
	      <div>
	        <NavPresentation
						handleVotesReport={this.handleVotesReport}
	          options={this.state.options}
	          childs={childs}
	        />
	      </div>
	    );
	  }
	});

NavRepContainer.contextTypes = {
	  router: React.PropTypes.object.isRequired,
	};

	module.exports = NavRepContainer;
