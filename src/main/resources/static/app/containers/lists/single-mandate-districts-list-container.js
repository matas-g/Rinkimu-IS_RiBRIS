const React = require('react');
const axios = require('axios');
const Link = require('react-router').Link;
const SingleMandateDistrictListComponent = require('../../presentations/lists/single-mandate-districts-presentation');

var SingleMandateDistrictListContainer = React.createClass({
  getInitialState: function() {
    return {
      districts: []
    };
  },

  componentWillMount: function() {
    var self = this;
      axios.get('http://localhost:8090/candidates-results/single-mandate/districts-results-time/' + self.props.params.constituencyId)
      .then(function (response) {
        self.setState({
            districts: response.data,
        });
      });
  },

  cellButton(cell, row, enumObject, rowIndex) {
    var link = "/single-mandate-district-results/" + this.state.districts[rowIndex].district.id;
    return (
       <Link 
          to={link} 
       >
       {this.state.districts[rowIndex].district.name}
       </Link>
    )
  },

  render: function() {
    return (
      <SingleMandateDistrictListComponent
        districts={this.state.districts}
        cellButton={this.cellButton}
      />
    );
  }
});

SingleMandateDistrictListContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = SingleMandateDistrictListContainer;
