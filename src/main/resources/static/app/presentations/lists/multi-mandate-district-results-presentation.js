const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

var MultiMandateDistrictResultsComponent = React.createClass({
	render: function() {

	var self = this;
    var nr = 1;
    
    
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

		return (

			<div className="container-fluid">
				
				<div className="form-group pull-right">
					<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchPartyChange} />
				</div>
					<h3>Balsavimo rezultatai rinkimų {districtName} apylinkėje</h3>
					<table className="table table-striped table-bordered">
						<thead>
							<tr className="table-head">
								<th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Kandidatas</th>
								<th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Iškėlė</th>
								<th colSpan="3">Paduotų balsų skaičius</th>
							</tr>
							<tr className="table-head">
								<th>iš viso</th>
								<th>% nuo galiojančių biuletenių</th>
								<th>% nuo dalyvavusių rinkėjų</th>
							</tr>
						</thead>
						<tbody> 
							{PartiesList}
						</tbody> 
					</table>
			</div>			
		);
	}
});

module.exports = MultiMandateDistrictResultsComponent;

