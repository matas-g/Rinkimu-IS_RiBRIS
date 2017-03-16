const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

var SingleMandateComponent = React.createClass({
	render: function() {

	var nr = 1;
	var num = 1;
	var self = this;

	var WinnersList = this.props.candidates.filter(function(candidate) {
        if (candidate.candidate.name.toLowerCase().indexOf(self.props.searchCandidate.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(candidate, index) {
		var link = "/candidate-biography/" + candidate.candidate.id;
		return (
			<tr key={index}>
            	<td className="candidate-name-decorator"><Link to={link}>{nr++}. {candidate.candidate.name} {candidate.candidate.surname}</Link></td>
				<td className="text-middle" style={{verticalAlign: 'middle'}}>{candidate.candidate.constituencyName}</td>
				<td className="text-middle" style={{verticalAlign: 'middle'}}>{candidate.candidate.partyName}</td>
				<td className="text-middle" style={{verticalAlign: 'middle'}}>{candidate.percentOfAllBallots}%</td>
			</tr>
		);
	});

	var ConstituenciesList = this.props.constituencies.filter(function(constituency) {
      	if (constituency.constituency.name.toLowerCase().indexOf(self.props.searchConstituency.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(constituency, index) {
			var link = "/single-mandate-districts/" + constituency.constituency.id;
			return (
				<tr key={index}>
					<td className="candidate-name-decorator"><Link to={link}>{num++}. {constituency.constituency.name}</Link></td>
					<td className="text-middle" style={{verticalAlign: 'middle'}} >{constituency.totalNumOfDistricts}</td>
					<td className="text-middle" style={{verticalAlign: 'middle'}} >{constituency.districtsWithResults}</td>
				</tr>
			);
			
		});

		return (

			<div className="container-fluid">
			<div className="form-group pull-right">
					<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchCandidatesTextChange} />
			</div>
				<h3>Kandidatai laimėję vienmandatėse apygardose</h3>
				<table className="table table-striped table-bordered">
					<thead>
						<tr className="table-head"> 
							<th className="text-middle" style={{verticalAlign: 'middle'}}>Kandidatas</th>
							<th className="text-middle" style={{verticalAlign: 'middle'}}>Apygarda</th>
							<th className="text-middle" style={{verticalAlign: 'middle'}}>Iškėlė</th>
							<th className="text-middle" style={{verticalAlign: 'middle'}}>Balsų skaičius % nuo dalyvavusių rinkėjų apygardoje</th>
						</tr>
					</thead>
					<tbody> 
						{WinnersList}
					</tbody> 
				</table>

				<div className="make-space"></div>
				
				<div className="form-group pull-right">
					<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchConstituenciesTextChange} />
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
		);
	}
});



module.exports = SingleMandateComponent;