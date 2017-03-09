const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

var SingleMandateDistrictsComponent = React.createClass({
	render: function() {

		var nr = 1;
		var DistrictsList = this.props.districts.map(function(district, index) {
			return (
				<tr key={index}>
					<td><Link to="/single-mandate-district-results">{nr++}. {district.name}</Link></td>
				</tr>
			);
			
		});


		return (

			<div className="container-fluid">
				<div className="panel panel-default">
					<div className="panel-heading"><strong>Balsavimo rezultatai rinkimų apylinkėse</strong></div>
					<table className="table table-striped table-bordered">
						<thead>
							<tr className="table-head"> 
								<th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Apylinkė</th> 
								<th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Rinkėjų skaičius</th>
								<th className="text-middle" colSpan="2">Dalyvavo</th>
								<th colSpan="2">Negaliojantys biuleteniai</th> 
								<th colSpan="2">Galiojantys biuleteniai</th> 
							</tr> 
							<tr className="table-head"> 
								<th>skaičius</th> 
								<th>%</th>
								<th>skaičius</th> 
								<th>%</th>
								<th>skaičius</th> 
								<th>%</th> 
							</tr>
							</thead>
							<tbody> 
								{DistrictsList}
							</tbody> 
					</table>
				</div>
			</div>
     
					
		);
	}
});

module.exports = SingleMandateDistrictsComponent;
