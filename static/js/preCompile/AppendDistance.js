//this method add the distance to the movie data
//is wrote separated because is a bit long for includes inside the MainPageC

var distanceCalc = require("./DistanceCalculator");

var AppendDistance = function (movieList, userCoords) {
   return movieList.map(function (movie) {
      var distances = movie.coordinates.map(function (filmCoord) {
         distanceCalc(userCoords[0], userCoords[1], filmCoord[0], filmCoord[1])
      });

      var minimalDistance = distances.sort(function (a, b) {
         return b - a
      });

      movie["distance_from_user"] = minimalDistance

   })
};

module.exports = AppendDistance;
