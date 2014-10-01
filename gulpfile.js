
//remember run npm install --save-dev packageName
var gulp = require("gulp");

var plumb = require("gulp-plumber");
//var react = require("gulp-react");
var livereload = require("gulp-livereload");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");

gulp.task('browserify', function(){
      var b = browserify();
      b.transform(reactify); // use the reactify transform
      b.add('./static/js/preCompile/main.js');
      return b.bundle()
         .pipe(source('main.js'))
         .pipe(gulp.dest('./static/js'));
});

/*gulp.task("react", function () {
      gulp.src("./app/components/preCompile*//*.js")
         .pipe(plumb())
         .pipe(react())
         .pipe(gulp.dest("./static/"));
})*/

gulp.task("watch", function() {
      console.log("watching!!");
      gulp.watch("static/js/preCompile/*.jsx", ["browserify"]);

      livereload.listen();
});

// Default Task
gulp.task("default", ["watch"]);


//remember run npm install --save-dev packageName

