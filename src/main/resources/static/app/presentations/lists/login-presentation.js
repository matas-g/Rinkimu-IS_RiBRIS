const React = require('react');
const NavLink = require('../navigation/nav-link');


var LoginComponent = React.createClass({
	render: function() {
		return (

			<div className="pad-section" id="about">
			  <div className="container">
			    <h1 className="text-center">PRISIJUNKITE KAIP</h1>
			    <div className="row" style={{margin: '150px 0 100px 0'}}>
			      <div className="text-center col-xs-4 col-lg-4">
			        <div className="ih-item square effect6 from_top_and_bottom">
			          <a href="#/admin">
			            <div className="img">
			              <img src = "img/admin.png" />
			            </div>
			            <div className="info">
			              <p>Administratorius</p>
			            </div>
			          </a>
			        </div>
			      </div>
			      <div className="text-center col-xs-4 col-lg-4">
			        <div className="ih-item square effect6 from_top_and_bottom">
			          <a href="#/representative">
			            <div className="img">
			              <img src = "img/user.png" />
			            </div>
			            <div className="info">
			              <p>Atstovas</p>
			            </div>
			          </a>
			        </div>
			      </div>
			      <div className="text-center col-xs-4 col-lg-4">
			        <div className="ih-item square effect6 from_top_and_bottom">
			          <a href="#/">
			            <div className="img">
			                 <img src = "img/public.jpg" />
			            </div>
			            <div className="info">
			              <p>Viešas</p>
			            </div>
			          </a>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>

		);
	}
});

module.exports =  LoginComponent;