const React = require('react');
const NavLink = require('../navigation/nav-link');

var SingleMandateComponent = React.createClass({
	render: function() {
		return (

				<div className="container-fluid">
					<div className="panel panel-default">
						<div className="panel-heading"><strong>Vienmadatės rezultatai</strong></div>
						<table className="table">
							<thead>
								<tr>
									<th>Nr</th>
									<th>Apygarda</th>
									<th>Laimėjęs asmuo</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Naujininkų</td>
									<td>Mandolfas Kitleris</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Naujosios Vilnios</td>
									<td>Klozefas Smalinas</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

		);
	}
});

module.exports = SingleMandateComponent;
