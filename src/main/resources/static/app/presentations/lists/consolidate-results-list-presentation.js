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
	
			</div>
		);
	}
});

module.exports = ConsolidateResultsComponent;