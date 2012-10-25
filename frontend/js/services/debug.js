/**
 * This helper is responsible for several debugging purposes. It creates a debugpanel
 * which will show notices, warnings, errors and some debug information for the current
 * process. Later on it is planned to be able to save the messages to local storage and
 * submit them to the server automatically or on will.
 *
 * @author Johannes Brosi <mail@jbrosi.de>
 */
define(
    ["toolbox",
     "jquery",
     "mustache",
     "stacktrace",
     "text!views/debug/panel.html",
     "text!views/debug/error-message.html"
    ],
    function(
        Toolbox,
        $,
        Mustache,
        StackTrace,
        DebugPanelView,
        ErrorMessageTemplate){

    "use strict";
    var DebugService = Toolbox.Base.extend({

        /**
         * Available message types
         */
        messageTypes: {
            backendError: {
                name: 'backendError',
                shortName: 'BE',
                count: 0
            },
            error: {
                name: 'error',
                shortName: 'E',
                count: 0
            },
            warning: {
                name: 'warning',
                shortName: 'W',
                count: 0
            },
            notice: {
                name: 'notice',
                shortName: 'N',
                count: 0
            },
            debug: {
                name: 'debug',
                shortName: 'D',
                count: 0
            }
        },


        /**
         * The jquery-div holding the debugpanel
         */
        panel: null,

        /**
         * the jquery-div holding the menubar
         */
        menu: null,

        /**
         * the jquery-div holding the messages itself
         */
        content: null,

        /**
         * holds the timeout for new errors added
         */
        errorAddedTimeout: 0,

        /**
         * Logs a debugmessage
         *
         * @param title the title of the message shown in the message grid (required)
         * @param details the details of the message (optional)
         * @param code the error-/debugcode (optional)
         */
        debug: function(title, details, code) {
            this._logMessage({title: title, details: details, code: code}, 'debug');
        },

        /**
         * Logs a warning message
         *
         * @param title the title shown in the messages grid (required)
         * @param details the details for this message (optional)
         * @param code the error-/debugcode (optional)
         */
        warning: function(title, details, code) {
            this._logMessage({title: title, details: details, code: code}, 'warning');
        },

        /**
         * Logs an error message
         *
         * @param title the title shown in the grid (required)
         * @param details the details for this message (optional)
         * @param code the errorcode of this message (optional)
         */
        error: function(title, details, code) {
            this._logMessage({title: title, details: details, code: code}, 'error');
        },

        /**
         * Logs a notice message
         *
         * @param title the title of the message shown in the grid (required)
         * @param details the details of this message (optional)
         * @param code the error-/debugcode (optional)
         */
        notice: function(title, details, code) {
            this._logMessage({title: title, details: details}, 'notice');
        },

        /**
         * Internal method for logging messages
         *
         * @param message the message to be shown
         * @param type the messagetype (one of this.messageTypes)
         * @private
         */
        _logMessage: function (message, type) {
            if (typeof this.messageTypes[type] === "undefined") {
                this._logMessage({title:'tried to log message of undefined type!', details: 'type was "'+type+'"'}, 'warning');
                return;
            }

            var messageType = this.messageTypes[type];
            messageType.count++;

            this.menu.find('.error-counter .'+messageType.name+' .num').html(messageType.count);
            this.triggerMenuBarHighlight();

            if (typeof(message) !== 'object') {
                message = {
                    title: message
                };
            }
            if (typeof(message.details) === 'undefined') {
                message.details = 'no details given';
            }

            //add js stack trace for errors and warnings (if they have not set their trace yet):
            if ((type === "warning" || type === "error") && typeof(message.trace) === "undefined") {
                var lines = String(StackTrace()).split(/,/);
//                for (var line in lines) {
//                  //TODO: modify lines here (color, add link, ...)
//                }
                message.trace = lines.join('<br/>');
            }
            message.type = type;

            this._addContentMessage(message);
        },


        /**
         * Logs a backend error
         *
         * @param data the full errorobject received from remote
         */
        backendError: function(data) {

            var errorTrace = 'no trace given';
            if (typeof(data.error.trace) !== "undefined" ) {
                var lines = data.error.trace.split('\n');
//            for (var line in lines) {
//                //TODO: modify lines here (color, add Link, ...)
//            }
                errorTrace = lines.join('<br/>');
            }

            var message = {
                title: 'Backend Error \''+data.error.code+' - '+data.error.message+'\' occurred!',
                details: "The error happened in "+data.error.file+" line "+data.error.line+"<br/>Message: "+data.error.message,
                code: data.error.code,
                trace: errorTrace
            };

            this._logMessage(message, 'backendError');

        },

        /**
         * Adds a prepared message to the debugmessage grid
         * @param message the message to be shown
         * @private
         */
        _addContentMessage: function(message) {

            if (typeof(message.time === "undefined")) {
                message.time = new Date().toLocaleTimeString();
            }

            var errorMessage = $(Mustache.render(ErrorMessageTemplate, message));

            errorMessage.find('.button-show-details').click(function() {
                $(this).parents('.debugpanel-message').find('.details').slideToggle();
            });
            errorMessage.find('.button-show-trace').click(function() {
                $(this).parents('.debugpanel-message').find('.trace').slideToggle();
            });

            this.content.prepend(errorMessage);
        },
        triggerMenuBarHighlight: function() {
            this.menu.addClass("errorAdded");
            if (this.errorAddedTimeout) {
                clearTimeout(this.errorAddedTimeout);
            }
            this.errorAddedTimeout = setTimeout($.proxy(function(){this.menu.removeClass("errorAdded");}, this), 1000);
        },
        initialize: function() {





            var errorTypes = [];

            for (var item in this.messageTypes) {
                if (this.messageTypes.hasOwnProperty(item)) {
                    errorTypes.push(this.messageTypes[item]);
                }
            }

            var templateVars = {
                errorTypes: errorTypes
            };

            $('body').append(Mustache.render(DebugPanelView, templateVars));
            this.panel = $('#debugPanel');

            this.menu = $('#debugPanel .debugMenu');

            this.content = $('#debugPanel .debugContent');
            this.content.hide();

            this.menu.click($.proxy(this._onMenuBarClicked, this));

        },

        /**
         * Internal eventhandler for the click event on the menubar.
         *
         * @private
         */
        _onMenuBarClicked: function() {
            this.content.slideToggle();
            this.menu.toggleClass("expanded");
        }
    });

    var debugService = new DebugService();
    debugService.initialize();
    return debugService;

});