define(
    [
     "jquery",
     "mustache",
     "toolbox",
     "services/theme"
    ],
    function(
        $,
        Mustache,
        Toolbox,
        ThemeService
        ){
        "use strict";

        var GlobalPageLayout = Toolbox.Base.extend({

            initialize: function() {
                //fetch templates and stuff and prepare
            },
            render: function() {
                //renders the pageLayout in the current theme style


                //first check regions:




            }
        });

        var gpl = new GlobalPageLayout();
        gpl.initialize();

        return gpl;
    }

);

