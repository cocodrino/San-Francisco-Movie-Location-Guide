//only a small helper for format string to html valid or human readables

var FormatNames = {
   toHtml: function (string) {
      return string.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, "_")
   },

   toHumanReadable: function (string) {
      //
   }

};

module.exports = FormatNames;
