const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;
const BarChart = require("../../util/chart/chart");

var MultiMandateComponent = React.createClass({
		render: function() {
			var chartData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [5, 6, 7, 3, 8, 2, 0 ,1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
		var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

		var nr = 1;
		var self = this;
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
			<div>
			  <div className="container-fluid">
					<div className="form-group pull-right">
						<input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchTextChange} />
					</div>
						<h3>Balsavimo rezultatai daugiamandatėje apygardoje</h3>
						<table className="table table-striped table-bordered">
							<thead>
								<tr className="table-head">
									<th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Partija, koalicija</th>
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

	      <BarChart chartData={chartData} options={options}/>

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

			</div>
			);
		}
	});

module.exports = MultiMandateComponent;
