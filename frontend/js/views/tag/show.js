
define(["backbone", "mustache", "jquery", "text!views/tag/show.html"], function(Backbone, Mustache, $, template) {
    "use strict";

    return Backbone.View.extend({

        tagData: {},
        render: function() {
            var rendered = Mustache.render(template, this.tagData),
            container = $('#page-container');

            container.html(rendered);
            this.setElement(container);
        },

        setTagData: function(tagData) {
            this.tagData = tagData;
        }

    });
});