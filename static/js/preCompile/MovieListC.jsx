var React = require("react");
var Format = require("./FormatNames");

/**
 * Movie Bar Component
 * Display poster,name,rating and (optional) distance for movie main page
 * movies format == MainPageData json
 * @param {string} poster poster for the movie
 * @param {string} name name of movie
 * @param {float} score score movie
 * @param {float} distance distance movie location to user
 */
var MovieMainC = React.createClass({
   render: function () {
      var rating_distance = this.props.distance ?
         <div>{this.props.score}</div>
         :
         <div>{this.props.score}/{this.props.distance}</div>;

      return(
         <div id={Format.toHtml(this.props.name)}>
            <img src={this.props.Poster}/>
            <div>{this.props.name}</div>
            <div>{rating_distance}</div>
         </div>
         )
   }
});


/**
 * Movie List Component
 * Display Movies and sort them based in the sort parameter
 * movies format == MainPageData json
 * @param {string} sort parameter for sort the movies
 * @param {movies[]} data movies to show
 */
var MovieListC = React.createClass({
   render: function () {
      var sortedMovies = _.sortBy(this.props.data, this.props.sort).reverse();
      var movies = sortedMovies.map(function (data) {
         return <MovieMainC poster={data.Poster}
         name={data.name}
         score={data.score}
         distance = {data.distance_from_user}
         key={Format.toHtml(data.name)}
         />
      });

      return(
         <div id="movieList">
      {movies}
         </div>)
   }
});

module.exports = MovieListC;