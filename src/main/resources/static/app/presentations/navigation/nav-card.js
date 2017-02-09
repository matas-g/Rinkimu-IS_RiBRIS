var React = require('react');
var Link = require('react-router').Link;

var NavCard = React.createClass({
  render() {
    return (
      <Link to={this.props.pathTo}>
          <div className="col-sm-6 col-md-3 hop">
            <div className="thumbnail">
              <img src={this.props.image}  alt="..."/>
              <div className="text-center caption">
                <h4>{this.props.title}</h4>
              </div>
            </div>
          </div>
      </Link>
    );
  }
});

module.exports = NavCard;
