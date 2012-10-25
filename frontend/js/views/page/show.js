
define(["backbone", "mustache", "jquery", "text!views/page/show.html"], function(Backbone, Mustache, $, template) {
    "use strict";

    return Backbone.View.extend({

        pageData: {},
        render: function() {
            var rendered = Mustache.render(template, this.pageData),
            container = $('#page-container');

            container.html(rendered);
            this.setElement(container);
        },

        setPageData: function(pageData) {
            this.pageData = pageData;
        }

    });
});