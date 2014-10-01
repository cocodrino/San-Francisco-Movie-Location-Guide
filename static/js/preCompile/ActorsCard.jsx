var React = require("react");


var Fm = require('./FormatNames');

var ActorCard = React.createClass({


  render: function() {
     var url_img = "https://usercontent.googleapis.com/freebase/v1/image/en/"
        + Fm.toHtml( this.props.name )+ "?maxwidth=120&maxheight=120&mode=fillcropmid";

    return(
         <div className="uk-width-1-3">
            <h3>{this.props.name}</h3>
            <img src={url_img}/>

         </div>
    )
  }
});

var ActorsCard = React.createClass({
  render: function() {
     var originData = DATA_SPECIFIC[this.props.movie]["sfdata"];
     var actors = _.union(originData.map(function (ob) {
        return [ob["actor1"], ob["actor2"], ob["actor3"]]
     }));

     var actorsElem = _.unique(_.flatten(actors))
        .filter(function(x){return x.length>0})
        .map(function (_name) {
        return <ActorCard name={_name}/>
     });

    return(

       <div className="movieContainer uk-width-8-10 uk-container-center uk-panel-box subCat">
          <div className="Sub-panel">
             <div className="uk-width-9-10 uk-container-center uk-article">
                <div className="uk-grid">
                   <div className="uk-width-3-3">
                      <h2 className="uk-h3 " data-uk-tooltip title="Only show actors who filmed in San Francisco">CASTING * : </h2>

                      <hr class="uk-article-divider"/>

                   </div>
                   {actorsElem}

                </div>
             </div>


          </div>

          <hr className="uk-article-divider"/>

       </div>


    )
  }
});

module.exports = ActorsCard