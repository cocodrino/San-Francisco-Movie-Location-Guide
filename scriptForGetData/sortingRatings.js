var l = require("lodash")

var data = require("./MovieDataFixedPlaces.json");

var calculateRating = function (ratingObj) {
   var rating_critics = ratingObj.critics_score
   var audience_critics = ratingObj.audience_score
   var critics = (rating_critics== -1 ? null : rating_critics)
   var audience = (audience_critics== -1 ? null : audience_critics)

   var rating;
   if(critics && audience){
      rating = (critics+audience)/2
   }else{
      rating = critics || audience
   }

   return rating;

}

var moviesNrating =
   (Object.keys(data).reduce(function(mem,title){
      var rating = calculateRating(data[title].tomatodata.ratings)
      var _o ={name : title , score : rating}
      return mem.concat(_o);
   },[]))

var sortedByRating =
   moviesNrating.sort(function(a,b){
      return b.score - a.score;
   })

var fs = require('fs');
var output = "moviesSortedByRating.json";
fs.writeFile(output,JSON.stringify(sortedByRating,"utf8"),
      function(err,resp){
   if(!err) console.log("saved file");
})
