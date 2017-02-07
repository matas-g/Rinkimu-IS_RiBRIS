var PartiesListComponent = React.createClass({
    render: function() {
        var self = this;
        var nr = 1;
        var partiesList = this.props.parties.map(function(party, index) {
            return (
                <tr key={index}>
                    <td>{nr++}</td>
                    <td>{party.name}</td>
                    <td>{party.partyNo}</td>
                       <td>
                        <button className="btn btn-info btn-sm">
                            <i className="fa fa-list" aria-hidden="true"></i>
                            &nbsp; Kandidatų sąrašas
                        </button>
                    </td>
                    <td><button className="btn btn-success btn-sm" onClick={self.props.onEditItem(party)}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={self.props.onRemoveItem(party)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button></td>
                </tr>
            );
        });
        
        return (
            <div className="container"><br />
                <button className="btn btn-success" onClick={this.props.onAddClick}>
                    <i className="fa fa-plus" aria-hidden="true"></i> Registruoti naują partiją
                </button>
                <br /><br />
                <div className="panel panel-default">
                <div className="panel-heading"><strong>Partijų sąrašas</strong></div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nr</th>
                                <th>Partijos pavadinimas</th>
                                <th>Partijos numeris</th>
                                <th>Kandidatų sąrašas</th>
                                <th>Redaguoti</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partiesList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});

PartiesListComponent.propTypes = {
        parties: React.PropTypes.array.isRequired,
        onAddClick: React.PropTypes.func.isRequired,
        onRemoveItem: React.PropTypes.func.isRequired,
};

window.PartiesListComponent = PartiesListComponent;