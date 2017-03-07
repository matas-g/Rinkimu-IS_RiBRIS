const React = require('react');
const TextValidator = require('../util/validation/text-validator-container');

const AddConstituencies = React.createClass({
  // Added for CSV import
  onUploadMultiCandidateFile: function() {
    this.props.onUploadMultiCandidateFile( this.refs.file.files[0] );
  },
  
  render: function() {
	 var greeting;
	 var fileInput;
	 if(this.props.constituency.id  == ""){
		 greeting = <h4>Registruoti naują apygardą</h4>;
	 } else {
		 greeting = <h4>Atnaujinti apygardą</h4>;
	 }
	 
	 if(this.props.candidates.length != 0){
		 fileInput = (<div><h4>Kandidatai įkelti</h4>
		 <button className="btn btn-danger btn-sm"
             onClick={this.props.onDeleteClick}>Ištrinti kandidatus
           </button></div>);
	 } else {
		 fileInput=(<div className="form-group">
     	<label>Prisegti apygardos kandidatų sąrašą <span className="bg-danger">CSV</span> formatu:</label>
     	<input type="file" ref='file' onChange={this.onUploadMultiCandidateFile} />
     </div>)
	 }
	console.log(this.props.candidates);
    return (
      <div className="container-fluid">
        <div className="col-sm-offset-1 col-sm-10">
          <form autoComplete="off">
            {greeting}<br />
            <div className="form-group">
              <label>Pavadinimas</label>
              <TextValidator>
                <input id="pavadinimas" className="form-control" type="text" value={this.props.constituency.name}
                  onChange={this.props.onFieldChange('name')} />
              </TextValidator>
            </div>
            {fileInput}
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
