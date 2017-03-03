const React = require('react');
const NavLink = require('../navigation/nav-link');

var PublicResultsListComponent = React.createClass({
	render: function() {
		return (

        <div>     
	      <div className="row">
	      	<div className="side-menu">
	      		<nav className="navbar navbar-default" role="navigation">
	      			<div className="navbar-header">
	      				<div className="side-menu-container">
			      			<ul className="nav navbar-nav">
				              <li><a href="#/single-mandate"><i className="fa fa-user" aria-hidden="true"></i> Vienmandačių Rezultatai</a></li>
				              <li><a href="#/muti-mandate"><i className="fa fa-users" aria-hidden="true"></i> Daugiamandačių Rezultatai</a></li>
				            </ul>
				          </div>
				        </div>
				      </nav>
			      </div>
	          </div>
	          <div>
	          	{this.props.children}
	          </div>
		 </div> 
		);
	}
});



module.exports = PublicResultsListComponent;
