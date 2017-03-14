const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

var SingleMandateDistrictResultsComponent = React.createClass({
	render: function() {

	var self = this;
    var nr = 1;
	var CanditateList = this.props.candidates.map(function(candidate, index) {
			var link = "/candidate-biography/" + candidate.candidate.id;
			return (
				<tr key={index}>
					<td><Link to={link}>{nr++}. {candidate.candidate.name}. {candidate.candidate.surname}</Link></td>
					<td>{candidate.candidate.partyName}</td>
					<td>{candidate.votes}</td>
					<td>{candidate.percentOfValidBallots}</td>
					<td>{candidate.percentOfAllBallots}</td>
				</tr>
			);
			
		});

		return (

			<div className="container-fluid">
				
				<div className="form-group pull-right">
					<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchTextChange} />
				</div>
					<h3>Balsavimo rezultatai rinkimų apylinkėje</h3>
					<table className="table table-striped table-bordered">
						<thead>
							<tr className="table-head">
								<th lassName="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Kandidatas</th>
								<th lassName="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Iškėlė</th>
								<th colSpan="3">Paduotų balsų skaičius</th>
							</tr>
							<tr className="table-head">
								<th>iš viso</th>
								<th>% nuo galiojančių biuletenių</th>
								<th>% nuo dalyvavusių rinkėjų</th>
							</tr>
						</thead>
						<tbody> 
							{CanditateList}
						</tbody> 
					</table>
			</div>			
		);
	}
});

module.exports = SingleMandateDistrictResultsComponent;

