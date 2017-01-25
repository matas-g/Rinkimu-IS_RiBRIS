var AddDistrictContainer = React.createClass({
     getInitialState: function() {
        return {
            district: {
                name: '',
                address: '',
                numOfVoters: '',
                representative: '',
            }
        }
    },

handleSaveClick: function(e) {
e.preventDefault();
var self = this;
    axios.post('/polling-districts/', this.state.district).then(function () {
        console.log('Apylinkė pridėta');
        self.context.router.push('/apylinkes');
    });
},

handleFieldChange: function(fieldName) {
var self = this;
    return function(e) {
        var district = self.state.district;
        district[fieldName] = e.target.value;
        self.setState({ district: district });
    };
},

handleCancelClick() {
    this.context.router.push('/apylinkes');
},

render: function() {
    return (
        <AddDistrictComponent
            district={this.state.district}
            onSaveClick={this.handleSaveClick}
            onCancelClick={this.handleCancelClick}
            onFieldChange={this.handleFieldChange}
        />
    );
}

});

AddDistrictContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

window.AddDistrictContainer = AddDistrictContainer;