var AddDistrictComponent = React.createClass({
    render: function() {
    var self = this;
    var constituenciesList = this.props.constituencies.map(function(constituency, index){
        return (
            <option key={index} value={constituency.id}>{constituency.name}</option>
        );
    });

     return (
            <form>
                <h4>Registruoti naują apylinkę</h4><br />
                <div className="form-group">
                    <label>Pasirinkite apygardą</label>
                    <select className="form-control" value={this.props.constituency.name} onChange={this.props.HandleConstituencyChange}>
                        {constituenciesList}
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
                <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Registruoti</button>
                <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
            </form>
        );
    }
});

AddDistrictComponent.propTypes = {
    district: React.PropTypes.object.isRequired,
    onFieldChange: React.PropTypes.func.isRequired,
    onSaveClick: React.PropTypes.func.isRequired
};

window.AddDistrictComponent = AddDistrictComponent;