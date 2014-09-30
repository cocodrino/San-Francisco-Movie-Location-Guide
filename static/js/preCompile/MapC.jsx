var React = require("react");

var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;
var Format = require("./FormatNames");



/**
 * Map Component , take movies and show boolean and load the coordinates
 * in a map
 * movies format == MainPageData json
 * @param{userPosition[]} user place
 * @param {boolean} show must show the map?
 * @param {movies[]} movies movies to show
 */
var MapC = React.createClass({
   limitDisplaMovies: 20,

   softScrollTo: function (_id) {
      $('#movieList').stop().animate({
         scrollTop: $('#' + _id).offset().top
      }, 400);
   },

   getMarks: function (mvList) {
      var it = this;
      var _mk =
         _.take(mvList, this.limitDisplaMovies)
            .map(function (movie) {
               movie.coordinates.map(function (coord) {
                  return(
                     <Marker
                     onClick={this.softScrollTo.bind(it, Format.toHtml(movie.name))}
                     position={new GoogleMapsAPI.LatLng(coord[0], coord[1])}
                     />)
               })
            });

      return _.flatten(_mk)
   },

   render: function () {
      var marks = this.getMarks(this.props.movies);

      var showMapOrDiv = this.props.show ?
         <Map
         initialZoom={10}
         initialCenter={new GoogleMapsAPI.LatLng(this.props.userPosition[0], this.props.userPosition[1])}
         >
         {marks}
         </Map>
         :
         <div></div>;
      return(
         <div>{showMapOrDiv}</div>

         )
   }
});

module.exports = MapC;



