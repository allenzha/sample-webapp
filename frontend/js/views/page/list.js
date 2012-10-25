
define(["backbone", "mustache", "jquery", "text!views/page/list.html"], function(Backbone, Mustache, $, template) {
    "use strict";

    return Backbone.View.extend({

        data: {
            list: []
        },

        render: function() {
            var rendered = Mustache.render(template, this.data),
                container = $('#page-container');

            container.html(rendered);
            this.setElement(container);
        },

        setListData: function(listData) {
            this.data.list = listData;
        }

    });
});