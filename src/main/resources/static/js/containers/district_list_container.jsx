var DistrictListContainer = React.createClass({
    getInitialState: function() {
        return {
            districts: []
        };
    },

componentWillMount: function() {
    var self = this;
        axios.get('/polling-districts/')
        .then(function (response) {
            self.setState({ 
                districts: response.data,
        });
    });
},

handleAddDistrict() {
    this.context.router.push('/apylinkes/prideti');
},

handleDistrictEdit: function(district) {
    var self = this;
    return function() {
            self.context.router.push('/apylinkes/redaguoti/' + district.id);
    }
},


    render: function() {
        return (
            <DistrictListComponent 
                districts={this.state.districts} 
                onAddClick={this.handleAddDistrict} 
                onEditItem={this.handleDistrictEdit}
            />

        );
    }

});

DistrictListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

window.DistrictListContainer = DistrictListContainer;