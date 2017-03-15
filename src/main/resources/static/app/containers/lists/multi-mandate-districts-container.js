const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const MultiMandateDistrictListComponent = require('../../presentations/lists/multi-mandate-districts-presentation');

var MultiMandateDistrictListContainer = React.createClass({
  getInitialState: function() {
    return {
      districts: [],
      parties: [],
      searchText: '',
      constituencyName: ''
    };
  },

  componentWillMount: function() {
    var self = this;
      axios.get('http://localhost:8090/party-results/districts-results-time/' + self.props.params.constituencyId)
      .then(function (response) {
        self.setState({
            districts: response.data,
            constituencyName: response.data[0].district.constituencyName
          });
        }).then(function() {
          axios.get('http://localhost:8090/party-results/constituency/' + self.props.params.constituencyId)
            .then(function (response) {

            self.setState({
              parties: response.data
            });
        })
    })
},

    handleSearchTextChange: function(e) {
      var text = e.target.value;
      this.setState({
        searchText: text
    });
  },


  render: function() {
    return (
      <MultiMandateDistrictListComponent
        districts={this.state.districts}
        parties={this.state.parties}
        onSearchTextChange={this.handleSearchTextChange}
        searchText={this.state.searchText}
        constituencyName={this.state.constituencyName}
      />
    );
  }
});

MultiMandateDistrictListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = MultiMandateDistrictListContainer;
