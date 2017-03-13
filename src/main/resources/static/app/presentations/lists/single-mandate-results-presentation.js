const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

var SingleMandateComponent = React.createClass({
	render: function() {

	var nr = 1;
	var self = this;
	var ConstituenciesList = this.props.constituencies.filter(function(constituency) {
      	if (constituency.constituency.name.toLowerCase().indexOf(self.props.searchText.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(constituency, index) {
			var link = "/single-mandate-districts/" + constituency.constituency.id;
			return (
				<tr key={index}>
					<td><Link to={link}>{nr++}. {constituency.constituency.name}</Link></td>
					<td>{constituency.totalNumOfDistricts}</td>
					<td>{constituency.districtsWithResults}</td>
				</tr>
			);
			
		});

		return (

			<div className="container-fluid">
				
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
		);
	}
});



module.exports = SingleMandateComponent;