const React = require('react');

var PartiesListComponent = React.createClass({
  render: function() {
    var self = this;
    var nr = 1;
    var PartiesList = this.props.parties.map(function(party, index) {
      return (
        <tr key={index}>
          <td>{nr++}</td>
          <td>{party.name}</td>
          <td>{party.partyNo}</td>
          <td>
            <button className="btn btn-info btn-sm" onClick={self.props.onCandidatesListClick(party)}>
              <i className="fa fa-list" aria-hidden="true"></i>
              &nbsp; Priskirti kandidatai
            </button>
          </td>
          <td>
            <button className="btn btn-success btn-sm" onClick={self.props.onEditItem(party)}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button className="btn btn-danger btn-sm" onClick={self.props.onRemoveItem(party)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="container-fluid">
        <div className="panel panel-default">
        <div className="panel-heading"><strong>Partijų sąrašas</strong></div>
          <table className="table">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Pavadinimas</th>
                <th>Partijos numeris</th>
                <th>Kandidatų sąrašas</th>
                <th>Redaguoti</th>
              </tr>
            </thead>
            <tbody>
              {PartiesList}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});

PartiesListComponent.propTypes = {
  parties: React.PropTypes.array.isRequired,
  onCandidatesListClick: React.PropTypes.func.isRequired,
  onRemoveItem: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired
};

module.exports = PartiesListComponent;
