const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

const SingleMandateDistrictsComponent = React.createClass({
  render: function() {

  var nr = 1;
  var self = this;
  var DistrictsList = this.props.districts.filter(function(district) {
        if (district.district.name.toLowerCase().indexOf(self.props.searchText.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(district, index) {
      var link = "/single-mandate-district-results/" + district.district.id;
      return (
        <tr key={index}>
          <td><Link to={link}>{nr++}. {district.district.name}</Link></td>
          <td>{district.resultsDateString}</td>
        </tr>
      );
      
    });

    return (

      <div className="container-fluid">
        
          <h3>Balsavimo rezultatai rinkimų apylinkėse</h3>
            <div className="form-group pull-right">
              <input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchTextChange} />
            </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-head">
                <th>Apylinkė</th>
                <th>Rezultatų pateikimo laikas</th>
              </tr>
              </thead>
              <tbody> 
                {DistrictsList}
              </tbody> 
          </table>
      </div>      
    );
  }
});



module.exports = SingleMandateDistrictsComponent;