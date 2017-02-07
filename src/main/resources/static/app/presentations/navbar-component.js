var React = require('react');
var NavLink = require('./nav-link');

var Navigation = React.createClass({
  render: function() {
    return (
      <div className="container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><NavLink to="/"><i className="fa fa-home fa-2x" aria-hidden="true"></i></NavLink></li>
              <li><NavLink to="/constituencies">Apygardos</NavLink></li>
              <li><NavLink to="/districts">Apylinkes</NavLink></li>
              <li><NavLink to="/parties">Partijos</NavLink></li>
              <li><NavLink to="/candidates">Kandidatai</NavLink></li>
              <li><NavLink to="/results">Rezultatai</NavLink></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
    					<li><NavLink to="/"><span className="glyphicon glyphicon-log-in"></span> Login</NavLink></li>
    				</ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Navigation;
