
define(["backbone", "services/rpc"], function(Backbone, rpc){
    return Backbone.Model.extend({

        defaults: {
            'tagId': 0,
            'title': 'no title',
            'description': 'no description',
            'slug': 'no slug'
        },

        initialize: function(){
            //construct a new page
        },

        save: function (successCallback, failCallback) {
            rpc.request('tag.save', {page:this.toJSON()}, successCallback, failCallback);
        }
    });
});
