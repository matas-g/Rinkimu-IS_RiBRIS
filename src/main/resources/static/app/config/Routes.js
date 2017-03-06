const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const NavBar = require('../containers/navigation/navbar-container');
const NavRepresentative = require('../containers/navigation/navbar-representative-container');
const NavListContainer = require('../containers/navigation/nav-cards-list-container');
const Login = require('../presentations/lists/login-presentation');

const AddConstituency = require('../containers/add-constituency-container');
const AddDistrict = require('../containers/add-district-container');
const AddParty = require('../containers/add-party-container');
const AddRepresentative = require('../containers/add-representative-container');
const AddCandidate = require('../containers/add-candidate-container');
const AddSingleMandateResults = require('../containers/add-single-mandate-results-container');
const AddPartyResults = require('../containers/add-party-results-container');
const AddSpoiledResults = require('../containers/add-spoiled-results-container');

const Suvesti = require('../presentations/suvedete-balsus');
const Herb = require('../presentations/herb');

const ConstituenciesList = require('../containers/lists/constituencies-list-container');
const DistrictsList = require('../containers/lists/districts-list-container');
const PartiesList = require('../containers/lists/parties-list-container');
const RepresentativesList = require('../containers/lists/representatives-list-container');
const CandidatesList = require('../containers/lists/candidates-list-container');
const ActivityList = require('../containers/lists/activity-list-container');

const HomeList = require('../presentations/lists/home-list-presentation');
const PublicResultsList = require('../presentations/lists/public-result-list-presentation');
const SingleMandateList = require('../presentations/lists/single-mandate-results');



const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={HomeList}>
    	<IndexRoute component={Herb} />
      	<Route path="/results" component={PublicResultsList} >
          <Route path="/single-mandate" component={SingleMandateList} />
        </Route>
    </Route>
    
    <Route path="/login" component={Login}>
    </Route>
    
    <Route path="/admin" component={NavBar}>
      <IndexRoute component={ConstituenciesList} />
      <Route path="/admin/constituencies" component={ConstituenciesList} />
        <Route path="/admin/constituencies/add" component={AddConstituency} />
        <Route path="/admin/constituencies/edit/:constituencyId" component={AddConstituency} />

      <Route path="/admin/districts" component={DistrictsList} />
        <Route path="/admin/districts/list/:constituencyId" component={DistrictsList} />
        <Route path="/admin/districts/add" component={AddDistrict} />
        <Route path="/admin/districts/edit/:districtId" component={AddDistrict} />

      <Route path="/admin/representatives" component={RepresentativesList} />
        <Route path="/admin/representatives/add" component={AddRepresentative} />
        <Route path="/admin/representatives/add/:districtId" component={AddRepresentative} />

      <Route path="/admin/parties" component={PartiesList} />
        <Route path="/admin/parties/add" component={AddParty} />
        <Route path="/admin/parties/add-list" component={AddConstituency} />
      	<Route path="/admin/parties/edit/:partyId" component={AddParty} />
     
      <Route path="/admin/candidates" component={CandidatesList} />
        <Route path="/admin/candidates/add" component={AddCandidate} />
        <Route path="/admin/candidates/constituency/:constituencyId" component={CandidatesList} />
        <Route path="/admin/candidates/party/:partyId" component={CandidatesList} />
        <Route path="/admin/candidates/add-list" component={AddConstituency} />
      	<Route path="/admin/candidates/edit/:candidateId" component={AddCandidate} />
      </Route>

    <Route path="/representative" component={NavRepresentative}>
	    <IndexRoute component={AddSingleMandateResults} />
	    <Route path="/representative/results/single" component={AddSingleMandateResults} />
      <Route path="/representative/results/parties" component={AddPartyResults} />
      <Route path="/representative/results/spoiled" component={AddSpoiledResults} />
      <Route path="/representative/results/spoiled" component={Suvesti} />
	  </Route>
	    
	 <Route path="/activity" component={ActivityList} />
  </Router>
);

module.exports = routes;
