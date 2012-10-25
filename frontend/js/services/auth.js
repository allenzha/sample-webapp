
define(["toolbox", "backbone"], function(Toolbox, Backbone){
    "use strict";
    var AuthService = Toolbox.Base.extend({
        ensureLogin: function() {
            //ensure we're logged in, show LoginForm if we're not
            Backbone.history.navigate("#user/login", true);

        }
    });


    return new AuthService();
});