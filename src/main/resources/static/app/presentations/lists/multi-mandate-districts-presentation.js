const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

const MultiMandateDistrictsComponent = React.createClass({
  render: function() {

  var nr = 1;
  var self = this;
  var num = 1;

  var PartiesList = this.props.parties.filter(function(party) {
		 if (party.party.name.toLowerCase().indexOf(self.props.searchParty.toLowerCase()) === -1) {
		        return false;
		      } else {
		        return true;
		      };
	}).map(function(party, index){
 	return (
 		<tr key={index}>
 			<td className="text-middle" style={{verticalAlign: 'middle'}}>{party.party.name}</td>
 			<td className="text-middle" style={{verticalAlign: 'middle'}}>{party.votes}</td>
 			<td className="text-middle" style={{verticalAlign: 'middle'}}>{party.percentOfAllBallots}%</td>
 			<td className="text-middle" style={{verticalAlign: 'middle'}}>{party.numOfMandatesWon}</td>
 		</tr>
 	);
 });


  var DistrictsList = this.props.districts.filter(function(district) {
        if (district.district.name.toLowerCase().indexOf(self.props.searchDistrict.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(district, index) {
      var link = "/multi-mandate-district-results/" + district.district.id;
      return (
        <tr key={index}>
          <td className="candidate-name-decorator"><Link to={link}>{nr++}. {district.district.name}</Link></td>
          <td className="text-middle" style={{verticalAlign: 'middle'}}>{district.resultsDateString}</td>
        </tr>
      );
      
    });

     return (

        <div className="container-fluid">
          <div className="form-group pull-right">
            <input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchPartyTextChange} />
          </div>
            <h3>Balsavimo rezultatai daugiamandatėje {this.props.constituencyName} apygardoje</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-head"> 
                <th className="text-middle" style={{verticalAlign: 'middle'}}>Partija</th>
                <th className="text-middle" style={{verticalAlign: 'middle'}}>Balsai iš viso</th>
                <th className="text-middle" style={{verticalAlign: 'middle'}}>Balsų skaičius % nuo dalyvavusių rinkėjų apygardoje</th>
              </tr>
            </thead>
            <tbody> 
              {PartiesList}
            </tbody> 
          </table>

          <div className="make-space"></div>

          <div className="form-group pull-right">
            <input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchDistrictTextChange} />
          </div>
            <h3>Balsavimo rezultatai rinkimų apylinkėse</h3>
          <table className="table table-striped table-bordered">
            <thead>
                <tr className="table-head">
                <th className="text-middle" style={{verticalAlign: 'middle'}}>Apylinkė</th>
                <th className="text-middle" style={{verticalAlign: 'middle'}}>Rezultatų pateikimo laikas</th>
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



module.exports = MultiMandateDistrictsComponent;