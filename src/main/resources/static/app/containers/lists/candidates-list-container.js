const React = require('react');
const axios = require('axios');
const CandidatesList = require('../../presentations/lists/candidates-list-presentation');

var PartiesListContainer = React.createClass({
  getInitialState: function() {
    return {
      candidates: [],
      constituencies: []
    };
  },

  componentWillMount: function() {
    var self = this;
    var candidates;
    if (self.props.location.pathname == "/admin/candidates") {
      axios.get('http://localhost:8090/candidates/')
      .then(function (response) {
        candidates = response.data;
      }).then(function(){
    	  axios.get('http://localhost:8090/constituencies/').then(function (response) {
    		  self.setState({
    			  candidates: candidates,
    			  constituencies: response.data
    		  });
    	  }) 
      });
    } else if (self.props.location.pathname.includes("constituency")) {
      axios.get('http://localhost:8090/candidates/by-constituency/' + self.props.params.constituencyId)
      .then(function (response) {
        candidates = response.data;
      }).then(function(){
    	  axios.get('http://localhost:8090/constituencies/').then(function (response) {
    		  self.setState({
    			  candidates: candidates,
    			  constituencies: response.data
    		  });
    	  })
      });
    } else {
      axios.get('http://localhost:8090/candidates/by-party/' + self.props.params.partyId)
      .then(function (response) {
            candidates = response.data;
      	}).then(function(){
    	  axios.get('http://localhost:8090/constituencies/').then(function (response) {
    		  self.setState({
    			  candidates: candidates,
    			  constituencies: response.data
    		  });
    	  })
      });
    }
  },
      
  handleCandidateRemove: function(candidate) {
    var self = this;
    return function() {
      axios.delete('http://localhost:8090/candidates/'+ candidate.id).then(function() {
        if (self.props.params.constituencyId == undefined) {
          axios.get('http://localhost:8090/candidates/')
          .then(function (response) {
            self.setState({
                candidates: response.data,
            });
          });
        } else {
          axios.get('http://localhost:8090/candidates/by-constituency/' + self.props.params.constituencyId)
          .then(function (response) {
            self.setState({
                candidates: response.data,
            });
          });
        }
      });
    };
  },

  render: function() {
    return (
      <CandidatesList
        candidates={this.state.candidates}
//        onEditItem={this.handleCandidateEdit}
        onRemoveItem={this.handleCandidateRemove}
      	constituencies={this.state.constituencies}
      />
    );
  }
});

PartiesListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = PartiesListContainer;
