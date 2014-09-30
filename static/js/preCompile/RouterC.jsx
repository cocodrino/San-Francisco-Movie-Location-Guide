var React = require("react");
/*
var MainPageC = require("./MainPageC.jsx");
*/

var MainContentC = require("./MainContentC.jsx");
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;



var MenuC = React.createClass({
  render: function() {
    return(
       <nav className="uk-navbar navbar_fix uk-navbar-attached shadow">
          <div className="uk-hidden-medium uk-hidden-large mini-menu">
             <a href="" data-uk-offcanvas> <i className="uk-icon-bars uk-icon-medium"></i> </a>
          </div>

          <a href="" className="uk-navbar-brand navbar-brand-fix">
             <img className="logo" src="images/logogrande3B2.png" alt="logo"/>
          </a>


          <ul className="uk-navbar-nav uk-hidden-small">

             <li className="uk-active ">
                <a href="" className="uk-navbar-nav-subtitle">
                   <i className="uk-container-center uk-icon-map-marker uk-icon-small shit icons"></i>

                   <div className="text-logo">Location</div>
                </a>
             </li>


             <li >
                <span>
                   <span className="uk-navbar-nav-subtitle">
                   <i className="uk-container-center uk-icon-group
                   uk-icon-small shit icons" data-uk-tooltip title="Coming soon..."></i>


                   <div className="text-logo">Actor</div>


                </span>
                </span>
             </li>

             <li>
                <a href="" className="uk-navbar-nav-subtitle">
                   <i className="uk-container-center uk-icon-heart-o uk-icon-small shit icons"></i>

                   <div className="text-logo">Rating</div>
                </a>
             </li>
          </ul>

       </nav>
    )
  }
});

var routes = <Routes>
   <Route handler={MenuC}>
      <DefaultRoute name="main" handler={MainContentC} />
      <Route name="byAge" handler={AlgoPage} path=":byPlace"/>
      <Route
      name="detail"
      path="/number/:number"
      handler={DetailPge}
      />


   </Route>


</Routes>;





module.exports = routes;