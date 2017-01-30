var AddCandidateListComponent = React.createClass({
    render: function() {
        var self = this;
        var partiesList = this.props.parties.map(function(party, index) {
            return (
                <option key={index} value={party.id}>{party.name}</option>
            );
        });

        return(
            <form>
            <br />
                <div className="form-group">
                <label>Pasirinkite partiją</label><br />
                    <select className="form-control" value={this.props.name} onChange={this.props.onHandlePartyChange}>
                        {partiesList}
                    </select>
                </div>
                <div className="form-group">
                    <label>Pasirinkite norimą  <span className="bg-danger">CSV</span> formato failą</label>
                    <input type="file" />
                </div>
                <button className="btn btn-success btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onSaveClick}>Įkelti</button>
                <button className="btn btn-danger btn-sm" style={{ marginRight: '20px' }} onClick={this.props.onCancelClick}>Atšaukti</button>
            </form>
        );
    }
});

window.AddCandidateListComponent = AddCandidateListComponent;