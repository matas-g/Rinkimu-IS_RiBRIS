const React = require('react');
const NavLink = require('../navigation/nav-link');

var HomeListComponent = React.createClass({
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
	    </div>
		);
	}
});



module.exports = HomeListComponent;
