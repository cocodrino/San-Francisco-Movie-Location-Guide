var React = require('react');
var MovieCard = require('./MovieCardC.jsx');
var ActorCard = require('./ActorsCard.jsx');
//this component is the central element in the detail page, this handle the MainCard,Casting and Location Cards
var PlacesCard = require('./PlacesCard.jsx');

var MainMovieDetailC = React.createClass({
  render: function() {

    return(
       <div>
          <MovieCard movie={this.props.params.movie}/>
          <ActorCard movie={this.props.params.movie}/>
          <PlacesCard movie={this.props.params.movie}/>
       </div>
    )
  }
});

module.exports = MainMovieDetailC