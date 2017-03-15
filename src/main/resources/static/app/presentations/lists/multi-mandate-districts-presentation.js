const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

const MultiMandateDistrictsComponent = React.createClass({
  render: function() {

  var nr = 1;
  var self = this;


  var PartiesList = this.props.parties.filter(function(party) {
		 if (party.party.name.toLowerCase().indexOf(self.props.searchParty.toLowerCase()) === -1) {
		        return false;
		      } else {
		        return true;
		      };
	}).map(function(party, index){
 	return (
 		<tr key={index}>
 			<td>{party.party.name}</td>
 			<td>{party.votes}</td>
 			<td>{party.percentOfAllBallots}%</td>
 			<td>{party.numOfMandatesWon}</td>
 		</tr>
 	);
 });


  var DistrictsList = this.props.districts.filter(function(district) {
        if (district.district.name.toLowerCase().indexOf(self.props.searchText.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(district, index) {
      var link = "/multi-mandate-district-results/" + district.district.id;
      return (
        <tr key={index}>
          <td className="candidate-name-decorator"><Link to={link}>{nr++}. {district.district.name}</Link></td>
          <td>{district.resultsDateString}</td>
        </tr>
      );
      
    });
    return (

    		<div className="container-fluid">
			<div className="form-group pull-right">
					<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchCandidatesTextChange} />
			</div>
				<h3>Balsavimo rezultatai daugiamandatėje apygardoje</h3>
				<table className="table table-striped table-bordered">
					<thead>
						<tr className="table-head"> 
							<th>Partija</th>
							<th>Balsai iš viso</th>
							<th>Balsų skaičius % nuo dalyvavusių rinkėjų apygardoje</th>
							<th>Mandatų skaičius</th>
						</tr>
					</thead>
					<tbody> 
						{PartiesList}
					</tbody> 
				</table>

          <div className="make-space"></div>

          <div className="form-group pull-right">
            <input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchTextChange} />
          </div>
          <h3>Balsavimo rezultatai rinkimų apylinkėse</h3>
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



module.exports = MultiMandateDistrictsComponent;