const React = require('react');

var AddDistrictComponent = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="col-sm-8 col-sm-offset-2">
          <form>
            <h4>Registruoti naują apylinkę</h4>
            <br />
            <div className="form-group">
                <label>Pavadinimas</label>
                <input id="pavadinimas" className="form-control" type="text" value={this.props.name} onChange={this.props.onNameChange} />
                <br />
            </div>
            <div className="form-group">
                <label>Adresas</label>
                <input id="adresas" className="form-control" type="text" value={this.props.address} onChange={this.props.onAddressChange} />
                <br />
            </div>
            <div className="form-group">
              <label>Balsuotojų skaičius</label>
              <input id="skaicius" className="form-control" type="number" value={this.props.numOfVoters} onChange={this.props.onVotersChange} />
              <br />
            </div>
              <div className="form-group">
              <label>Priskirti apylinkę apygardai</label>
              <input id="priskirti" className="form-control" value={this.props.constituency.name} />
            </div>
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Registruoti</button>
            <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
          </form>
        </div>
      </div>
    );
  }
});

AddDistrictComponent.contextTypes = {
    numOfVoters: React.PropTypes.number.isRequired,
    constituency: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired,

    onNameChange: React.PropTypes.func.isRequired,
    onAddressChange: React.PropTypes.func.isRequired,
    onVotersChange: React.PropTypes.func.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onCancelClick: React.PropTypes.func.isRequired
};

module.exports = AddDistrictComponent;
