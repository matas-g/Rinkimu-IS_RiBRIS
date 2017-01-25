var ConstituenciesListContainer = React.createClass({
    getInitialState: function() {
        return {
            constituencies: []
        };
    },

 componentWillMount: function() {
    var self = this;
    axios.get('/constituencies/')
    .then(function (response) {
        self.setState({ 
            constituencies: response.data 
        });
    });
},

handleAddConstituency() {
    this.context.router.push('/apygardos/prideti');
},

handleConstituencyEdit: function(constituency) {
    var self = this;
    return function() {
            self.context.router.push('/apygardos/redaguoti/' + constituency.id);
    }
},


    render: function() {
        return (
            <ConstituenciesListComponent 
                constituencies={this.state.constituencies} 
                onAddClick={this.handleAddConstituency} 
                onEditItem={this.handleConstituencyEdit}
            />
        );
    }
});

ConstituenciesListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

window.ConstituenciesListContainer = ConstituenciesListContainer;