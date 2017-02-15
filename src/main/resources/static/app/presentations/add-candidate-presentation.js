const React = require('react');

var AddCandidatePresentation = React.createClass({
  render: function() {
  var self = this;
  var PartiesList = this.props.parties.map(function(party, index) {
      return (
          <option key={index} value={party.id}>{party.name}</option>
      );
  });

  return (
    <form>
      <h4>Registruoti naują kandidatą</h4>
      <br />
      <div className="form-group">
        <label>Vardas</label>
        <input className="form-control" type="text" required value={this.props.name} onChange={this.props.onNameChange} />
        <br />
      </div>
      <div className="form-group">
        <label>Pavardė</label>
        <input className="form-control" type="text" required value={this.props.surname} onChange={this.props.onSurnameChange} />
        <br />
      </div>
      <div className="form-group">
        <label>Gimimo data</label>
        <input className="form-control" type="text" placeholder="yyyy-mm-DD" value={this.props.birthDate} onChange={this.props.onDateChange} />
      </div>
      <div className="form-group">
        <label>Partija</label>
        <select className="form-control" value={this.props.party.id}
          onChange={this.props.onPartyChange}>
            {PartiesList}
        </select>
      </div>
      <div className="form-group">
        <label>Biografija</label>
        <input className="form-control" type="text" value={this.props.biography} onChange={this.props.onBiographyChange} />
      </div>
      <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Registruoti</button>
      <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
    </form>
    );
  }
});

module.exports = AddCandidatePresentation;
