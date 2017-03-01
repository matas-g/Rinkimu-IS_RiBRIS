const React = require('react');
const NavLink = require('./nav-link');
const Modal = require('react-bootstrap').Modal;
const Button = require('react-bootstrap').Button;

var NavigationRep = React.createClass({
  render: function() {
    var self = this;

    var SideNav = this.props.options.map(function(option, index) {
      return (
        <li key={index}>
          <NavLink to={option.pathTo}>{option.text}</NavLink>
        </li>
      );
    });

    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeClick}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-inline text-center">
  				    <div className="form-group">
    						<input type="email" className="form-control input" placeholder="Email" style={{ marginRight: '20px' }} />
    						<input type="password" className="form-control input" placeholder="Password" />
  				    </div>
      			</form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" className="btn btn-info btn-sm">Sign in</Button>
            <Button onClick={this.props.closeClick}>Close</Button>
          </Modal.Footer>
        </Modal>
      <div className="container">
        <div className="navbar-inner nav-collapse">
          <nav className="navbar navbar-default" role="navigation">
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
              <li><NavLink to="/representative/results/single">Rezultatai</NavLink></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><NavLink to="/">
                  <span className="glyphicon glyphicon-log-in"> Atsijungti</span>
                </NavLink></li>
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
    </div>
    );
  }
});

module.exports = NavigationRep;
