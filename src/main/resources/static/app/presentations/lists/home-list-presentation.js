const React = require('react');
const NavLink = require('../navigation/nav-link');

var HomeListComponent = React.createClass({
	render: function() {
		console.log(this.props);
		return (
		   <div className="container">
	        <div className="navbar-inner nav-collapse">
	          <nav className="navbar navbar-default" role="navigation">
	            <div className="collapse navbar-collapse">
	              <ul className="nav navbar-nav">
	              	<li><a href="#/"><i className="fa fa-home fa-2x" aria-hidden="true"></i></a></li>
	                <li><a href="#/results">Rezultatai</a></li>
	                <li><a href="#/activity">Aktyvumas </a></li>
	              </ul>
	              <ul className="nav navbar-nav navbar-right">
	              	 <li><a href="#/login">
	              	 	<i className="fa fa-sign-in" aria-hidden="true"></i> Prisijungti
	              	 </a></li>
	              </ul>
	            </div>
	          </nav>
	      </div>
	      <div className="col-sm-10">
	        {this.props.children}
	      </div>
	     
	    </div>
		);
	}
});



module.exports = HomeListComponent;
