var EditDistrictComponent = React.createClass({
    render: function() {
        return (
              <form>
                <h4>Redaguoti apylinkę</h4><br />
                <div className="form-group">
                    <label>Apygardos pavadinimas</label>
                    <select className="form-control">

                   </select>
                </div>
                <div className="form-group">
                    <label>Pavadinimas</label>
                    <input className="form-control" type="text" value={this.props.district.name} onChange={this.props.onFieldChange('name')} /><br />
                </div>
                <div className="form-group">
                    <label>Adresas</label>
                    <input className="form-control" type="text" value={this.props.district.address} onChange={this.props.onFieldChange('address')} /><br />
                </div>
                <div className="form-group">
                    <label>Balsuotojų skaičius</label>
                    <input className="form-control" type="number" value={this.props.district.numOfVoters} onChange={this.props.onFieldChange('numOfVoters')} /><br />
                </div>
                <div className="form-group">
                    <label>Apylinkės atstovas</label>
                    <input className="form-control" type="number" value={this.props.district.representative} onChange={this.props.onFieldChange('representative')} /><br />
                </div>
                <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Redaguoti</button>
                <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
            </form>
        );
    }
});

EditDistrictComponent.propTypes = {
    district: React.PropTypes.object.isRequired,
    onFieldChange: React.PropTypes.func.isRequired,
    onSaveClick: React.PropTypes.func.isRequired
};

window.EditDistrictComponent = EditDistrictComponent;