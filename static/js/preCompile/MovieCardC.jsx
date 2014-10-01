var React = require('react');

//received props :   movie
var PosterC = React.createClass({
   render: function () {
      var posterURL = _.filter(data, {"name": this.props.movie})[0]["Poster"];
      var originData = DATA_SPECIFIC[this.props.movie]["sfdata"][0];
      //I will use an array instead of an obj cause js doesnt provide a functional way for iterate across an obj
      var details = [
         ["director", originData["director"]],
         ["distributor", originData["distributor"]],
         ["writer", originData["writer"]],
         ["company", originData["comp"]],
         ["year", originData["year"] || DATA_SPECIFIC[this.props.movie]["tomatodata"]["year"]]

      ];

      var detailElement = details
         .filter(function (v) {
            return v[1] != null
         })
         .map(function (v) {

            return <div>
               <h4>{v[0]}</h4>
               <h6>{v[1]}</h6>
            </div>
         });

      return(
         <p>

            <div className="uk-width-medium-2-6 fixNew  uk-panel-box poster-with-data">
               <div className="uk-width-medium-1-2 uk-container-center image-box">
                  <img src={posterURL} />
               </div>

               <div className="compact-movie-det">

                     {detailElement}

               </div>

            </div>


         </p>



         )
   }
});

//received props :   also movie
var ValorationC = React.createClass({
   render: function () {
      var originData = DATA_SPECIFIC[this.props.movie]["tomatodata"]["ratings"];

      var ratingElement = (
         <div>
            <h3>Audience Rating</h3>
            <h4>{originData["audience_rating"] || "N/A"}</h4>
            <h3>Critics Rating</h3>
            <h4>{originData["critics_rating"] || "N/A"}</h4>
            <h3>Critics Score</h3>
            <h4>{originData["critics_score"] || "N/A"}</h4>
            <h3>Audience Score</h3>
            <h4>{originData["audience_score"] || "N/A"}</h4>

         </div>

         );

      return(


         <div className="uk-width-5-6 uk-container-center uk-panel-box">
            <div className="uk-grid">
               <div className="uk-width-2-4 centered-text">
                  <div className="uk-grid">
                     <div className="uk-width-1-1">
                        <h5>Critics</h5>
                     </div>
                     <div className="point-rating uk-width-1-1 ">
                              {originData["critics_score"] || "N/A"}
                     </div>
                     <div className="uk-width-1-1">
                               {originData["critics_score"] || "N/A"}
                     </div>


                  </div>


               </div>

               <div className="uk-grid">
                  <div className="uk-width-1-1">
                     <h5>Audience</h5>
                  </div>
                  <div className="uk-width-1-1 point-rating">
                    {originData["audience_score"] || "N/A"}
                  </div>
                  <div className="uk-width-1-1">
                     {originData["audience_rating"] || "N/A"}
                  </div>

               </div>
            </div>
         </div>


         )
   }
});

//need pass a movie prop
var SynopsisC = React.createClass({
   getInitialState: function () {
      return {content: DATA_SPECIFIC[this.props.movie]["tomatodata"]["synopsis"]}
   },

   componentDidMount: function () {
      var that = this; //because that is better than it :D


      $.getJSON("https://www.googleapis.com/freebase/v1/search?query=" + encodeURIComponent(this.props.movie.toLowerCase()),
         function (response) {
            var responseFB = response.result;

            if (response.result[0] && (responseFB[0]["id"] || responseFB[0]["mid"])) {
               var id = responseFB[0]["id"] || responseFB[0]["mid"];

               $.getJSON("https://www.googleapis.com/freebase/v1/topic" + id, function (r) {
                  var synopsis =
                     jsonPath(r, '$../common/document/text..value');

                  if (synopsis) {
                     that.setState({content: synopsis[0]})
                  }
               })
            }


         })


   },


   render: function () {
      return(
         <div className="uk-grid">
            <div className="uk-width-6-6">
               <p>{this.state.content}</p>
               <div className="uk-text-warning"><h5>Data provide by Freebase</h5></div>
            </div>
         </div>


         )
   }
});

//received props :   movie
var MovieCardC = React.createClass({
   render: function () {
      return(
         <div className="movieContainer uk-width-8-10 uk-container-center card-shadow">
            <div className="Bar_Movie_Card">
               <div className="uk-width-9-10 uk-container-center uk-article">
                  <div className="uk-grid">
                     <div className="uk-width-1-3">
                        <h2 className="uk-h3 ">title</h2>
                     </div>
                     <div className="uk-width-medium-2-3 uk-container-center centered-text">
                        <p className="fontTitles title">{this.props.movie}</p>
                     </div>

                  </div>
               </div>


            </div>

            <div className="uk-grid fixNew">
               <PosterC movie={this.props.movie}/>


               <div className="uk-width-4-6 description-col">

                  <SynopsisC movie={this.props.movie}/>


                  <h2 className="uk-h3">Valoration</h2>
                  <hr className="uk-article-divider"/>
                  <ValorationC movie={this.props.movie}/>
               </div>
            </div>

         </div>
         )
   }
});


module.exports = MovieCardC;