var React = require('react');
var Link = require('react-router').Link;

var Button = React.createClass({
	render() {
      var component;
    	if (this.props.representative == null) {
        component =
        	<Link to="/representatives/add">
            <div className="btn btn-success">Pridėti</div>
          </Link>;
      } else {
        component =
          <div>
            {this.props.representative.name} {this.props.representative.surname}
          </div>;
      }
      return component;
    }
});

module.exports = Button;
