var NavBar = React.createClass({
    render: function() {
        return (
            <ul className="nav nav-tabs">
                <li role="presentation">
                    <IndexLink to="/" activeClassName="active"><i className="fa fa-home fa-2x" aria-hidden="true"></i></IndexLink>
                </li>
                <li role="presentation">
                    <Link to="/apygardos" activeClassName="active">Apygardos</Link>
                </li>
                 <li role="presentation">
                    <Link to="/apylinkes" activeClassName="active">Apylinkės</Link>
                </li>
                <li role="presentation">
                    <Link to="/atstovai" activeClassName="active">Atstovai</Link>
                </li>
                <li role="presentation">
                    <Link to="/partijos" activeClassName="active">Partijos</Link>
                </li>
                <li role="presentation">
                    <Link to="/kandidatai" activeClassName="active">Kandidatai</Link>
                </li>
                <li role="presentation">
                    <Link to="/atsijungti" activeClassName="active" style={{marginLeft: '385px'}}>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        (Atsijungti)
                    </Link>
                </li>
            </ul>
        );
    }
});

var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;

window.NavBar = NavBar;