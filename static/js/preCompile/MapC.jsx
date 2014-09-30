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
   limitDisplaMovies: 2,

   getInitialState : function () {
      return {show_clicked : false}
   },

   softScrollTo: function (_id) {
      $('html, body').animate({
         scrollTop: $("#" + _id).offset().top
      }, 500);
      return false;
   },

   getMarks: function (mvList) {
      var it = this;
      var _mk =
         _.take(mvList, this.limitDisplaMovies)
            .map(function (movie) {
               return (movie.coordinates.map(function (coord) {
                  return(
                     <Marker
                     onClick={it.softScrollTo.bind(it, Format.toHtml(movie.name))}
                     position={new GoogleMapsAPI.LatLng(coord[0], coord[1])}
                     />)
               }))
            });

      return _.flatten(_mk)
   },

   render: function () {
      var marks = this.getMarks(this.props.movies);

      var showMapOrDiv = (this.props.is_available && this.state.show_clicked) ?
         <Map
         initialZoom={10}
         height={700}
         width={700}

         initialCenter={new GoogleMapsAPI.LatLng(this.props.userPosition[0], this.props.userPosition[1])}
         >
         {marks}
         </Map>
         :
         <div></div>;


      var available_link =( function (name, state_for_true) {
        var tag
        if(this.state[state_for_true]){
         tag = (<li><a href="" onClick={this.toggle_f}>{name}</a></li>)

        }else{
          tag = (<li><span>{name}</span><li>)
        }

        return tag

      }).bind(this);



      return(
         <div>
            <div class="show-map-option">
               <div class="show-map-box">
                  <h5>Show Map : </h5>
               </div>
               <ul class="uk-subnav">
                  <li>
                     <a href=""> Yes </a>
                  </li>
                  <li>
                     <span>No  </span>
                  </li>
               </ul>
            </div>

            <hr class="uk-article-divider green-separator"/>
            <div class="map">{showMapOrDiv}</div>

         </div>



         )
   }
});

module.exports = MapC;



