const React = require('react');
const axios = require('axios');
const Modal = require('react-bootstrap');
const NavPresentation = require('../../presentations/navigation/navbar-rep-presentation');
const ResultsOptions = require('../../util/options-for-menu/results-options');

var NavRepContainer = React.createClass({

	  getInitialState: function() {
	    return {
	      options: ResultsOptions,
	      showModal: false
	    };
	  },

	  componentWillReceiveProps(nextProps) {
	    var self = this;
	    if (self.props.location.pathname == "/representative/results") {
	      self.setState({
	        options: ConstituenciesOptions
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
	        />
	      </div>
	    );
	  }
	});

NavRepContainer.contextTypes = {
	  router: React.PropTypes.object.isRequired,
	};

	module.exports = NavRepContainer;
