var AddCandidateListContainer = React.createClass({
    getInitialState: function() {
        return {
            party: 1,
            parties: []
        };
    },

handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var partyId = {id : this.state.party};
    var dataList = {
        party: partyId
    };
    console.log(this.state.party);
    axios.post('/parties/', dataList).then(function (response) {
        console.log('Kandidatu sarasas pridetas');
        self.context.router.push('/kandidatai');
    });
},

componentWillMount: function() {
    var self = this;
    axios.get('/parties/').then(function(response) {
        self.setState({
            parties: response.data,
            party: response.data[0].id
        });
    });
},

HandlePartyChange: function(e) {
    var partyId = parseInt(e.target.value);
    this.setState({party: partyId});
},

render: function() {
    return (
        <AddCandidateListComponent 
            onHandlePartyChange={this.HandlePartyChange}
            party={this.state.party}
            parties={this.state.parties}
            onSaveClick={this.handleSaveClick}
            onCancelClick={this.handleCancelClick}
        />
    );
}

});

AddCandidateListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

window.AddCandidateListContainer = AddCandidateListContainer;

