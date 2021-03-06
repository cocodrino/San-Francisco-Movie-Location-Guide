var React = require("react");
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var MainContentC = require("./MainContentC.jsx");
var MainMovieDetailC = require("./MainMovieDetailC.jsx");
var pubsub = require('pubsub-js');

//PUBSUB IS TEMPORAL, MUST USE A MOST SOLID SOLUTION (FLUX or BACONJS)
pubsub.subscribe("CONTENT", function (msg, data) {
   console.log("RECIBIDO " + msg + " ," + data);
});

var MenuC = React.createClass({
   render: function () {
      var show_By_place = {sortByNear: true};
      var attachIt = {
         "position": "fixed" ,
         "width" : "100%",
         zIndex: 10,
         top:0
      };
      return(
         <div>
            <nav className="uk-navbar navbar_fix uk-navbar-attached shadow" style={attachIt}>
               <div className="uk-hidden-medium uk-hidden-large mini-menu">
                  <a href="" data-uk-offcanvas>
                     <i className="uk-icon-bars uk-icon-medium"></i>
                  </a>
               </div>

               <a href="" className="uk-navbar-brand navbar-brand-fix">
                  <img className="logo" src="images/logogrande3B2.png" alt="logo"/>
               </a>


               <ul className="uk-navbar-nav uk-hidden-small">

                  <li className="uk-active2 ">
                     <a className="uk-navbar-nav-subtitle"
                     onClick={pubsub.publish.bind(null,"CONTENT","distance_from_user")}>

                        <i className="uk-container-center uk-icon-map-marker uk-icon-small correction icons"></i>

                        <div className="text-logo">Location</div>
                     </a>
                  </li>


                  <li >
                     <span>
                        <span className="uk-navbar-nav-subtitle">
                           <i className="uk-container-center uk-icon-group
                   uk-icon-small correction icons" data-uk-tooltip title="Coming soon..."></i>


                           <div className="text-logo">Actor</div>


                        </span>
                     </span>
                  </li>

                  <li>
                     <a onClick={pubsub.publish.bind(null,"CONTENT","score")} className="uk-navbar-nav-subtitle">
                        <i className="uk-container-center uk-icon-heart-o uk-icon-small correction icons"></i>

                        <div className="text-logo">Rating</div>
                     </a>
                  </li>
               </ul>

            </nav>
            <div>
            {this.props.activeRouteHandler()}

            </div>


         </div>
         )
   }
});

var AlgoPage = React.createClass({

   render: function () {
      var x = {number: 2};
      var show = this.props.params.number ? "GOOD" : "BAD";
      return(

         < div >
            <h3>Default Page</h3>
          {show}


         </div>
         )
   }
});
/*
<Route
name="detail"
path="/detail/:movie"
handler={MainMovieDetailC}
/>
*/
var MapC = require("./MapC.jsx");
var routes =
   <Routes>
      <Route handler={MenuC}>
         <DefaultRoute name="main" handler={MainContentC}  />
         <Route
         name="detail"
         path="/detail/:movie"
         handler={MainMovieDetailC}
         />

      </Route>


   </Routes>;


module.exports = routes;