var AddDistrictContainer = React.createClass({
    handleSaveClick: function(e) {
e.preventDefault();
var self = this;
var constituencyId = {id : this.state.constituency};
var postRequest = {
      constituency : constituencyId,
    };
    axios.post('/polling-districts/', this.state.district, postRequest).then(function () {
        console.log('Apylinkė pridėta');
        self.context.router.push('/apylinkes');
    });
},
     getInitialState: function() {
        return {
            district: {
                name: '',
                address: '',
                numOfVoters: '',
                representative: ''
            },
            constituency: 1,
            constituencies: []
        }
    },

componentWillMount: function() {
   var self = this;
   axios.get('/constituencies/').then(function(response) {
        self.setState({
            constituencies: response.data,
            constituency:  response.data[0].id,
        });
   });
},
 
 onHandleConstituencyChange : function(event){
    var constituencyId = parseInt(event.target.value);
    this.setState({constituency : constituencyId});
    console.log(this.state);
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
            onHandleConstituencyChange={this.onHandleConstituencyChange}
            onFieldChange={this.handleFieldChange}
            constituencies={this.state.constituencies}
            constituency={this.state.constituency}
        />
    );
}

});

AddDistrictContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

window.AddDistrictContainer = AddDistrictContainer;