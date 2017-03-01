const React = require('react');
const axios = require('axios');
const AddConstituencies = require('../presentations/add-constituency-presentation');

var AddConstituencyContainer = React.createClass({
    getInitialState: function() {
        return {
            constituency: {
              id: '',
              name: ''
            },
            constituencyId: 0
        }
    },

    componentDidMount: function() {
      var self = this;
      if (this.props.params.constituencyId != undefined) {
        axios.get('http://localhost:8090/constituencies/' + this.props.params.constituencyId).then(function (response) {
          self.setState({
            constituency: response.data
          });
        });
      }
    },

    // Added for CSV import
    handleUploadMultiCandidateFile: function( file ) {
      this.setState({
        multiCandidateFile: file
      });
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
        data.append( 'id', self.state.constituency.id );
        data.append( 'name', self.state.constituency.name );

        // Creating party with CSV candidate list
        if (self.state.multiCandidateFile) {
          data.append( 'file', self.state.multiCandidateFile );

          axios.post('http://localhost:8090/constituencies/csv/', data, config).then(function (response) {
              self.context.router.push('/constituencies/');
            }).catch( function( error ) {
              console.log(error.response.status);
            });

        } else {
          // Creating party without CSV candidate list
          axios.post('http://localhost:8090/constituencies/', data, config).then(function (response) {
              self.context.router.push('/constituencies/');
            }).catch( function( error ) {

            });
        }
    },

    handleFieldChange: function(fieldName) {
         var self = this;
            return function(e) {
              var constituency = self.state.constituency;
              constituency[fieldName] = e.target.value;
              self.setState({
                constituency: constituency
              });
        };
    },

    handleCancelClick() {
        this.context.router.push('/constituencies');
    },

    render: function() {
        return (
            <AddConstituencies
                constituency={this.state.constituency}
                onSaveClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}
                onFieldChange={this.handleFieldChange}
                onUploadMultiCandidateFile={this.handleUploadMultiCandidateFile}
            />
        );
    }
});

AddConstituencyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddConstituencyContainer;
