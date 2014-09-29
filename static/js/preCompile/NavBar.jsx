var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var TestRouter = React.createClass({
  render: function() {
    return(
      <div>
        Welcome

        <div>
            {this.props.activeRouteHandler()}

        </div>
      </div>
    )
  }
});

var AlgoPage = React.createClass({

  render: function() {
      var x = {number: 2};
     var show = this.props.params.number ? "GOOD" : "BAD";
      return(

          < div >
          <h3>Default Page</h3>
          {show}
          <li>< Link to="detail" params={x}>GO TO DETAIL</Link></li>
          <li>< Link to="byAge" params={x}>GO TO DETAIL</Link></li>

        </div>
    )
  }
});

var DetailPge = React.createClass({
  render: function() {
    return(
      <div>
        <h2>Detail Page, Number is....</h2>
        <h1>{this.props.params.number}</h1>
      </div>
    )
  }
});

var routes = <Routes>
    <Route handler={TestRouter}>
        <DefaultRoute name="main" handler={AlgoPage} />
        <Route name="byAge" handler={AlgoPage} path=":number"/>
        <Route
        name="detail"
        path="/number/:number"
        handler={DetailPge}
        />


    </Route>


</Routes>;



module.exports = routes;
