const React = require('react');

var RepresentativeListComponent = React.createClass({
  render: function() {
    var self = this;
    var nr = 1;
    var RepresentativesList = this.props.representatives.map(function(representative, index) {
      return (
        <tr key={index}>
          <td>{nr++}</td>
          <td>{representative.name}</td>
          <td>{representative.surname}</td>
          <td>
            <button className="btn btn-success btn-sm" onClick={self.props.onEditItem(representative)}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
             <button className="btn btn-danger btn-sm" onClick={self.props.onRemoveItem(representative)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="container-fluid">
        <div className="panel panel-default">
        <div className="panel-heading"><strong>Atstovų sąrašas</strong></div>
          <table className="table">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Vardas</th>
                <th>Pavardė</th>
              </tr>
            </thead>
            <tbody>
              {RepresentativesList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

/*RepresentativeListComponent.propTypes = {
  onRemoveItem: React.PropTypes.func.isRequired,
  districts: React.PropTypes.array.isRequired,
  onEditItem: React.PropTypes.func.isRequired
}*/

module.exports = RepresentativeListComponent;
