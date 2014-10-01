var data = require("./moviesSortedByRating");
var rest = require("restler");
var fs = require('fs');

data.forEach(function (movie, i) {
    var encode = encodeURIComponent(movie.name);
    var uri = "http://www.omdbapi.com/?i=&t=" + encode
    console.log(uri);
    rest.get(uri).on("complete", function (result) {
        console.log("making request");

        try {

            data[i]["Poster"] = (JSON.parse(result))["Poster"]
        } catch (e) {
            console.log("error " + e)
        }
    })
});




var output = "moviesWithRatingSortedAndPoster.json";
fs.writeFile(output, JSON.stringify(dataWithPoster, "utf8"),
    function (err, resp) {
        if (!err) console.log("saved file");
    });
