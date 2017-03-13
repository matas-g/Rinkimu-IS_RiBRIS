const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;
const ReactBsTable = require("react-bootstrap-table");
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var SingleMandateDistrictResultsComponent = React.createClass({
	render: function() {

		var self = this;
    	var CandidateList = [];
		var noData = {
			noDataText: 'Šiuo metu duomenų nėra'
		}

		self.props.candidates.map(function(candidate, index) {
		    CandidateList.push(
      		{
  				id: index+1,
          		candidateId: candidate.candidate.id,
  				name: candidate.candidate.name,
  			}
  		);
	});

		return (

			<div>
				<h4>Balsavimo rezultatai rinkimų apylinkėje</h4>
				
			</div>
     
					
		);
	}
});

module.exports = SingleMandateDistrictResultsComponent;

