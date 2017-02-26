const React = require('react');
const TextValidator = require('../util/validation/text-validator-container');

var AddRepresentativePresentation = React.createClass({
  render: function() {
    var DistrictsList = this.props.districts.map(function(district, index) {
        return (
            <option key={index} value={district.id}>{district.name}</option>
        );
    });
    if (this.props.route != undefined) {
      return (
        <form autoComplete="off">
          <h4>Registruoti naują atstovą</h4>
          <br />
          <div className="form-group">
            <label>Vardas</label>
            <TextValidator>
              <input className="form-control" type="text" value={this.props.name} onChange={this.props.onNameChange} />
            </TextValidator>
          </div>
          <div className="form-group">
            <label>Pavardė</label>
            <TextValidator>
              <input className="form-control" type="text" value={this.props.surname} onChange={this.props.onSurnameChange} />
            </TextValidator>
          </div>
          <div className="form-group">
            <label>Priskirti atstovui apylinkę</label>
            <input className="form-control" type="text" value={this.props.district.name} />
          </div>
          <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Registruoti</button>
          <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
        </form>
      );
    } else {
      return (
        <form>
          <h4>Registruoti naują atstovą</h4>
          <br />
          <div className="form-group">
            <label>Vardas</label>
            <TextValidator>
              <input className="form-control" type="text" required value={this.props.name} onChange={this.props.onNameChange} />
            </TextValidator>
          </div>
          <div className="form-group">
            <label>Pavardė</label>
            <TextValidator>
              <input className="form-control" type="text" required value={this.props.surname} onChange={this.props.onSurnameChange} />
            </TextValidator>
          </div>
          <div className="form-group">
            <select className="form-control" value={this.props.district.id}
              onChange={this.props.onDistrictChange}>
                {DistrictsList}
            </select>
          </div>
          <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Registruoti</button>
          <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
        </form>
      );
    }
  }
});

module.exports = AddRepresentativePresentation;
