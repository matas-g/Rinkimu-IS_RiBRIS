const React = require('react');
const axios = require('axios');
const AddConstituencies = require('../presentations/add-spoiled-results-presentation');

var AddConstituencyContainer = React.createClass({
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
            id: response.data[0].id
          }
        });
      });
    },

    handleSaveClick: function(e) {
      e.preventDefault();
      var self = this;
      axios.post('http://localhost:8090/polling-districts/').then(function(response) {
        self.setState({
          districts: response.data,
          district: {
            id: response.data[0].id
          }
        });
      });
    },

    handleConstituencyChange: function(e){
      var districtId = parseInt(e.target.value);
      this.setState({
        district: {
          id: districtId
        }
      });
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
        <AddConstituencies
          districts={this.state.districts}
          district={this.state.district}
          voteCountSingle={this.state.voteCountSingle}
          voteCountMulti={this.state.voteCountMulti}
          onSaveClick={this.handleSaveClick}
          onCancelClick={this.handleCancelClick}
          onSingleChange={this.handleSingleChange}
          onMultiChange={this.handleMultiChange}
        />
      );
    }
});

AddConstituencyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddConstituencyContainer;
