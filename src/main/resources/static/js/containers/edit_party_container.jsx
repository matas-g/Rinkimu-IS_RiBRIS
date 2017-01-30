var EditPartyContainer = React.createClass({
    getInitialState: function() {
        return {
            party: {
                name: '',
                partyNo: ''
        }
    }
},

handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    console.log(this.state.party);
    axios.post('/parties/', this.state.party).then(function () {
        console.log('Partija atnaujinta');
        self.context.router.push('/partijos');
    });
},

componentDidMount: function() {
    var self = this;
    var partyId = this.props.params.partyId;
      axios.get('/parties/' + partyId).then(function (response) {
        self.setState({ party: response.data });
    });
},

handleFieldChange: function(fieldName) {
    var self = this;
    return function(e) {
      var party = self.state.party;
      party[fieldName] = e.target.value;
      self.setState({ party: party });
    };
},

handleCancelClick() {
    this.context.router.push('/partijos');
},

render: function() {
    return (
        <EditPartyComponent
            party={this.state.party}
            onSaveClick={this.handleSaveClick}
            onCancelClick={this.handleCancelClick}
            onFieldChange={this.handleFieldChange}
        />
     );
    }
});

EditPartyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

window.EditPartyContainer = EditPartyContainer;