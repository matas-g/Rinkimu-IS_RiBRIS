const React = require('react');
const NumberValidator = require('../util/validation/number-validator-container');

const AddSpoiledResults = React.createClass({

  render: function() {
    var DistrictsList = this.props.districts.map(function(district, index) {
      return (
        <option key={index} value={district.id}>{district.name}</option>
      );
    });

    return (
      <div className="container-fluid">
        <div className="col-sm-offset-1 col-sm-10">
          <form className="col-sm-offset-1 col-sm-10 container-fluid" autoComplete="off">
            <h2>Suveskite sugadintų biuletenių skaičių</h2>
            <br />
            <h4>Pasirinkite apylinkę</h4>
            <br />
            <select className="form-control" value={this.props.district.id} onChange={this.props.onDistrictChange}>
              {DistrictsList}
            </select>
            <br />
            <div className="form-group">
              <label>Sugadinti vienmandačiai balsai</label>
              <NumberValidator>
                <input id="kiekis" className="form-control" type="text" value={this.props.voteCountSingle}
                  onChange={this.props.onSingleChange} />
              </NumberValidator>
            </div>
            <div className="form-group">
              <label>Sugadinti daugiamandačiai balsai</label>
              <NumberValidator>
                <input id="kiekis" className="form-control" type="text" value={this.props.voteCountMulti}
                  onChange={this.props.onMultiChange} />
              </NumberValidator>
            </div>
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

module.exports = AddSpoiledResults;
