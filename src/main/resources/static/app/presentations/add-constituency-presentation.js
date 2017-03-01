const React = require('react');
const TextValidator = require('../util/validation/text-validator-container');

const AddConstituencies = React.createClass({
  // Added for CSV import
  onUploadMultiCandidateFile: function() {
    this.props.onUploadMultiCandidateFile( this.refs.file.files[0] );
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="col-sm-offset-1 col-sm-10">
          <form autoComplete="off">
            <h4>Registruoti naują apygardą</h4><br />
            <div className="form-group">
              <label>Pavadinimas</label>
              <TextValidator>
                <input id="pavadinimas" className="form-control" type="text" value={this.props.constituency.name}
                  onChange={this.props.onFieldChange('name')} />
              </TextValidator>
            </div>
            <div className="form-group">
            	<label>Prisegti apygardos kandidatų sąrašą <span className="bg-danger">CSV</span> formatu:</label>
            	<input type="file" ref='file' onChange={this.onUploadMultiCandidateFile} />
            </div>
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }}
              onClick={this.props.onSaveClick}>Registruoti
            </button>
            <button className="btn btn-danger btn-sm"
              onClick={this.props.onCancelClick}>Atšaukti
            </button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AddConstituencies;
