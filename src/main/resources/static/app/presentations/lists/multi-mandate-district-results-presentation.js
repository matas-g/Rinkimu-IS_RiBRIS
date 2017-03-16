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
					</tr>
				);
			});

		return (
			<div className="container-fluid">
				<div className="form-group pull-right">
						<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchPartyTextChange} />
				</div>
					<h3>Balsavimo rezultatai daugiamandatėje {this.props.districtName} apylinkėje</h3>
					<table className="table table-striped table-bordered">
						<thead>
							<tr className="table-head">
								<th>Partija</th>
								<th>Balsai iš viso</th>
								<th>Balsų skaičius % nuo dalyvavusių rinkėjų apygardoje</th>
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
