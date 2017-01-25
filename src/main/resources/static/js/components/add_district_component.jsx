var AddDistrictComponent = React.createClass({
    render: function() {

        return (
            <form>
                <h4>Registruoti naują apylinkę</h4><br />
                 <div className="form-group">
                    <label>Pasirinkite apygrdą</label>
                    <select className="form-control" value={this.props.constituency}>
                            <option>Vilnius(pavyzdys)</option>
                            <option>Kaunas(pavyzdys)</option>
                     </select>

                </div>
                 <div className="form-group">
                    <label>Pasirinkite atstovą</label>
                    <select className="form-control">
                        <option>Jonas Jonaitis(pavyzdys)</option>
                        <option>Petras Petraitis(pavyzdys)</option>
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
}

window.AddDistrictComponent = AddDistrictComponent;