var React = require('react');
var NavLink = require('./nav-link');

var Navigation = React.createClass({
  render: function() {
      var SideNav = this.props.options.map(function(option, index) {
        return (
          <li key={index}>
            <NavLink to={option.pathTo}>{option.text}</NavLink>
          </li>
        );
      });

    return (
      <div className="container">
        <div className="navbar-inner nav-collapse">
          <nav className="navbar navbar-default" role="navigation">
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><NavLink to="/constituencies">Apygardos</NavLink></li>
                <li><NavLink to="/districts">Apylinkes</NavLink></li>
                <li><NavLink to="/parties">Partijos</NavLink></li>
                <li><NavLink to="/candidates">Kandidatai</NavLink></li>
                <li><NavLink to="/representatives">Atstovai</NavLink></li>
                <li><NavLink to="/results">Rezultatai</NavLink></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><NavLink to="/"><span className="glyphicon glyphicon-log-in"></span> Login</NavLink></li>
              </ul>
            </div>
          </nav>
        </div>
        <div id='content' className='row-fluid'>
          <div className="col-sm-2">
            <ul className="nav nav-tabs nav-stacked">
              {SideNav}
            </ul>
          </div>
          <div className="col-sm-10">
            {this.props.childs}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navigation;
