var React = require('React');

//this component is the central element in the detail page, this handle the MainCard,Casting and Location Cards
var MainMovieDetailC = React.createClass({
  render: function() {
    return(
       <div>
          <MovieCard movie={this.props.movie}/>
          <Casting movie={this.props.movie}/>

       </div>
    )
  }
});

module.exports = MainMovieDetailC