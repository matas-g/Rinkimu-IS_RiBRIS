const React = require('react');
const NumberValidator = require('../util/validation/number-validator-container');

var PartyResultsInputPresentation = React.createClass({
  render: function() {
  var self = this;
  var CandidateRows = this.props.partiesList.map(function(party, index) {
    return (
      <div className="form-group col-sm-6" key={index}>
        <label>{party.name.replace(/'/g,"")}</label>
        <NumberValidator>
          <input className="form-control" type="number" value={self.props.voteCount[index]}
            onChange={self.props.onResultsChange(index)} />
        </NumberValidator>
      </div>
    );
  }).reduce(function(r, element, index) {
    index % 2 === 0 && r.push([]);
    r[r.length - 1].push(element);
    return r;
  }, []).map(function(rowContent, index) {
    return (
      <div key={index} className="row">
        {rowContent}
      </div>
    );
  });

  var DistrictsList = this.props.districts.map(function(district, index) {
    return (
      <option key={index} value={district.id}>{district.name}</option>
    );
  });
  return (
    <form className="col-sm-offset-1 col-sm-10 container-fluid" autoComplete="off">
      <h2>Suveskite partijų gautų balsų skaičių</h2>
      <br />
      <h4>Pasirinkite apylinkę</h4>
      <br />
      <select className="form-control" value={this.props.district.id} onChange={this.props.onDistrictChange}>
        {DistrictsList}
      </select>
      <br />
      <div>
        {CandidateRows}
      </div>
      <div>
        <button className="btn btn-success btn-sm" style={{ marginRight: '20px'}} onClick={this.props.onSaveClick}>Registruoti</button>
        <button className="btn btn-danger btn-sm" onClick={this.props.onCancelClick}>Atšaukti</button>
      </div>
    </form>
    );
  }
});

module.exports = PartyResultsInputPresentation;
