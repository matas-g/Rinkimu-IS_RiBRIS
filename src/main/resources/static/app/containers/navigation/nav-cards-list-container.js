const React = require('react');
const axios = require('axios');
const NavListPresentation = require('../../presentations/navigation/nav-cards-list-presentation');
const ConstituenciesOptions = require('../../util/options-for-menu/constituency-options');
const DistrictOptions = require('../../util/options-for-menu/district-options');
const CandidatesOptions = require('../../util/options-for-menu/candidates-options');
const PartiesOptions = require('../../util/options-for-menu/parties-options');
const ResultsOptions = require('../../util/options-for-menu/results-options');

var NavListContainer = React.createClass({

  getInitialState: function() {
    return {
      details: []
    };
  },

  componentWillReceiveProps(nextProps) {
    var self = this;
    if (self.props.location.pathname == "/constituencies") {
      self.setState({
        details: ConstituenciesOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/districts") {
      self.setState({
        details: DistrictOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/parties") {
      self.setState({
        details: PartiesOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/candidates") {
      self.setState({
        details: CandidatesOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/results") {
      self.setState({
        details: ResultsOptions
      });
      self.forceUpdate();
    }
  },

  render: function() {
    return (
      <NavListPresentation
        details={this.state.details}
      />);
  }
});

NavListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = NavListContainer;
