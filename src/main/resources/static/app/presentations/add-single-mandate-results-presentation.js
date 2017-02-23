const React = require('react');

var SingleMandateResultsInputPresentation = React.createClass({
  render: function() {
  var self = this;
  var InputsList = this.props.candidatesList.map(function(candidate, index) {
    return (
      <div className="form-group col-sm-6" key={index}>
        <label>{candidate.name.replace(/'/g,"") + " " + candidate.surname.replace(/'/g,"")}</label>
        <input className="form-control" type="number" value={self.props.voteCount[index]}
          onChange={self.props.onResultsChange(index)} />
        <br />
      </div>
    );
  });
  var DistrictsList = this.props.districts.map(function(district, index) {
      return (
          <option key={index} value={district.id}>{district.name}</option>
      );
  });

  return (
    <form>
      <h4>Pasirinkite apylinkę</h4>
      <br />
      <select className="form-control" value={this.props.district.id} onChange={this.props.onDistrictChange}>
          {DistrictsList}
      </select>
      <br />
      <div className="row">
        {InputsList}
      </div>
      <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Registruoti</button>
      <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
    </form>
    );
  }
});

module.exports = SingleMandateResultsInputPresentation;
