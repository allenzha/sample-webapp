
define(["toolbox", "services/rpc", "jquery"], function(Toolbox, rpc, jQuery){
    return Toolbox.Base.extend({

        _tagId: 0,
        _lastRequest: 0,
        _that: this,

        _parseTagParams: function(params) {
            var parts = params.split("/");
            this._tagId = parseInt(parts[1]);
        },

        createAction: function(params) {
            require(["views/tag/create"], function(View) {
                var view = new View();
                view.render(params);
            });
        },

        showAction: function(params) {

            //extract param
            this._parseTagParams(params);
            console.log(this._tagId);

            if (this._tagId) {

                this._lastRequest = rpc.request(
                    'tag.get',
                    {tagId: this._tagId},
                    this.onPageLoadingFinished,
                    this.onPageLoadingFailed
                );

                //- show page Loading dialog/overlay
                //- (later: see if we've a client copy of that page cached already)
                //- try to fetch page data from backend
                //- render page data to hidden container
                //- switch page-loading dialog with hidden container
            } else {
                //show page not found
            }

        },

        onPageLoadingFinished: function(data) {
            require(["views/tag/show"], function(View) {
                var view = new View();
                view.setTagData(data.result);
                view.render();
                console.log("finished loading with "+data);
                console.log(data);

            });
        },

        onPageLoadingFailed: function(data) {
            console.log("error loading with ");
            console.log(data);
        }
    });
});