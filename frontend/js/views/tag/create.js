
define(["backbone", "mustache", "jquery", "text!views/tag/create.html", "models/tag"], function(Backbone, Mustache, $, template, TagModel) {
    "use strict";

    return Backbone.View.extend({

        _fieldMapping: {
            'tag-create-form-title': 'title',
            'tag-create-form-description': 'description',
            'tag-create-form-slug': 'slug'
        },

        formElement: null,

        render: function() {
            var rendered = $(Mustache.render(template)),
            container = $('#page-container');

            container.html(rendered);

            this.formElement = container;

            container.find('.tag-create-form').submit($.proxy(this.onCreateFormSubmitted, this));


            this.setElement(container);
        },

        onCreateFormSubmitted: function () {

            var tag = new TagModel();

            var data = {};

            for (var a in this._fieldMapping) {
                if (! this._fieldMapping.hasOwnProperty(a)) {
                    continue;
                }

                data[this._fieldMapping[a]] = this.formElement.find('#'+a).val();
            }
            tag.set(data);
            tag.save($.proxy(this.onModelSaveSuccess, this), $.proxy(this.onModelSaveFailed, this));
        },

        onModelSaveSuccess: function(response) {
            alert("model saved!");
            console.log(response);

            //reset view:
            this.render();
        },

        onModelSaveFailed: function(response) {
            alert("failed to save model :(");
            console.log(response);
        }

    });
});