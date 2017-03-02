const React = require('react');
const NavLink = require('../navigation/nav-link');

var PublicResultsListComponent = React.createClass({
	render: function() {
		return (
		   <div className="container">
	        <div className="navbar-inner nav-collapse">
	          <nav className="navbar navbar-default" role="navigation">
	            <div className="collapse navbar-collapse">
	              <ul className="nav navbar-nav">
	              	<li><NavLink to="/"><i className="fa fa-home fa-2x" aria-hidden="true"></i></NavLink></li>
	                <li><NavLink to="/results">Rezultatai </NavLink></li>
	                <li><NavLink to="/activity">Aktyvumas </NavLink></li>
	                <li><NavLink to="/admin">Administratoriui</NavLink></li>
	                <li><NavLink to="/representative">Atstovui</NavLink></li>
	              </ul>
	            </div>
	          </nav>
	      </div>
               
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
		    </div>
		);
	}
});



module.exports = PublicResultsListComponent;
