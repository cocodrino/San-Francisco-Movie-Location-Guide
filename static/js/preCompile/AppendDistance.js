//this method add the distance to the movie data
//is wrote separated because is a bit long for includes inside the MainPageC

var distanceCalc = require("./DistanceCalculator");

var AppendDistance = function (movieList, userCoords) {
   var _movieList = movieList.map(function (movie) {
      var distances = movie.coordinates.map(function (filmCoord) {
         var distancePlace;
         try {
            distancePlace = distanceCalc(userCoords[0], userCoords[1], filmCoord[0], filmCoord[1])
         /*   if(distancePlace>50){
               console.log("userCoord " + userCoords + "\n");
               console.log("filmCoord " + filmCoord);
               debugger;
            }*/

         } catch (e) {
            console.log("error,maybe I cant found a complete coordenate " + e);
            distancePlace = 100
         }


         return distancePlace

      });

      var minimalDistance = distances.sort(function (a, b) {
         return a-    b
      });

      movie["distance_from_user"] = minimalDistance[0]
      return movie;
   });

   return _movieList;
};

module.exports = AppendDistance;
