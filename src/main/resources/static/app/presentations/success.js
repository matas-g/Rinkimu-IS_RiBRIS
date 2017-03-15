const React = require('react');

var HomeListComponent = React.createClass({
	render: function() {
		return (
		   <div className="container-fluid">
				 <div className="row-fluid text-center">
					 <img src="../../img/success.png" />
		       <h3>Suvedėte apylinkės balsus!</h3>
				 </div>
	    </div>
		);
	}
});

module.exports = HomeListComponent;
