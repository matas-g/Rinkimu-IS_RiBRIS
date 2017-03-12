const React = require('react');
const router = require('react-router');
const Link = require('react-router').Link;

var ActivityListComponent = React.createClass({
	render: function() {
    var self = this;
    var nr = 1;
    var activityList = this.props.constituencies.map(function(constituency, index) {
    	console.log(constituency);
    	var link = "/polling-districts/activity/all/" + constituency.constituency.id;
    	return (
        <tr key={index}>
          <td>{nr++}</td>
          <td><Link to={link}>{constituency.constituency.name}</Link></td>
          <td>{constituency.givenBallots}</td>
          <td>{constituency.percentOfAllVoters}%</td>
        </tr>
      );
    });

    return (
      <div className="container-fluid">
        <div className="panel panel-default">
        <div className="panel-heading"><strong>Apygardų sąrašas</strong></div>
          <table className="table">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Pavadinimas</th>
                <th>Balsavusių skaičius</th>
                <th>Balsai procentaliai</th>
              </tr>
            </thead>
            <tbody>
              {activityList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

//DistrictListComponent.propTypes = {
//  onRemoveItem: React.PropTypes.func.isRequired,
//  districts: React.PropTypes.array.isRequired,
//  onEditItem: React.PropTypes.func.isRequired
//}

module.exports = ActivityListComponent;
