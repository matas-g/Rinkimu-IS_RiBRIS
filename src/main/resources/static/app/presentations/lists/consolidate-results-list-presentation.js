const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;
const BarChart = require("../../util/chart/chart");


var ConsolidateResultsComponent = React.createClass({
	render: function() {
		
		var self = this;
		var partyNames = [];
		var mandatesArray = [];

		var winersPartiesList = this.props.parties.filter(function(party) {
        if (party.partyName.toLowerCase().indexOf(self.props.searchText.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(party, index) {
			partyNames.push(party.partyName);
			mandatesArray.push(party.mandatesWon);
			return (
				<tr key={index}>
					<td>{party.partyName}</td>
					<td style={{textAlign: 'center'}}>{party.mandatesWon}</td>
				</tr>
			);
		});

		var winersCandidateList = this.props.candidates.filter(function(candidate) {
        if ((candidate.name.toLowerCase().indexOf(self.props.candidateSearch.toLowerCase()) === -1) && 
          (candidate.surname.toLowerCase().indexOf(self.props.candidateSearch.toLowerCase()) === -1) && 
          (candidate.partyName.toLowerCase().indexOf(self.props.candidateSearch.toLowerCase()) === -1)) {
        return false;
      } else {
        return true;
      }
    }).map(function(candidate, index) {
			return (
				<tr key={index}>
					<td>{candidate.name} {candidate.surname}</td>
					<td style={{textAlign: 'center'}}>{candidate.partyName}</td>
				</tr>
			);
		});	


		return (

			<div className="container-fluid">
				<div className="form-group pull-right">
					<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchTextChange} />
				</div>
					<h3>Konsoliduoti rezultatai</h3>
				<table className="table table-striped table-bordered">
					<thead>
						<tr className="table-head">
							<th>Partija</th>
							<th>Laimėtų mandatų skaičius</th>
						</tr>
					</thead>
					<tbody>
						{winersPartiesList}
					</tbody>
				</table>
		
				<div className="row">
					  <BarChart labels={partyNames} data={mandatesArray} />
				</div>

				<div className="form-group pull-right">
					<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onCandidateSearchTextChange} />
				</div>
					<h3>Išrinkti Lietuvos Respublikos Seimo nariai</h3>
				<table className="table table-striped table-bordered">
					<thead>
						<tr className="table-head">
							<th>Kandidatas</th>
							<th>Partijos pavadinimas</th>
						</tr>
					</thead>
					<tbody>
						{winersCandidateList}
					</tbody>
				</table>
	
			</div>
		);
	}
});

module.exports = ConsolidateResultsComponent;