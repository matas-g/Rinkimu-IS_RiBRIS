const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;
const BarChart = require("../../util/chart/chart");

var MultiMandateComponent = React.createClass({
		render: function() {

		var nr = 1;
		var num = 1;
		var self = this;
		var partyNames = [];
		var mandatesArray = [];

		var WinnersPartiesList = this.props.parties.filter(function(party) {
			 if (party.party.name.toLowerCase().indexOf(self.props.searchParty.toLowerCase()) === -1) {
			        return false;
			      } else {
			        return true;
			      };
		}).map(function(party, index){
			partyNames.push(party.party.name);
			mandatesArray.push(party.numOfMandatesWon);
	    	return (
	    		<tr key={index}>
	    			<td>{party.party.name}</td>
	    			<td>{party.votes}</td>
	    			<td>{party.percentOfAllBallots}%</td>
	    			<td>{party.numOfMandatesWon}</td>
	    		</tr>
	    	);
	    });

		var ConstituenciesList = this.props.constituencies.filter(function(constituency) {
	      	if (constituency.constituency.name.toLowerCase().indexOf(self.props.searchText.toLowerCase()) === -1) {
	        return false;
	      } else {
	        return true;
	      }
	    }).map(function(constituency, index) {
				var link = "/multi-mandate-districts/" + constituency.constituency.id;
				return (
					<tr key={index}>
						<td className="candidate-name-decorator"><Link to={link}>{nr++}. {constituency.constituency.name}</Link></td>
						<td>{constituency.totalNumOfDistricts}</td>
						<td>{constituency.districtsWithResults}</td>
					</tr>
				);
			});

			return (
				<div className="container-fluid">
					<div className="row">
						<div className="pull-right">
								<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchPartiesTextChange} />
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
								{WinnersPartiesList}
							</tbody>
						</table>
					</div>
					<br/>

					<div className="row">
					  <BarChart labels={partyNames} data={mandatesArray} />
					</div>
					<br/>
				 <div className="row">
						<div className="form-group pull-right">
							<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchTextChange} />
						</div>
							<h3>Balsavimo rezultatai apygardose</h3>
							<table className="table table-striped table-bordered">
								<thead>
									<tr className="table-head">
										<th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Apygardos</th>
										<th colSpan="2">Apylinkių skaičius</th>
									</tr>
									<tr className="table-head">
										<th>iš viso</th>
										<th>duomenis atsiuntė</th>
									</tr>
									</thead>
									<tbody>
										{ConstituenciesList}
									</tbody>
							</table>
					</div>
				</div>
			);
		}
	});

module.exports = MultiMandateComponent;