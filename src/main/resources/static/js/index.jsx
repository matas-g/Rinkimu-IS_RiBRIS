var App = React.createClass({
    render: function() {
        return (
            <div style={{ paddingTop: '20px' }}>
                <NavBar/>
                {this.props.children}
            </div>
        );
    }
});

var DistrictRowContainer = React.createClass({
    render: function() {
        return (
            <h4>Greitai čia bus apylinkių sąrašas priskirtas konkrečiai apygardai</h4>
        );
    }
});


var NoMatch = React.createClass({
  render: function() {
    return <div>Route did not match</div>;
  }
});


var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;



ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/apygardos" component={ConstituenciesListContainer} />
        <Route path="/apygardos/prideti" component={AddConstituencyContainer} />
        <Route path="/apygardos/redaguoti/:constituencyId" component={EditConstituencyContainer} />
        <Route path="/apygardos/trinti/:constituencyId" component={ConstituenciesListContainer} />
     <Route path="/apylinkes" component={DistrictListContainer} />
        <Route path="/apygarda/:constituencyId/apylinkes" component={DistrictRowContainer} />
        <Route path="/apylinkes/prideti" component={AddDistrictContainer} />
        <Route path="/apylinkes/redaguoti/:districtId" component={EditDistrictContainer} />
        <Route path="/apylinkes/trinti/:districtId" component={ConstituenciesListContainer} />
     <Route path="/atstovai" component={RepresentativesListContainer} />
        <Route path="/atstovai/prideti" component={AddRepresentativeContainer} />
        <Route path="/atstovai/redaguoti/:representativeId" component={EditRepresentativeContainer} />
        <Route path="/atstovai/trinti/:representativeId" component={RepresentativesListContainer} />
      <Route path="/partijos" component={PartiesListContainer} />
        <Route path="/partijos/prideti" component={AddPartyContainer} />
        <Route path="/partijos/redaguoti/:partyId" component={EditPartyContainer} />
        <Route path="/partijos/trinti/:partyId" component={PartiesListContainer} />
      <Route path="/kandidatai" component={AddCandidateListContainer} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'));