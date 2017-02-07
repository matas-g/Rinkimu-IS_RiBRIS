var EditPartyComponent = React.createClass({
    render: function() {
        return (
              <form>
                <h4>Redaguoti partiją</h4><br />
                <div className="form-group">
                    <label>Partijos pavadinimas</label>
                    <input className="form-control" type="text" required value={this.props.party.name} onChange={this.props.onFieldChange('name')} /><br />
                </div>
                <div className="form-group">
                    <label>Partijos numeris</label>
                    <input className="form-control" type="number" required value={this.props.party.partyNo} onChange={this.props.onFieldChange('partyNo')} /><br />
                </div>
                <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Redaguoti</button>
                <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
            </form>
        );
    }
});

EditPartyComponent.propTypes = {
    onSaveClick: React.PropTypes.func.isRequired
};

window.EditPartyComponent = EditPartyComponent;