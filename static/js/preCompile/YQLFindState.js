

//thanks to http://james.padolsey.com/javascript/using-yql-with-jsonp/
var YQL = function(query, callback) {

    if (!query || !callback) {
        throw new Error('$.YQL(): Parameters may be undefined');
    }

    var encodedQuery = encodeURIComponent(query.toLowerCase()),
        url = 'http://query.yahooapis.com/v1/public/yql?q='
            + encodedQuery + '&format=json&callback=?';

    $.getJSON(url, callback);

};


var YQLFindState = function (lat,long,cllb) {
    var query ='SELECT * FROM local.search WHERE latitude="'+lat+'" and longitude="'+long+'" and query="State"';
    YQL(query, function (dataJson) {
       var state;

       try{
          state=dataJson.query.results.Result[0].City
       }catch(err) {
          console.log(err);
          state=""
       }


       cllb(state)
    })
};


module.exports = YQLFindState;
