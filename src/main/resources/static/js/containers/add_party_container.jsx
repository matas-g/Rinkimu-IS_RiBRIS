var AddPartyContainer = React.createClass({
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
        console.log('Partija pridėta');
        self.context.router.push('/partijos');
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
        <AddPartyComponent
            party={this.state.party}
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

window.AddPartyContainer = AddPartyContainer;

