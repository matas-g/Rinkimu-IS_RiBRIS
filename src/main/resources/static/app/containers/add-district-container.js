const React = require('react');
const axios = require('axios');
const AddDistrictComponent = require('../presentations/add-district-presentation');

var AddDistrictContainer = React.createClass({
  getInitialState: function() {
    return {
       districtName: '',
       address: '',
       numOfVoters: '',
       constituency: {
         id: 0,
         name: ''
       }
    };
  },

  componentWillMount: function() {
    var self = this;
    axios.get('/constituencies/' + self.props.params.constituencyId).then(function(response) {
      self.setState({
        constituency: {
          id: response.data.id,
          name: response.data.name
        }
      });
    });
  },

  /*handleConstituencyChange : function(e){
    var constituencyId = parseInt(e.target.value);
    this.setState({
      constituency: {
        id: constituencyId
      }
    });
  },*/

  handleSaveClick: function(e) {
    e.preventDefault();
    var self = this;
    var dataList = {
      name: this.state.districtName.trim(),
      address: this.state.address,
      numOfVoters: this.state.numOfVoters,
      constituency: {
        id : this.state.constituency.id
      }
    };
    console.log(dataList);
    axios.post('/polling-districts/', dataList).then(function (response) {
      self.context.router.push('/district');
    });
  },

  handleNameChange: function(e) {
    this.setState({districtName: e.target.value});
  },

  handleAddressChange: function(e) {
    this.setState({address: e.target.value});
  },

  handleVotersChange: function(e) {
    this.setState({numOfVoters: e.target.value});
  },

  handleCancelClick() {
      this.context.router.push('/districts/add');
  },

  render: function() {
    return (
      <AddDistrictComponent
        numOfVoters={this.state.numOfVoters}
        constituency={this.state.constituency}
        districtName={this.state.districtName}
        address={this.state.address}

        onNameChange={this.handleNameChange}
        onAddressChange={this.handleAddressChange}
        onVotersChange={this.handleVotersChange}
        onSaveClick={this.handleSaveClick}
        onCancelClick={this.handleCancelClick}
      />
    );
  }
});

AddDistrictContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = AddDistrictContainer;
