var React = require("react");

var getLocation = require("./Geo");
var appendDistance = require('./AppendDistance');
var MapC = require('./MapC.jsx');


console.log(data.length);
var MovieListC = require('./MovieListC.jsx');



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

   getInitialState: function () {

      return {movies: data, nearSF: null,userPosition : null,sortBy:"score"}
   },

   render: function () {

      return(
         <div>
            <MapC
            show={this.state.nearSF}
            movies={this.state.movies}
            userPosition={this.state.userPosition}/>

            <MovieListC data={this.state.movies} sort={this.state.sortBy}/>

         </div>

         )
   }
});

module.exports = MainContentC();