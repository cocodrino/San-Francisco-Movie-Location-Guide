var React = require("react");
var data = require("./../dataSample");
var getLocation = require("./Geo");

var PageComponent = React.createClass({
   getInitialState: function () {
      getLocation(function (objResponse) {
         return(objResponse)
      })
   },

   render: function() {
      return(
         <div>Hola</div>
         )
   }
});

module.exports = PageComponent;