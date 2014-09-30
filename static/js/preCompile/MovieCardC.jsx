var React = require('React');

//received props :   movie
var PosterC = React.createClass({
   render: function () {
      var posterURL = _.filter(data, {"name": this.props.movie})["Poster"];
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
               <h3>v[0]</h3>
               <h5>v[1]</h5>
            </div>
         });

      return(
         <div>
            <img src={posterURL} />
            <detailElement/>

         </div>
         )
   }
});

//received props :   also movie
var ValorationC = React.createClass({
   render: function () {
      var originData = DATA_SPECIFIC[this.props.movie]["tomatodata"]["rating"];

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
         <div>
        {ratingElement}
         </div>
         )
   }
});


//received props :   movie
var MovieCardC = React.createClass({
   render: function () {
      return(
         <div>
            <h5>Title : {this.props.movie}</h5>
            <h4>{DATA_SPECIFIC[this.props.movie]}</h4>
            <ValorationC movie={this.props.movie}/>
            <PosterC movie={this.props.movie}/>
         </div>
         )
   }
});