const React = require('react');
const NumberValidator = require('../util/validation/number-validator-container');
const Alert = require('../util/alert/alert');

var PartyResultsInputPresentation = React.createClass({
  render: function() {
  var self = this;
  var PartiesRows = this.props.partiesList.map(function(party, index) {
    return (
      <div className="form-group col-sm-6" key={index}>
        <label>{party.name.replace(/'/g,"")}</label>
          <input className="form-control" type="number" value={self.props.voteArray[index]}
            onChange={self.props.onResultsChange(index)} />
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
    <div className="container-fluid">
      <div className="col-sm-offset-1 col-sm-10">
        <form autoComplete="off">
          <h2 className="alert alert-info text-center">Suveskite partijų gautų balsų skaičių</h2>
          <br />
          <h4 className="alert alert-success text-center">Pasirinkite apylinkę</h4>
          <select className="form-control" value={this.props.districtId} onChange={this.props.onDistrictChange}>
            {DistrictsList}
          </select>
          <br />
          <div>
            {PartiesRows}
          </div>
          <h4 className="alert alert-success text-center">Sugadinti daugiamandačiai biuleteniai</h4>
            <NumberValidator
               handleValidStateChange={self.props.handleValidStateChange}
               >
              <input id="kiekis" className="form-control" type="number" value={this.props.results.spoiledMulti}
                onChange={this.props.onMultiChange} />
            </NumberValidator>
            <br />
            <Alert text={this.props.text} style={"alert alert-danger alert-dismissable text-center"} />
          <div>
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px'}} onClick={this.props.onSaveClick}>Registruoti</button>
            <button className="btn btn-danger btn-sm" onClick={this.props.onCancelClick}>Atšaukti</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
});

module.exports = PartyResultsInputPresentation;
