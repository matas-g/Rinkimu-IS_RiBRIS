const React = require('react');
const TextValidator = require('../util/validation/text-validator-container');
const NumberValidator = require('../util/validation/number-validator-container');

var AddPartyPresentation = React.createClass({

  // Added for CSV import
  onUploadMultiCandidateFile: function() {
    this.props.onUploadMultiCandidateFile( this.refs.file.files[0] );
  },

  render: function() {
	  var greeting;
	  var buttonText;
	  var fileInput;
  if(this.props.party.name  == ''){
	greeting = <h4>Registruoti naują partiją</h4>;
	buttonText = "Registruoti";
  } else {
	greeting = <h4>Redaguoti partiją</h4>;
	buttonText = "Redaguoti";
  }
  
  if(this.props.party.candidates.length != 0){
		 fileInput = (<div><label>Kandidatų sąrašas įkeltas</label>
		   				<button className="btn btn-danger btn-sm" 
			   onClick={this.props.onDeleteClick}>Ištrinti kandidatus</button></div>);
  } else {
		 fileInput= (<div className="form-group"><label>Prisegti partijos kandidatų sąrašą  &nbsp;
				   <span className="bg-danger">CSV</span> formatu:</label>
  					<input type="file" ref='file' onChange={this.onUploadMultiCandidateFile} />
  				 </div>)
	 }
    return (
      <div className="container-fluid">
        <div className="col-sm-offset-1 col-sm-10">
          <form autoComplete="off">
            {greeting}
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
            {fileInput}
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>{buttonText}</button>
            <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AddPartyPresentation;
