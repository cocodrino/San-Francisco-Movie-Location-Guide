//This file validate geolocation for the user
//this return the coordenates and if the user is in SF
var calculateDistance = require('./DistanceCalculator');
var sf_centroid = [37.747398, -122.439217];


function getLocation(cllb) {
   if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(function (result) {
         var lat = result.geolocation.latitude;
         var lon = result.geolocation.longitude;
         var distance = calculateDistance(lat, lon,
            sf_centroid[0], sf_centroid[1]);

          cllb([distance<30,[lat,lon]])

      });
   } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
      return cllb([false,[0,0]])
   }
}





module.exports = getLocation;