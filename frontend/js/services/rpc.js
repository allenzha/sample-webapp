
define(["toolbox", "jsonrpc", "services/debug"], function(Toolbox, jsonrpc, debugService){
    "use strict";
    var RpcService = Toolbox.Base.extend({

        _jsonrpc:  jsonrpc,

        _requestCounter: 0,

        initialize: function () {
            this._jsonrpc.setup({
                endPoint: '/backend/index.php',
                namespace: ''
            });
        },

        request: function(method, params, successCallback, errorCallback) {


            //TODO: add this in a more generic way...
            //TODO: rethink: do we need a token for *all* requests?
            //TODO: alternative: use cookie instead?
            //params.authToken = '123';

            this._jsonrpc.request(method, {
                params: params,
                success: successCallback,
                error: function(data) {
                    errorCallback(data);
                    debugService.backendError(data);
                }
            });

            return this._requestCounter++;
        },

        isCurrentRequest: function(requestNum) {
            return this._requestCounter == requestNum;
        },

        getCurrentRequestCount: function() {
            return this._requestCounter;
        }
    });

    var rpcService = new RpcService();
    rpcService.initialize();

    return rpcService;
});