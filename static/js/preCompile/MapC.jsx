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

   getInitialState: function () {
      return {show_clicked: false}
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
      var WIDTH = 600;
      var HEIGHT = 200;


      var available_link = ( function (name, state_o, b) {
         //var _bool = b ? this.state[state_o] : !this.state[state_o];

         if (this.state[state_o] == b) {
            return  <li>
               <a href="" onClick={this._toggle}>{name}</a>
            </li>

         } else {
            return <li>
               <span>{name}</span>
            </li>
         }


      }).bind(this);

      var showMapOrDiv = (this.props.is_available && this.state.show_clicked) ?
         <Map
         initialZoom={10}
         height={WIDTH}
         width={HEIGHT}

         initialCenter={new GoogleMapsAPI.LatLng(this.props.userPosition[0], this.props.userPosition[1])}
         >
         {marks}
         </Map>
         :
         <div></div>;

      var styleMap = {width: WIDTH, height: HEIGHT};

      return(
         <div className="uk-container-center" style={styleMap}>
            <div className="show-map-option">
               <div className="show-map-box">
                  <h5>Show Map : </h5>
               </div>
               <ul className="uk-subnav">
               {available_link("Yes", "show_clicked", true)}
               {available_link("No", "show_clicked", false)}
                  <li>
                     <span>No  </span>
                  </li>
               </ul>
            </div>

            <hr className="uk-article-divider green-separator"/>
            <div className="map">{showMapOrDiv}</div>

         </div>



         )
   }
});

module.exports = MapC;



