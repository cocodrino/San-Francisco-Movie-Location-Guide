var Bacon = require("baconjs");
var yqlQuery = require("./YQLFindState");
var wholeData;
var location;
var dataPlaces;
var dataActors;
var dataByNear;
var dataByCritic; //debe ser preprocesado
var dataByPeople; //debe ser preprocesado


wholeDataLoad = Bacon.fromEventTarget(document, "ready").map(function (_n) {
   return wholeData
}).log();


function getLocation(cllb) {
   if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(validSFCoord.bind(this,cllb));
   } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
      return cllb("")
   }
}
 //this function detects if the user is in SF
function validSFCoord(cllb,position) {

   yqlQuery(position.coords.latitude, position.coords.longitude, cllb);

  /* x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;*/
}


location = wholeDataLoad.flatMap(function (_n) {
   return Bacon.fromCallback(getLocation).log

}).log;

/*
dataPlaces = location.map(function (currentPlace) {
   wholeData.map(dataJson)
   {
      dataJson.YqlData.sortBy(function (movieData) {
         return showPosition(movieData, currentPlace)
      })
   }
})

//this function return an array of movies sorted by critic rating
dataByCritic = wholeData.map(function (data) {
   return data.byCritics
})



function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

   function deg2rad(deg) {
      return deg * (Math.PI / 180)
   }

   var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2 - lat1);  // deg2rad below
   var dLon = deg2rad(lon2 - lon1);
   var a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
               Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   var d = R * c; // Distance in km
   return d;
}


var React = require('react');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;

function handleClick(e) {
   console.log('Clicked at position', e.latLng);
}

var mapa = React.class({
   getInitialState: function () {
      return {dataPlaces: []}
   },

   scrollTo: function (placeID) {

   },


   componentWillMount: function () {
      dataPlaces.onValue(function (value) {
         this.setState(dataPlaces
         :
         value
         )
      })
   },
   render: function () {
      var places = this.state.dataPlaces(function (place, i) {
         return <Marker onClick={scrollTo.bind(this, place.name)}
         position={place.coordinate} key={i}></Marker>
      })

         < Map >
      {places};


      </Map>
      }

      })


      React.renderComponent(

         <Map
         initialZoom={10}
         initialCenter={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)}>

            <Marker
            onClick={handleClick}
            position={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)} />

            <OverlayView
            style={{backgroundColor: '#fff'}}
            position={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)}>
               <p>Some content</p>
            </OverlayView>
         </Map>
      ,
      mountNode
      );

      var Warning = React.createClass({
         componentWillMount : function(){
         setTimeOut()
         }

      })
*/
