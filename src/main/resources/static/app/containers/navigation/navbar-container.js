const React = require('react');
const axios = require('axios');
const Modal = require('react-bootstrap');
const NavPresentation = require('../../presentations/navigation/navbar-presentation');
const ConstituenciesOptions = require('../../util/options-for-menu/constituencies-options');
const DistrictsOptions = require('../../util/options-for-menu/districts-options');
const CandidatesOptions = require('../../util/options-for-menu/candidates-options');
const PartiesOptions = require('../../util/options-for-menu/parties-options');
const ResultsOptions = require('../../util/options-for-menu/results-options');
const RepresentativesOptions = require('../../util/options-for-menu/representatives-options');

var NavContainer = React.createClass({

  getInitialState: function() {
    return {
      options: ConstituenciesOptions,
      showModal: false
    };
  },

  handleCloseClick() {
    this.setState({ showModal: false });
  },

  handleOpenClick() {
    this.setState({ showModal: true });
  },

  componentWillReceiveProps(nextProps) {
    var self = this;
    if (self.props.location.pathname == "/constituencies") {
      self.setState({
        options: ConstituenciesOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/districts") {
      self.setState({
        options: DistrictsOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/parties") {
      self.setState({
        options: PartiesOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/candidates") {
      self.setState({
        options: CandidatesOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/results") {
      self.setState({
        options: ResultsOptions
      });
      self.forceUpdate();
    } else if (self.props.location.pathname == "/representatives") {
      self.setState({
        options: RepresentativesOptions
      });
      self.forceUpdate();
    }
  },

  render: function() {
    return (
      <div>
        <NavPresentation
          options={this.state.options}
          childs={this.props.children}
          showModal={this.state.showModal}
          openClick={this.handleOpenClick}
          closeClick={this.handleCloseClick}
        />
      </div>
    );
  }
});

NavContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = NavContainer;
