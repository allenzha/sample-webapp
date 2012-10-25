
define(["toolbox", "services/rpc", "jquery"], function(Toolbox, rpc, jQuery){
    return Toolbox.Base.extend({

        _pageId: 0,
        _lastRequest: 0,
        _that: this,

        _parseTagParams: function(params) {
            var parts = params.split("/");
            this._pageId = parseInt(parts[1]);
        },

        createAction: function(params) {
            require(["views/page/create"], function(View) {
                var view = new View();
                view.render(params);
            });
        },

        listAction: function(params) {
            this._lastRequest = rpc.request(
                'page.getList',
                {limit: 10, start: 0},
                this.onListLoadingFinished,
                this.onListLoadingFailed
            );

        },
        showAction: function(params) {

            //extract param
            this._parseTagParams(params);

            if (this._pageId) {

                this._lastRequest = rpc.request(
                    'page.get',
                    {pageId: this._pageId, isPreview: false},
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

        onListLoadingFinished: function(data) {
            require(["views/page/list"], function(View) {
                var view = new View();
                view.setListData(data.result);
                view.render();
                console.log("finished loading list with "+data);
                console.log(data);

            });
        },
        onListLoadingFailed: function(data) {
            console.log("error loading with ");
            console.log(data);
        },
        onPageLoadingFinished: function(data) {
            require(["views/page/show"], function(View) {
                var view = new View();
                view.setPageData(data.result);
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