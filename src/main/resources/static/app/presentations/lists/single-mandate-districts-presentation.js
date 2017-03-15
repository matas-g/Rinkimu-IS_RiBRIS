const React = require('react');
const NavLink = require('../navigation/nav-link');
const Link = require('react-router').Link;

const SingleMandateDistrictsComponent = React.createClass({
  render: function() {

  var nr = 1;
  var num = 1;
  var self = this;
  var CandidatesList = this.props.candidates.filter(function(candidate) {
        if ((candidate.candidate.name.toLowerCase().indexOf(self.props.searchCandidate.toLowerCase()) === -1) && 
          (candidate.candidate.surname.toLowerCase().indexOf(self.props.searchCandidate.toLowerCase()) === -1) && 
          (candidate.candidate.partyName.toLowerCase().indexOf(self.props.searchCandidate.toLowerCase()) === -1)) {
        return false;
      } else {
        return true;
      }
    }).map(function(candidate, index) {
    var link = "/candidate-biography/" + candidate.candidate.id;
      return (
          <tr key={index}>
            <td className="candidate-name-decorator"><Link to={link}>{nr++}. {candidate.candidate.name} {candidate.candidate.surname}</Link></td>
            <td>{candidate.candidate.partyName}</td>
            <td style={{textAlign: 'center'}}>{candidate.votes}</td>
            <td style={{textAlign: 'center'}}>{candidate.percentOfValidBallots}%</td>
            <td style={{textAlign: 'center'}}>{candidate.percentOfAllBallots}%</td>
          </tr>
      )
     
  });


  var DistrictsList = this.props.districts.filter(function(district) {
        if (district.district.name.toLowerCase().indexOf(self.props.searchDistrict.toLowerCase()) === -1) {
        return false;
      } else {
        return true;
      }
    }).map(function(district, index) {
      var link = "/single-mandate-district-results/" + district.district.id;
      return (
        <tr key={index}>
          <td className="candidate-name-decorator"><Link to={link}>{num++}. {district.district.name}</Link></td>
          <td style={{textAlign: 'center'}}>{district.resultsDateString}</td>
        </tr>
      );
      
    });
    return (

      <div className="container-fluid">
           <div className="form-group pull-right">
              <input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchCandidatesTextChange} />
            </div>
            <h3>Balsavimo rezultatai {this.props.constituencyName} apygardoje</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-head">
                <th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Kandidatas</th>
                <th className="text-middle" style={{verticalAlign: 'middle'}} rowSpan="2">Iškėlė</th>
                <th colSpan="3">Paduotų balsų skaičius</th>
              </tr>
              <tr className="table-head">
                  <th>iš viso</th>
                  <th>% nuo galiojančių biuletenių</th>
                  <th>% nuo dalyvavusių rinkėjų</th>
              </tr>
              </thead>
              <tbody> 
                {CandidatesList}
              </tbody> 
          </table>

          <div className="make-space"></div>

          <div className="form-group pull-right">
            <input type="text" className="search form-control" placeholder="Ieškoti" onChange={this.props.onSearchDistrictsTextChange} />
          </div>
          <h3>Balsavimo rezultatai rinkimų apylinkėse</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-head">
                <th>Apylinkė</th>
                <th>Rezultatų pateikimo laikas</th>
              </tr>
              </thead>
              <tbody> 
                {DistrictsList}
              </tbody> 
          </table>
      </div>      
    );
  }
});



module.exports = SingleMandateDistrictsComponent;