const React = require('react');
const NavLink = require('../navigation/nav-link');

var SingleMandateComponent = React.createClass({
	render: function() {

		


		return (

			<div className="container-fluid">
				<div className="panel panel-default">
					<div className="panel-heading"><strong>Balsavimo rezultatai apygardose</strong></div>
					<table className="table table-striped table-bordered">
						<thead>
							<tr className="table-head"> 
								<th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Apygardos</th> 
								<th colSpan="2">Apylinkių skaičius</th> 
								<th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Rinkėjų skaičius</th>
								<th className="text-middle" colSpan="2">Dalyvavo</th>
								<th colSpan="2">Negaliojantys biuleteniai</th> 
								<th colSpan="2">Galiojantys biuleteniai</th> 
							</tr> 
							<tr className="table-head"> 
								<th>iš viso</th> 
								<th>duomenis atsiuntė</th> 
								<th>skaičius</th> 
								<th>%</th>
								<th>skaičius</th> 
								<th>%</th>
								<th>skaičius</th> 
								<th>%</th> 
							</tr>
							</thead>
							<tbody> 
							
						</tbody> 
					</table>
				</div>
			</div>
     
					
		);
	}
});

module.exports = SingleMandateComponent;
