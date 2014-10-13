var React = require("react");
var Format = require("./FormatNames");
var Router = require('react-router');
var Link = Router.Link;
var Ani = require("./AnimationC.jsx");

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
         <div>{this.props.score} | {this.props.distance}</div>;

      var _image = this.props.poster ? this.props.poster :""
      var _posterName = _image.match(/[A-Za-z0-9@_.]+$/g)


      var posterRoute = Array.isArray(_posterName) ? ("posters/" + _posterName[0]) : "posters/notFound2.png";


      return(
         <li id={Format.toHtml(this.props.name)} className="movieBar" >
            <Link to="detail" params={{movie: this.props.name}}>
               <div className="uk-grid uk-panel-box data-uk-grid-match fixNew">
                  <div className="uk-width-large-1-10 uk-width-medium-2-10 uk-hidden-small poster">
                     <img src={posterRoute}/>
                  </div>

                  <div className="
                     uk-width-medium-5-10
                     uk-width-large-7-10
                     uk-vertical-align-middle
                     title_bar_main">
                     <h2>{this.props.name}</h2>
                  </div>

                  <div className="
                     uk-width-large-2-10
                     distance-box
                     uk-width-medium-3-10 "
                  >
                     <p>Score</p>
                     {rating_distance}
                  </div>


               </div>
            </Link>
         </li>
         );
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
         />;
      });



      return(
         <div className="uk-width-9-10 uk-container-center  uk-scrollable-box"    id="movieList">
            <ul className="uk-list uk-list-line">
            <Ani
               onElement=".movieBar"
              transitionT="slideDownBigIn"
              transitionP={{drag : true, stagger : 170}}>
            >
           <div className="uk-alert" data-uk-alert>
                <a href="" className="uk-alert-close uk-close"></a>
                <p>
                "Some poster couldn't be correctly loaded, seems a limitation with the github hosting...
                please clone the project from"

                <a href="https://github.com/cocodrino/San-Francisco-Movie-Location-Guide/tree/gh-pages">
                     " here"
               </a>

                </p>

            </div>
            {movies}
            </Ani>
            </ul>
         </div>);


   }
});

module.exports = MovieListC;
