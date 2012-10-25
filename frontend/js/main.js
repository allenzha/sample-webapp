//Config for require.js
require.config({

  baseUrl: "js",    //base url were our scripts are

  //The main libs have some ugly paths we don't want to rewrite everytime we use them
  //so a pathmapping is done here:
  paths: {
      //from                to
      "jsonrpc":            "lib/jquery-jsonrpc/jquery-jsonrpc",
      "underscore":         "lib/underscore/underscore",
      "backbone":           "lib/backbone/backbone",
      "toolbox":            "lib/toolbox/toolbox",
      "mustache":           "lib/mustache/mustache",
      "stacktrace":         "lib/stacktrace/stacktrace-0.3"
  },
  waitSeconds: 5,               //timeout (for loading required modules)
  catchError: {define: true}    //show errors
});


//this is the first file to be started after requirejs loaded.
//We load and register the MainRouter and start backbones history
//handling.

require(["backbone", "jquery", "routers/main"], function(Backbone, $, MainRouter) {
    "use strict";


    //instanciate main router (it will register itself as default router, too)
    new MainRouter();

    //remove pageLoading dialog:
    $('#page-loading-container').remove();

    //start backbone history handling (MainRouter will be used)
    Backbone.history.start();


});
