const React = require('react');
const TextValidator = require('../util/validation/text-validator-container');
const NumberValidator = require('../util/validation/number-validator-container');

var AddPartyPresentation = React.createClass({

  // Added for CSV import
  onUploadMultiCandidateFile: function() {
    this.props.onUploadMultiCandidateFile( this.refs.file.files[0] );
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="col-sm-offset-1 col-sm-10">
          <form autoComplete="off">
            <h4>Registruoti naują partiją</h4>
            <br />
            <div className="form-group">
              <label>Pavadinimas</label>
              <TextValidator>
                <input id="pavadinimas" className="form-control" type="text" value={this.props.party.name}
                  onChange={this.props.onFieldChange('name')} />
              </TextValidator>
            </div>
            <div className="form-group">
              <label>Partijos numeris</label>
              <NumberValidator>
                <input id="adresas" className="form-control" type="number" value={this.props.party.partyNo}
                  onChange={this.props.onFieldChange('partyNo')} />
              </NumberValidator>
            </div>
            <div className="form-group">
            	<label>Prisegti partijos kandidatų sąrašą <span className="bg-danger">CSV</span> formatu:</label>
            	<input type="file" ref='file' onChange={this.onUploadMultiCandidateFile} />
            </div>
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Registruoti</button>
            <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AddPartyPresentation;
