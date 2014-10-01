var l = require("lodash")

var data = require("./MovieDataFixedPlaces")

var keys = []
for(var k in data){
   keys.push(k);
}



var dataFixedK=keys.reduce(function(mem,k){
   var fixedK = k.replace(/\s/g,'_');
   mem[fixedK] = data.k
   return mem
},{})


//fix coord

keys.forEach(function (mv) {
   try{
      data[mv].sfdata.forEach(function (place,index) {
         try{
            place.coordinates.forEach(function(coord,ind){
               var fixedCoord = coord.match(/(-)?\d+\.\d+/g)[0] 
               data[mv].sfdata[index].coordinates[ind] = fixedCoord;
            })
         }catch(e){
            console.log("error "+e);
         }
      })

   }catch(e){
      console.log("error1 "+e)
   }
})


/*
   keys.forEach(function(k){
   data[k].sfdata.forEach(function(place,index){
   var kCoord = l.forOwn(place.coordinates,function(vc,kc){

   data[k].sfdata[index].coordinates = [kc,vc];
   })

   })
   })
   */

var fs = require('fs');
var output = "FINAL_fixedCoord.json";
fs.writeFile(output,JSON.stringify(dataFixedK,"utf8"),function(err,resp){
   if(!err) console.log("saved file");
})
