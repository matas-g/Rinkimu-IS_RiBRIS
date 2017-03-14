const React = require('react');
const router = require('react-router');


var DistrictsActivityListComponent = React.createClass({
	handleClick: function(e) {
	    this.router.transitionTo('index');
	  },
	
	render: function() {
    var self = this;
    var nr = 1;
    var activityList = this.props.districts.filter(function(district) {
        if (district.district.name.toLowerCase().indexOf(self.props.searchText.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(district, index) {
    	return (
        <tr key={index}>
        <td>{nr++}</td>
          <td>{district.district.name}</td>
          <td>{district.givenBallots}</td>
          <td>{district.percentOfAllVoters}%</td>
        </tr>
      );
    });

    return (
      <div className="container-fluid">
        <div className="form-group pull-right">
          <input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchTextChange} />
        </div>
        <h3>Apylinkių sąrašas</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-head">
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
    );
  }
});

//DistrictListComponent.propTypes = {
//  onRemoveItem: React.PropTypes.func.isRequired,
//  districts: React.PropTypes.array.isRequired,
//  onEditItem: React.PropTypes.func.isRequired
//}

module.exports = DistrictsActivityListComponent;
