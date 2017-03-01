const React = require('react');
const TextValidator = require('../util/validation/text-validator-container');
const NumberValidator = require('../util/validation/number-validator-container');

var AddDistrictPresentation = React.createClass({
  render: function() {
    var self = this;
    var ConstituenciesList = this.props.constituencies.map(function(constituency, index) {
        return (
            <option key={index} value={constituency.id}>{constituency.name}</option>
        );
    });
    return (
      <div className="container-fluid">
        <div className="col-sm-offset-1 col-sm-10">
          <form autoComplete="off">
            <h4>Registruoti naują apylinkę</h4>
            <br />
            <div className="form-group">
              <label>Pavadinimas</label>
              <TextValidator>
                <input id="pavadinimas" className="form-control" type="text" value={this.props.name}
                  onChange={this.props.onNameChange} />
              </TextValidator>
            </div>
            <div className="form-group">
              <label>Adresas</label>
              <input id="adresas" className="form-control" type="text" value={this.props.address}
                onChange={this.props.onAddressChange} />
            </div>
            <div className="form-group">
              <label>Balsuotojų skaičius</label>
              <NumberValidator>
                <input id="skaicius" className="form-control" type="number" value={this.props.numOfVoters}
                  onChange={this.props.onVotersChange} />
              </NumberValidator>
            </div>
            <div className="form-group">
              <label>Priskirti apylinkę apygardai</label>
              <select className="form-control" value={this.props.constituency.id}
                onChange={this.props.onConstituencyChange}>
                  {ConstituenciesList}
              </select>
            </div>
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Registruoti</button>
            <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AddDistrictPresentation;
