const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const NavBar = require('../containers/navigation/navbar-container');
const NavListContainer = require('../containers/navigation/nav-cards-list-container');

const AddConstituency = require('../containers/add-constituency-container');
const AddDistrict = require('../containers/add-district-container');
const AddParty = require('../containers/add-party-container');
const AddRepresentative = require('../containers/add-representative-container');

const ConstituenciesList = require('../containers/lists/constituencies-list-container');
const DistrictsList = require('../containers/lists/districts-list-container');
const PartiesList = require('../containers/lists/parties-list-container');
const RepresentativesList = require('../containers/lists/representatives-list-container');

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={NavBar}>
      <IndexRoute component={ConstituenciesList} />
      <Route path="/constituencies" component={ConstituenciesList} />
        <Route path="/constituencies/add" component={AddConstituency} />

      <Route path="/districts" component={DistrictsList} />
        <Route path="/districts/list/:constituencyId" component={DistrictsList} />
        <Route path="/districts/add" component={AddDistrict} />
        <Route path="/districts/edit/:districtId" component={AddDistrict} />

      <Route path="/representatives" component={RepresentativesList} />
        <Route path="/representatives/add" component={RepresentativesList} />

      <Route path="/parties" component={PartiesList} />
        <Route path="/parties/add" component={AddParty} />
        <Route path="/parties/add-list" component={AddConstituency} />

      <Route path="/candidates" component={NavListContainer} />
        <Route path="/candidates/add" component={AddConstituency} />
        <Route path="/candidates/add-list" component={AddConstituency} />

      <Route path="/results" component={NavListContainer} />
        <Route path="/results/add-list" component={AddConstituency} />
        <Route path="/results/edit" component={AddConstituency} />
        <Route path="/results/delete" component={AddConstituency} />
    </Route>
  </Router>
);

module.exports = routes;
