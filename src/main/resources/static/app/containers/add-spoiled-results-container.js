const React = require('react');
const axios = require('axios');
const AddSpoiledResults = require('../presentations/add-spoiled-results-presentation');

var AddSpoiledBallotsContainer = React.createClass({
    getInitialState: function() {
        return {
          district: {
            id: 1
          },
          districts: [],
          voteCountSingle: '',
          voteCountMulti: ''
        }
    },

    componentWillMount: function() {
      var self = this;
      axios.get('http://localhost:8090/polling-districts/').then(function(response) {
        self.setState({
          districts: response.data,
          district: {
            id: response.data[0].id,
    		name: response.data[0].name,
    		address: response.data[0].address,
    		numOfVoters: response.data[0].numOfVoters
          }
        });
      });
    },

    handleSaveClick: function(e) {
      e.preventDefault();
      var self = this;
      console.log(this.state);
      var dataList = {
      		  spoiledSingle: this.state.voteCountSingle,
              spoiledMulti: this.state.voteCountMulti
      		};
      
      axios.post('http://localhost:8090/polling-districts/spoiled-ballots/'+this.state.district.id, dataList)
    },

    handleDistrictChange: function(e){
      var districtId = parseInt(e.target.value);
      this.setState({
        district: {
          id: districtId
        }
      });
      
      console.log(this.state);
    },
    

    handleSingleChange: function(e) {
      var count = e.target.value;
      this.setState({
        voteCountSingle: count
      });
    },

    handleMultiChange: function(e) {
      var count = e.target.value;
      this.setState({
        voteCountMulti: count
      });
    },

    handleCancelClick() {
        this.context.router.push('/representative');
    },

    render: function() {
      return (
        <AddSpoiledResults
          districts={this.state.districts}
          district={this.state.district}
          voteCountSingle={this.state.voteCountSingle}
          voteCountMulti={this.state.voteCountMulti}
          onSaveClick={this.handleSaveClick}
          onCancelClick={this.handleCancelClick}
          onSingleChange={this.handleSingleChange}
          onMultiChange={this.handleMultiChange}
          onDistrictChange={this.handleDistrictChange}
        />
      );
    }
});

AddSpoiledBallotsContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddSpoiledBallotsContainer;
