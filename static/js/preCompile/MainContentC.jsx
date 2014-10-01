var React = require("react");

var getLocation = require("./Geo");
var appendDistance = require('./AppendDistance');
var MapC = require('./MapC.jsx');
var Router = require('react-router');

console.log(data.length);
var MovieListC = require('./MovieListC.jsx');
var pubsub = require('pubsub-js');


var MainContentC = React.createClass({
   //this launch a warning for geo features unavailables
   mustShowLocationMessage: function () {
      setTimeout((function () {
         if (!this.state.nearSF) {
            //message.push("sorry seems than you're not near to San Francisco")
         }
      }).bind(this), 20 * 1000)
   },

   runGeoLocalization: function () {
      //refactor: use object instead of arrays for result geoLocation
      var that = this;
      var _movies = this.state.movies;
      getLocation(function (resultArray) {
         if (resultArray[0] == false) {
            that.setState({nearSF: false})

         } else {
            that.setState({
               movies: appendDistance(_movies  , resultArray[1]),
               nearSF: true,
               userPosition: resultArray[1]

            })
         }
      })
   },

   componentWillMount : function () {
      this.runGeoLocalization();
      this.mustShowLocationMessage();
   },

   componentDidMount : function () {
      pubsub.subscribe("CONTENT", (function (msg, data) {
         this.setState({sort : data})
      }).bind (this));
   },

   getInitialState: function () {

      return {movies: data, nearSF: null,userPosition : null,sort:"score"}
   },

   render: function () {


      return(
         <div className="movieContainer uk-width-8-10 uk-container-center card-shadow">
            <MapC
            is_available={this.state.nearSF}
            movies={this.state.movies}
            userPosition={this.state.userPosition}/>

            <MovieListC data={this.state.movies} sort={this.state.sort}/>

         </div>

         )
   }
});

module.exports = MainContentC;