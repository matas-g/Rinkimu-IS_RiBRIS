const React = require('react');
const NavLink = require('../navigation/nav-link');

var SingleMandateComponent = React.createClass({
	render: function() {
		return (

						<table>
							<thead>
								<tr>
									<th rowspan="2">State</th>
									<th rowspan="2">Utilities Company</th>
									<th colspan="3">Summer Period</th>
								</tr>
								<tr>
									<th>data1</th>
									<th>data2</th>
									<th>data3</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>State name</td>
									<td>Utility co</td>
									<td>Data for 1</td>
									<td>Data for 2</td>
									<td>Data for 3</td>
								</tr>
								<tr>
									<td>State name</td>
									<td>Utility co</td>
									<td>Data for 1</td>
									<td>Data for 2</td>
									<td>Data for 3</td>
								</tr>
								<tr>
									<td>State name</td>
									<td>Utility co</td>
									<td>Data for 1</td>
									<td>Data for 2</td>
									<td>Data for 3</td>
								</tr>
								<tr>
									<td>State name</td>
									<td>Utility co</td>
									<td>Data for 1</td>
									<td>Data for 2</td>
									<td>Data for 3</td>
								</tr>
								<tr>
									<td>State name</td>
									<td>Utility co</td>
									<td>Data for 1</td>
									<td>Data for 2</td>
									<td>Data for 3</td>
								</tr>
							</tbody>
						</table>
					
		);
	}
});

module.exports = SingleMandateComponent;
