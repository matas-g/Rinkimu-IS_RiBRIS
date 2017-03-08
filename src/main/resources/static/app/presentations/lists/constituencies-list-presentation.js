const React = require('react');
const ConfirmDelete = require('../../util/delete-confirm');

var ConstituenciesListComponent = React.createClass({

  render: function() {
    var self = this;
    var style = {backgroundColor: "D52D2D"};
    var buttonText = <i className="fa fa-times" aria-hidden="true"></i>;
    var cancelText = "Atšaukti";
    var confirmText = "Patvirtinti";
    var nr = 1;

    var ConstituenciesList = this.props.constituencies.map(function(constituency, index) {
      var title = <h2>Ištrinsite <b>{constituency.name}</b> apygardą</h2>
      var body = <h4 className="alert alert-danger">Ar tiktai norite ištrinti <b>{constituency.name}</b> apygardą?</h4>;
      return (
        <tr key={index}>
          <td>{nr++}</td>
          <td>{constituency.name}</td>
          <td>
            <button className="btn btn-info btn-sm" onClick={self.props.onDistrictsListClick(constituency)}>
              <i className="fa fa-list" aria-hidden="true"></i>
              &nbsp; Priskirtos apylinkės
            </button>
          </td>
          <td>
            <button className="btn btn-info btn-sm" onClick={self.props.onCandidatesListClick(constituency)}>
              <i className="fa fa-list" aria-hidden="true"></i>
              &nbsp; Priskirti kandidatai
            </button>
          </td>
          <td>
            <button className="btn btn-success btn-sm" onClick={self.props.onEditItem(constituency)}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <ConfirmDelete
              title={title}
              body={body}
              style={style}
              buttonText={buttonText}
              cancelText={cancelText}
              confirmText={confirmText}
              onConfirm={self.props.onRemoveItem(constituency)}
            />
          </td>
        </tr>
      );
    });

    return (
     <div className="container-fluid">
        <div className="panel panel-default">
        <div className="panel-heading"><strong>Apygardų sąrašas</strong></div>
          <table className="table">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Pavadinimas</th>
                <th>Apylinkių sąrašas</th>
                <th>Kandidatų sąrašas</th>
                <th>Redaguoti</th>
              </tr>
            </thead>
            <tbody>
              {ConstituenciesList}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});

ConstituenciesListComponent.propTypes = {
  constituencies: React.PropTypes.array.isRequired,
  onDistrictsListClick: React.PropTypes.func.isRequired,
  onRemoveItem: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired
};

module.exports = ConstituenciesListComponent;
