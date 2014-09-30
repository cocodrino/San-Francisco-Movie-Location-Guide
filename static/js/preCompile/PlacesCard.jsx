var React = require('react');

//EXCESIVE NESTED DATA...NEED REFACTOR

var DescriptionC = React.createClass({
   render: function () {
      var description = (this.props.path) ?
         <div>{ jsonPath(this.props.path, '$../common/topic/description..value')}</div>
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
      var images = <div>I can't find any image sorry</div>;
      if (images_ID) {
         images = images_ID.map(function (img_id) {
            return <img src={"https://usercontent.googleapis.com/freebase/v1/image" + img_id + "?maxwidth=300&maxheight=300&mode=fillcropmid" }/>
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
      var render = website ? <a href={website[0]}>Official Page</a> : <div>Not website found....</div>;

      return(
         <div>
       {render}
         </div>

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
               <div>
                  <DescriptionC path={this.state.properties}/>
                  <ImagesC path={this.state.properties}/>
                  <WebsiteC path={this.state.properties}/>
                  <UbicationC path={this.state.properties}/>
               </div>
               :
               <div></div>
         ;

      return(
         <div>
           {dataFreebase}

         </div>
         )
   }
});

var PlacesCard = React.createClass({
   render: function () {
      var originData = DATA_SPECIFIC[this.props.movie]["sfdata"];
      var places = originData.map(function (p) {
         return p["location"]
      });


      var _places = places.map(function (name) {
         return <PlaceCard location={name}/>
      });

      return(
         <div>{_places}</div>
         )
   }
});

module.exports = PlacesCard