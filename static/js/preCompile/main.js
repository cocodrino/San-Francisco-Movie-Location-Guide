

var React = require("react");

/*var view = require('./view.jsx'); // need to specify the jsx extension

var route = require('./NavBar.jsx');*/

/*var page = require('./Page.jsx');*/

var router = require('./MainContentC.jsx');
var router2 = require('./RouterC.jsx');

React.renderComponent(router2, document.getElementById('content'));


/*
var geo = require('./Geo');
$(document).ready(function () {


   geo(function (obj) {
      alert(obj);
      console.info(obj);
   });
});*/





