
define(["backbone", "mustache", "jquery", "text!views/user/login.html"], function(Backbone, Mustache, $, template) {
    "use strict";

    return Backbone.View.extend({

        render: function() {
            var rendered = Mustache.render(template ,{user: "User", pass: "Pass"}),
                container = $('#page-container');

            container.html(rendered);
            this.setElement(container);
        }

    });
});