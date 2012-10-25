
define(["backbone", "services/rpc"], function(Backbone, rpc){
    return Backbone.Model.extend({

        defaults: {
            'pageId': 0,
            'title': 'no title',
            'description': 'no description',
            'metaDescription': 'no meta-description',
            'metaKeywords': 'no meta-keywords',
            'content': 'no content'
        },

        initialize: function(){
            //construct a new page
        },

        save: function (successCallback, failCallback) {
            rpc.request('page.save', {page:this.toJSON()}, successCallback, failCallback);
        }
    });
});
