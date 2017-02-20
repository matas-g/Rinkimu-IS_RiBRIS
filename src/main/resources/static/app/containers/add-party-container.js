const React = require('react');
const axios = require('axios');
const AddParty = require('../presentations/add-party-presentation');

var AddPartyContainer = React.createClass({
    getInitialState: function() {
        return {
          party: {
            name: '',
            partyNo: ''
          }
        }
    },

    // Added for CSV import
    handleUploadMultiCandidateFile: function( file ) {
        this.setState( { multiCandidateFile: file });
    },
    
    handleSaveClick: function(e) {
        e.preventDefault();
        var self = this;
        var data = new FormData();
        var config = {
        	headers: {
        		'Content-Type': 'multipart/form-data'
        	}
        };
        data.append( 'name', self.state.party.name );
        data.append( 'partyNo', self.state.party.partyNo );
        data.append( 'file', self.state.multiCandidateFile );
        
        axios.post('http://localhost:8090/parties/', data, config).then(function (response) {
        	console.log("multi-candidate party list added.");
        	self.context.router.push('/parties/');
        }).catch( function( error ) {
        	console.error( error );
        });
    },
    
//    Original code (before CSV import):
//    handleSaveClick: function(e) {
//      e.preventDefault();
//      var self = this;
//      var party = this.state.party
//      axios.post('http://localhost:8090/parties/', party).then(function (response) {
//        self.context.router.push('/parties/');
//      });
//    },

    handleFieldChange: function(fieldName) {
        var self = this;
        return function(e) {
          var party = self.state.party;
          party[fieldName] = e.target.value;
          self.setState({
            party: party
          });
        };
    },

    handleCancelClick() {
        this.context.router.push('/parties');
    },

    render: function() {
        return (
            <AddParty
                party={this.state.party}
            	onUploadMultiCandidateFile={this.handleUploadMultiCandidateFile}
                onSaveClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}
                onFieldChange={this.handleFieldChange}
            />
        );
    }
});

AddPartyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddPartyContainer;
