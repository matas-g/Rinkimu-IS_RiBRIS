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
				candidatesList: [],
				partiesList: [],
				districtName: '',
				results: {
	        singleMandateVotes: [],
	        partyVotes: [],
	        ratingMandateVotes: [],
					spoiledSingle: '',
					spoiledMulti: ''
	      }
	    };
	  },

		componentWillMount: function() {
	    var self = this;
	    axios.get('http://localhost:8090/polling-districts/').then(function(response) {
	      self.setState({
	        constituencyId: response.data[0].constituencyId,
	        districtId: response.data[0].id
	      });
				axios.get('http://localhost:8090/candidates/by-constituency/' + self.state.constituencyId).then(function(response) {
					candidatesList = response.data;
					self.setState({
						candidatesList: candidatesList
					});
				});
	    });
			axios.get('http://localhost:8090/parties/').then(function(response) {
	      self.setState({
	        partiesList: response.data,
	      });
	    });
	  },

		handleSingleChange: function(spoiledSingle) {
	    var count = spoiledSingle;
			var results = this.state.results;
			results.spoiledSingle = count;
	    this.setState({
	      results: results
	    });
	  },

    handleMultiChange: function(spoiledSingle) {
      var count = spoiledSingle;
			var results = this.state.results;
			results.spoiledMulti = count;
      this.setState({
        results: results
      });
    },

		handleDistrictChange(districtId, constituencyId, pathname) {
			var self = this;
			this.setState({
				districtId: districtId,
				constituencyId: constituencyId
			});
      if(pathname == "representative/results/parties/report") {
        axios.get('http://localhost:8090/polling-districts/' + districtId).then(function(response) {
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
        axios.get('http://localhost:8090/polling-districts/' + districtId).then(function(response) {
          districtName = response.data.name;
          axios.get('http://localhost:8090/candidates/by-constituency/' + constituencyId).then(function(response) {
            candidatesList = response.data;
            self.setState({
              districtName: districtName,
              candidatesList: candidatesList
            });
          });
        });
      }
		},

		handleVotesReport(fieldName, votes) {
			var results = this.state.results;
      results[fieldName] = votes;
      this.setState({
        results: results
      });
	  },

		handleSingleResultsSaveClick() {
			var results = this.state.results;
			var self = this;
			if(this.state.candidatesList.length != 0) {
				for (var i = 0; i < self.state.candidatesList.length; i++) {
					var data = {
						district: {
							id: self.state.districtId
						},
						numberOfVotes: results.singleMandateVotes[i],
						candidate: {
							id: candidatesList[i].id
						}
					}
					axios.post('http://localhost:8090/candidates-results/single-mandate/', data);
				}
			}
			var data = new FormData();
			data.append( 'single', this.state.results.spoiledSingle );
			axios.post('http://localhost:8090/polling-districts/single-spoiled-ballots/' + this.state.districtId,
									data);
			this.context.router.push('/representative/results/success');
		},

		handleMultiResultsSaveClick() {
			var results = this.state.results;
			var self = this;
			if(this.state.partiesList.length != 0) {
				for (var i = 0; i < self.state.partiesList.length; i++) {
					var data = {
						numberOfVotes: results.partyVotes[i],
						party: {
							id: self.state.partiesList[i].id
						},
						district: {
							id: self.state.districtId
						}
					}
					axios.post('http://localhost:8090/party-results/', data);
				}
			}
			var data = new FormData();
			data.append( 'single', this.state.results.spoiledMulti );
			axios.post('http://localhost:8090/polling-districts/multi-spoiled-ballots/' + this.state.districtId,
									data);
			this.context.router.push('/representative/results/success');
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
						onMultiChange: self.handleMultiChange,
						handleMultiSaveClick: self.handleMultiResultsSaveClick,
						handleSingleSaveClick: self.handleSingleResultsSaveClick,
						candidatesList: self.state.candidatesList,
						partiesList: self.state.partiesList,
						handleDistrictChange: self.handleDistrictChange
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
