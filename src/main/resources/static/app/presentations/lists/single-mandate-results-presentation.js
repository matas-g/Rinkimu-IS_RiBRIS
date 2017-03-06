const React = require('react');
const NavLink = require('../navigation/nav-link');

var SingleMandateComponent = React.createClass({
	render: function() {
		var nr = 1;
		var ConstituenciesList = this.props.constituencies.map(function(constituency, index) {
			return (
				<tr key={index}>
          			<td>{nr++}. {constituency.name}</td>
				</tr>
			);
		});

		return (

				<div className="container-fluid col-md-10">
					<div className="panel panel-default">
						<div className="panel-heading"><strong>Balsavimo rezultatai vienmandatėse apygardose</strong></div>
						<table className="table">
							<thead>
								<tr>
									<th>Apygarda</th>
									<th>
										Apylinkių skaičius
											<th>iš viso</th>  &nbsp;&nbsp;&nbsp;&nbsp;
											<th>duomenis atsiuntė</th>
									</th>
									<th>Rinkėjų saičius</th>
									<th>
										Dalyvavo<br />
										skaičius / %
									</th>
									<th>
										Negaliojantys biuleteniai<br />
										skaičius / %
									</th>
									<th>
										Galiojantys biuleteniai<br />
										skaičius / %
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1. Naujamiesčio</td>
									<tr></tr>
									<td>41696</td>
									<td>28684 / 68,79</td>
									<td>600 / 2,09</td>
									<td>28084 / 97,91</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
		
		);
	}
});

module.exports = SingleMandateComponent;
