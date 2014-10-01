var l = require("lodash")

var data = require("./MoviesFormated")

var keys = []
for(var k in data){
   keys.push(k);
}


keys.forEach(function(k){
   data[k].sfdata.forEach(function(place,index){
      var kCoord = l.forOwn(place.coordinates,function(vc,kc){

         data[k].sfdata[index].coordinates = [kc,vc];
      })

   })
})

var fs = require('fs');
var output = "MovieDataFixedPlaces.json";
fs.writeFile(output,JSON.stringify(data,"utf8"),function(err,resp){
   if(!err) console.log("saved file");
})
