var React = require('react');

var AddConstituencies = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="col-sm-offset-1 col-sm-10">
          <form>
            <h4>Registruoti naują apygardą</h4><br />
            <div className="form-group">
              <label>Pavadinimas</label>
              <input className="form-control" type="text" value={this.props.constituency.name}
                onChange={this.props.onFieldChange('name')} /><br />
            </div>
            <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }}
               onClick={this.props.onSaveClick}>Registruoti</button>
            <button className="btn btn-danger btn-sm"
               onClick={this.props.onCancelClick}>Atšaukti</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AddConstituencies;
