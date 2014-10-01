var React = require('react');

//EXCESIVE NESTED DATA...NEED REFACTOR

var DescriptionC = React.createClass({
   render: function () {
      var description = (this.props.path) ?
         <p>
            <dt>Details</dt>
            <dd>{ jsonPath(this.props.path, '$../common/topic/description..value')}</dd>
         </p>
         :
         <div></div>;

      return(
         <div>{description}</div>
         )
   }
});


var ImagesC = React.createClass({
   render: function () {
      var images_ID = jsonPath(this.props.path, '$../common/topic/image..values..id');
      var images = <div className="uk-text-danger">
         <h5>I can't find any image sorry</h5>
      </div>;
      if (images_ID) {
         images = images_ID.map(function (img_id) {
            return(
               <p>
                  <dt>Photo:</dt>
                  <dd>
                     <img src={"https://usercontent.googleapis.com/freebase/v1/image" + img_id + "?maxwidth=300&maxheight=300&mode=fillcropmid" }/>
                  </dd>
               </p>)
         });
      }


      return(
         <div>
       {images}
         </div>
         )
   }
});

var WebsiteC = React.createClass({
   render: function () {
      var website = jsonPath(this.props.path, '$../common/topic/official_website..text');
      var render = website ? <a href={website[0]}>Official Page</a> : <div className="uk-text-danger">Not website found....</div>;

      return(
         <p>
            <dt>Official WebSite</dt>
            <dd>{render}</dd>
         </p>

         )
   }
});

var UbicationC = React.createClass({
   render: function () {
      var place = jsonPath(this.props.path, '$../organization/organization/headquarters..text');
      var render = place ? <div>Ubication: {place}</div> : <div></div>;
      return(
         <div>
    {render}
         </div>
         )
   }
});


//mental note...don't use again the tomato rotten api...sucks!
var PlaceCard = React.createClass({


   getInitialState: function () {
      return {properties: null}


   },

   componentDidMount: function () {
      var that = this; //because that is better than it :D


      $.getJSON("https://www.googleapis.com/freebase/v1/search?query=" + encodeURIComponent(this.props.location.toLowerCase()),
         function (response) {
            var responseFB = response.result;

            if (response.result[0] && (responseFB[0]["id"] || responseFB[0]["mid"])) {
               var id = responseFB[0]["id"] || responseFB[0]["mid"];

               $.getJSON("https://www.googleapis.com/freebase/v1/topic" + id, function (r) {
                  that.setState({properties: r.property})
               })
            }


         })


   },


   render: function () {
      var dataFreebase =
            this.state.properties ?
               <dl className="uk-description-list-horizontal">
                  <DescriptionC path={this.state.properties}/>
                  <ImagesC path={this.state.properties}/>
                  <WebsiteC path={this.state.properties}/>
                  <UbicationC path={this.state.properties}/>
               </dl>
               :
               <dl></dl>
         ;

      return(

         <div className="movieContainer uk-width-8-10 uk-container-center subCat uk-panel-box ">
            <div className="Sub-panel">
               <div className="uk-width-9-10 uk-container-center uk-article">
                  <div className="uk-grid">
                     <div className="uk-width-3-3">
                        <h2 className="uk-h3 ">{this.props.location}</h2>
                        <p></p>
                        <hr class="uk-article-divider"/>
                     </div>
                        {dataFreebase}

                  </div>
               </div>


            </div>

            <hr className="uk-article-divider"/>

         </div>




         )
   }
});

var PlacesCard = React.createClass({
   render: function () {
      var originData = DATA_SPECIFIC[this.props.movie]["sfdata"];
      var places = originData.map(function (p) {
         return [p["location"], p["coordinates"]];
      });


      var _places = places.map(function (ar) {
         return <PlaceCard location={ar[0]} coordinates={ar[1]}/>
      });

      return(
         <div>{_places}</div>
         )
   }
});

module.exports = PlacesCard