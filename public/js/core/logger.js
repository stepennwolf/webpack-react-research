var noop    = function() {},
    console = global.console || {};

try {
    if (Function.prototype.bind && typeof console === "object") {
        var logFns = ["log", "warn", "error"];
        for (var i = 0; i < logFns.length; i++) {
            console[logFns[i]] = Function.prototype.call.bind(console[logFns[i]], console);
        }
    }
} catch(e) {}

/**
 *
 * @param name
 * @returns {Logger}
 * @constructor
 */
function Logger(name) {
    this.name   = name;
    this._log   = noop;
    this._warn  = noop;
    this._error = noop;
    this._enabled = false;
    return this;
}

Logger.prototype = {
    constructor: Logger,

    isEnabled: function(){
        return this._enabled;
    },

    setName: function(name){
        this.name = name;
    },

    enable: function() {
        this._log     = (console.log   || noop);
        this._warn    = (console.warn  || this._log);
        this._error   = (console.error || this._log);
        this._enabled = true;

        return this;
    },

    write: function(output, args){
        var parameters = Array.prototype.slice.call(args);
        parameters.unshift(this.name + ": ");
        output.apply(console, parameters);
    },

    log: function() {
        this.write(this._log, arguments);
    },

    warn: function() {
        this.write(this._warn, arguments);
    },

    error: function() {
        this.write(this._error, arguments);
    },

    groupStart: function(){
        if ( typeof console === "object" && console.group ){
            console.group();
        }
    },

    groupEnd: function(){
        if ( typeof console === "object" && console.groupEnd ){
            console.groupEnd();
        }
    }
};

module.exports = Logger;
