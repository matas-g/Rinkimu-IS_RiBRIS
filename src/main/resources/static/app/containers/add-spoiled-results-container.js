const React = require('react');
const axios = require('axios');
const AddConstituencies = require('../presentations/add-spoiled-results-presentation');

var AddConstituencyContainer = React.createClass({
    getInitialState: function() {
        return {
          district: {
            id: 1
          },
          districts: [],
          voteCountSingle: '',
          voteCountMulti: ''
        }
    },

    componentWillMount: function() {
      var self = this;
      axios.get('http://localhost:8090/polling-districts/').then(function(response) {
        self.setState({
          districts: response.data,
          district: {
            id: response.data[0].id,
    		name: response.data[0].name,
    		address: response.data[0].address,
    		numOfVoters: response.data[0].numOfVoters
          }
        });
      });
    },

    // blogas metodas cia, reiktu padaryti, kad butu 2 kart kvieciamas axios post metodas
    // viena karta vienmandaciams (voteCountSingle) antra kart daugiamandaciams (voteCountMulti).
    // tuo paciu reikia ir backe padaryti, kad polling district turetu metodus priimti district id
    // pagal kuri jis zinos kuriai apylinkei yra priskiriami balsai ir balsu skaiciu sumergintu, t. y. butu sukuriama
    // nauja apylinke, tada pagal id susirandi kuriai apylinkei setinsi balsu, uzsetinami senos apylinke
    // visi laukai ir nauja apylinke sumerginama. T. y. paliekamas tik vienas metodas backe, tik merge, o paskui
    // ta merge persistini.
    handleSaveClick: function(e) {
      e.preventDefault();
      var self = this;
      console.log(this.state);
      var dataList = {
    		  district: {
    	      name: this.state.name,
    	      address: this.state.address,
    	      numOfVoters: this.state.numOfVoters
    		  	}
      		};
      
      axios.post('http://localhost:8090/polling-districts/', dataList).then(function(response) { // praplesti rektu kontroleri,
             console.log(response);                                                                       // butent balsams priskirti ir
                                                                                       // pagal id atskirti kuriai apylinkei
      });
    },

    handleConstituencyChange: function(e){
      var districtId = parseInt(e.target.value);
      this.setState({
        district: {
          id: districtId
        }
      });
    },

    handleSingleChange: function(e) {
      var count = e.target.value;
      this.setState({
        voteCountSingle: count
      });
    },

    handleMultiChange: function(e) {
      var count = e.target.value;
      this.setState({
        voteCountMulti: count
      });
    },

    handleCancelClick() {
        this.context.router.push('/representative');
    },

    render: function() {
      return (
        <AddConstituencies
          districts={this.state.districts}
          district={this.state.district}
          voteCountSingle={this.state.voteCountSingle}
          voteCountMulti={this.state.voteCountMulti}
          onSaveClick={this.handleSaveClick}
          onCancelClick={this.handleCancelClick}
          onSingleChange={this.handleSingleChange}
          onMultiChange={this.handleMultiChange}
        />
      );
    }
});

AddConstituencyContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

module.exports = AddConstituencyContainer;
