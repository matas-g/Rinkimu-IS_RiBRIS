var PartiesListContainer = React.createClass({
    getInitialState: function() {
        return {
            parties: []
    };
},

componentWillMount: function() {
  var self = this;
  axios.get('/parties/')
  .then(function (response) {
    self.setState({ 
        parties: response.data 
      });
  });
},


handleAddParty() {
  this.context.router.push('/partijos/prideti');
},

handlePartyEdit: function(party) {
    var self = this;
    return function() {
        self.context.router.push('/partijos/redaguoti/' + party.id);
    }
},

 handlePartyRemove: function(party) { 
  var self = this; 
    return function() { 
      axios.delete('/parties/'+ party.id).then(function(response) { 
          console.log('Partija ištrinta'); 
            axios.get('/parties/') 
            .then(function (response) { 
              self.setState({ parties: response.data }); 
        }); 
    }); 
  };
},

render: function() {
  return (
          <PartiesListComponent 
              parties={this.state.parties} 
              onAddClick={this.handleAddParty} 
              onEditItem={this.handlePartyEdit}
              onRemoveItem={this.handlePartyRemove}
          />
        );
    }
});

PartiesListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

window.PartiesListContainer = PartiesListContainer;