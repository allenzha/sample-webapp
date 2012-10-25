//Buildfile to use when building productive release of this project.
//Use "build.sh" in order to run node with this buildfile or directly
//invoke "node r.js -o js/app.build.js".

({
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    //optimize: "none",

    //name of our build
    name: "main",

    //js - file to create (comment out to create multiple js files)
    //out: "../build/main-built.js",

    //pathmappings for the libraries
    paths: {
        //from          to
        "jquery":       "lib/jquery/require-jquery",
        "jsonrpc":      "lib/jquery-jsonrpc/jquery-jsonrpc",
        "underscore":   "lib/underscore/underscore",
        "backbone":     "lib/backbone/backbone",
        "toolbox":      "lib/toolbox/toolbox",
        "mustache":     "lib/mustache/mustache",
        "stacktrace":   "lib/stacktrace/stacktrace-0.3"
    }

})
