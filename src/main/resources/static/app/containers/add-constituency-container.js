const React = require('react');
const axios = require('axios');
const AddConstituencies = require('../presentations/add-constituency-presentation');

var AddConstituencyContainer = React.createClass({
    getInitialState: function() {
        return {
            constituency: {
                name: ''
            },
            constituencyId: 0
        }
    },
    handleSaveClick: function(e) {
        e.preventDefault();
        var self = this;
        axios.post('http://localhost:8090/constituencies/', self.state.constituency).then(function() {
            self.context.router.push('/constituencies');
        });
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
            />
        );
    }
});

AddConstituencyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddConstituencyContainer;
