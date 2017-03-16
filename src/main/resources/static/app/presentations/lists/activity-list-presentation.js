const React = require('react');
const router = require('react-router');
const Link = require('react-router').Link;

var ActivityListComponent = React.createClass({
	render: function() {
    var self = this;
    var nr = 1;
    var activityList = this.props.constituencies.filter(function(constituency) {
        if (constituency.constituency.name.toLowerCase().indexOf(self.props.searchText.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(constituency, index) {
    	console.log(constituency);
    	var link = "/polling-districts/activity/all/" + constituency.constituency.id;
    	return (
        <tr key={index}>
          <td className="candidate-name-decorator"><Link to={link}>{nr++}.{constituency.constituency.name}</Link></td>
          <td style={{textAlign: 'center'}}>{constituency.givenBallots}</td>
          <td style={{textAlign: 'center'}}>{constituency.percentOfAllVoters}%</td>
        </tr>
      );
    });

    return (
      <div className="container-fluid">
       <div className="form-group pull-right">
          <input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchTextChange} />
        </div>
        <h3>Apygardų sąrašas</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-head">
                <th>Pavadinimas</th>
                <th>Balsavusių skaičius</th>
                <th>Rinkėjų aktyvumas procentais</th>
              </tr>
            </thead>
            <tbody>
              {activityList}
            </tbody>
          </table>
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
