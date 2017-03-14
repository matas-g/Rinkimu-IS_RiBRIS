const React = require('react');
const Link = require('react-router').Link;

var CandidateBiographyPresentation = React.createClass({
	
	render: function() {
		return (
			 <div className="panel panel-info">
	            <div className="panel-heading">
	              <h3 className="panel-title">{this.props.candidates.name} {this.props.candidates.surname}</h3>
	            </div>
	            <div className="panel-body">
	              <div className="row">
	                <div className="col-md-3 col-lg-3 "> 
	                	<img src="img/candidate.png" className="img-circle img-responsive"/>
	                </div>
	                <div className=" col-md-9 col-lg-9 "> 
	                  <table className="table table-user-information">
	                    <tbody>
	                      
							<tr>
								<td>Vardas:</td>
								<td>{this.props.candidates.name}</td>
							</tr>
							<tr>
								<td>Pavardė:</td>
								<td>{this.props.candidates.surname}</td>
							</tr>
							<tr>
								<td>Gimimo data:</td>
								<td>{this.props.candidates.birthDate}</td>
							</tr>
							<tr>
								<td>Partinė priklausomybė:</td>
								<td>{this.props.candidates.partyName}</td>
							</tr>
							<tr>
								<td>Trumpas aprašymas:</td>
								<td>{this.props.candidates.biography}</td>
							</tr>
	                    </tbody>
	                  </table>
		          </div>
		        </div>
		      </div>
		    </div>
		);
	}
});

module.exports  = CandidateBiographyPresentation;