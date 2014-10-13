var util = require('util');
var exec = require('child_process').exec;
var url = require('url');
var child;


var download_file_wget = function(file_url) {

    // extract the file name
    var file_name = url.parse(file_url).pathname.split('/').pop();
    // compose the wget command
    var wget = 'wget -P ' + file_url;
    // excute wget using child_process' exec function

    var child = exec(wget, function(err, stdout, stderr) {
        if (err) throw err;
        else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
    });
};


//data come from MainPageData.js which was previously loaded inside node repl
data.forEach(function(d){
    exec('wget '+d["Poster"],function(e,o,err){
        if(e) console.log(e);
        console.log("o :" + o);
        console.log("err :" + err);
    });

});

