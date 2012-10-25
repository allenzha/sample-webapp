
define(["backbone", "mustache", "jquery", "text!views/page/create.html", "models/page"], function(Backbone, Mustache, $, template, PageModel) {
    "use strict";

    return Backbone.View.extend({

        _fieldMapping: {
            'page-create-form-title': 'title',
            'page-create-form-description': 'description',
            'page-create-form-meta-description': 'metaDescription',
            'page-create-form-meta-keywords': 'metaKeywords',
            'page-create-form-content': 'content'
        },

        formElement: null,

        render: function() {
            var rendered = $(Mustache.render(template)),
            container = $('#page-container');

            container.html(rendered);

            this.formElement = container;

            container.find('.page-create-form').submit($.proxy(this.onCreateFormSubmitted, this));


            this.setElement(container);
        },

        onCreateFormSubmitted: function () {

            var page = new PageModel();

            var data = {};

            for (var a in this._fieldMapping) {
                if (! this._fieldMapping.hasOwnProperty(a)) {
                    continue;
                }

                data[this._fieldMapping[a]] = this.formElement.find('#'+a).val();
            }
            page.set(data);
            page.save($.proxy(this.onModelSaveSuccess, this), $.proxy(this.onModelSaveFailed, this));
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