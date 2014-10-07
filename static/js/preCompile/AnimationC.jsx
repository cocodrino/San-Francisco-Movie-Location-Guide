var React = require('react');


var AnimationC = React.createClass({
   elements : null,

    componentWillMount : function(){
       if(this.props.onElement) this.elements = this.props.onElement;
       else{
          this.elements = this.props.children;
       }
      $(this.elements).css("display","none");


    },
    componentDidMount : function(){
       $(this.elements).css("display", "none");
       $( this.elements ).velocity("transition."+this.props.transitionT, this.props.transitionP );
    },

    render : function(){
       return (
          <p>
          {this.props.children}
          </p>
          );
    }
});


module.exports = AnimationC;
