var React = require('react');
var NavCard = require('./nav-card');

var NavCardList = function(props) {
  var navCards = props.details.map(function (detail, index) {
    return (
      <NavCard
        key={index}
        image={detail.img}
        title={detail.title}
        pathTo={detail.pathTo}
      />
    );
  });
  return (
      <div className="container-fluid">
        <div className="row">
          {navCards}
        </div>
      </div>
    );
};

module.exports = NavCardList;
