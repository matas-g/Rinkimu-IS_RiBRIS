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
const AddCandidate = require('../containers/add-candidate-container');
const AddSingleMandateResults = require('../containers/add-single-mandate-results-container');

const ConstituenciesList = require('../containers/lists/constituencies-list-container');
const DistrictsList = require('../containers/lists/districts-list-container');
const PartiesList = require('../containers/lists/parties-list-container');
const RepresentativesList = require('../containers/lists/representatives-list-container');
const CandidatesList = require('../containers/lists/candidates-list-container');

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={NavBar}>
      <IndexRoute component={ConstituenciesList} />
      <Route path="/constituencies" component={ConstituenciesList} />
        <Route path="/constituencies/add" component={AddConstituency} />
        <Route path="/constituencies/edit/:constituencyId" component={AddConstituency} />

      <Route path="/districts" component={DistrictsList} />
        <Route path="/districts/list/:constituencyId" component={DistrictsList} />
        <Route path="/districts/add" component={AddDistrict} />
        <Route path="/districts/edit/:districtId" component={AddDistrict} />

      <Route path="/representatives" component={RepresentativesList} />
        <Route path="/representatives/add" component={AddRepresentative} />
        <Route path="/representatives/add/:districtId" component={AddRepresentative} />

      <Route path="/parties" component={PartiesList} />
        <Route path="/parties/add" component={AddParty} />
        <Route path="/parties/add-list" component={AddConstituency} />

      <Route path="/candidates" component={CandidatesList} />
        <Route path="/candidates/add" component={AddCandidate} />
        <Route path="candidates/list/:constituencyId" component={CandidatesList} />
        <Route path="/candidates/add-list" component={AddConstituency} />

      <Route path="/results" component={AddSingleMandateResults} />
        <Route path="/results/add-list" component={AddConstituency} />
        <Route path="/results/edit" component={AddConstituency} />
        <Route path="/results/delete" component={AddConstituency} />
    </Route>
  </Router>
);

module.exports = routes;
