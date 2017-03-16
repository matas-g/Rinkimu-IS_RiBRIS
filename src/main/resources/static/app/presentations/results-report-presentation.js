const React = require('react');
const NumberValidator = require('../util/validation/number-validator-container');
const ReactBsTable = require('react-bootstrap-table');
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var ResultsReportPresentation = React.createClass({
  render: function() {
    var self = this;

    var SingleResults = this.props.candidatesList.map(function(candidate, index) {
      return (
        <div key={index}>
          <div className="col-sm-4" >
            <h4 className="alert alert-info">{candidate.name.replace(/'/g,"") + " " + candidate.surname.replace(/'/g,"")}</h4>
          </div>
          <div className="col-sm-2">
            <h4 className="alert alert-success">{self.props.results.singleMandateVotes[ index ]}</h4>
          </div>
        </div>
      );
    }).reduce(function(r, element, index) {
      index % 2 === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, []).map(function(rowContent, index) {
      return (
        <div key={index} className="row-fluid">
          {rowContent}
        </div>
      );
    });

    var MultiResults = this.props.partiesList.map(function(party, index) {
      return (
        <div key={index}>
          <div className="col-sm-4" >
            <h4 className="alert alert-info">{party.name.replace(/'/g,"")}</h4>
          </div>
          <div className="col-sm-2">
            <h4 className="alert alert-success">{self.props.results.partyVotes[ index ]}</h4>
          </div>
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
    if (this.props.path == '/representative/results/parties/report') {
      return (
        <div className="container-fluid">
          <div className="row">
            <h2 className="alert alert-danger text-center">Pasitikrinkite ar rezultatai suvesti teisingai</h2>
          </div>
          <div className="row">
            <h3 className="alert alert-danger text-center">Suvesti balsai (Partijoms):</h3>
            <br />
            <div>
              {MultiResults}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-9">
              <h4 className="col-sm-9 alert alert-danger text-center">Sugadinti daugiamandačiai biuleteniai:</h4>
            </div>
            <div className="col-sm-3 text-center" >
              <h4 className="alert alert-success">{this.props.results.spoiledMulti}</h4>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onMultiSaveClick}>Registruoti</button>
            <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
          </div>
          <br />
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <h2 className="alert alert-danger text-center">Pasitikrinkite ar rezultatai suvesti teisingai</h2>
          </div>
          <div className="row">
            <h3 className="alert alert-danger text-center">Suvesti balsai (Kandidatams):</h3>
            <br />
            <div>
              {SingleResults}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-9">
              <h4 className="alert alert-danger text-center">Sugadinti vienmandačiai biuleteniai:</h4>
            </div>
            <div className="col-sm-3 text-center">
              <h4 className="alert alert-success">{this.props.results.spoiledSingle}</h4>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSingleSaveClick}>Registruoti</button>
            <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
          </div>
          <br />
        </div>
      );
    }
  }
});

module.exports = ResultsReportPresentation;
