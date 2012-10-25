
define(["backbone", "services/debug" ,"controllers"], function(Backbone, DebugService, controllers) {
    "use strict";

    /**
     * Initialize router/controllers
     */
    return Backbone.Router.extend({

        initialize: function(options) {
            this.route(/^([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)(\/.*)?$/, "controller");
        },

        defaultRoute: function( actions ) {

            this.login();

        },

        login: function() {
            require(["services/auth"], function(AuthService){
                AuthService.ensureLogin();
            });
        },

        controller: function(controller, action, params) {

            if (typeof controllers[controller] === "undefined") {
                DebugService.error("Controller not found!", "The controller "+controller+" is not defined but called!");
                return;
            }
            var controllerObject = new controllers[controller](params);

            action = action + "Action";

            if (controllerObject[action]) {
                controllerObject[action](params);
            } else {
                DebugService.error("Controller action not found!", "The action "+action +" is not available on '"+controller+"'!");
            }
        },

        rpcTest: function(action) {
            this.login();
            require(["jsonrpc"], function(jsonrpc) {
                jsonrpc.setup({
                          endPoint: '/backend/index.php',
                          namespace: ''
                        });

                        jsonrpc.request('activity.testMethod', {
                            params: {authToken: "123"},
                            success: function(result) {
                                alert("Answer received!");
                                console.dir(result);
                            },
                            error: function(result) {
                                alert("Error received");
                                console.dir(result);
                            }
                        });

            });
        }
    });
});