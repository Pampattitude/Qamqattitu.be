'use strict';

var colorsLib =  require('colors');
var winstonLib = require('winston');

var utilsLib = require(__dirname + '/utils');


var processArguments_ = function(args) {
    for (var i = 0 ; args.length > i ; ++i) {
        if (args[i]) {
            if (args[i].constructor == Error)
                args[i] = args[i].stack;
            else if (args[i].constructor == Object ||
                args[i].constructor == Array) {
                if (({}).hasOwnProperty.call(args[i], 'toString'))
                    args[i] = args[i].toString();
                else
                    args[i] = JSON.stringify(args[i]);
            }
            else if (({}).hasOwnProperty.call(args[i], 'toString'))
                args[i] = args[i].toString();
        }
    }
    return args;
};

var log = function() {
    var args = processArguments_(arguments);
    return winstonLib.info(' ' + (global.processId ? global.processId + ', ' : '') + utilsLib.traceCaller(1) + ': ' + Array.prototype.slice.call(args).join(' '));
};

var info = function() {
    var args = processArguments_(arguments);
    return winstonLib.info(' ' + (global.processId ? global.processId + ', ' : '') + utilsLib.traceCaller(1) + ': ' + Array.prototype.slice.call(args).join(' '));
};

var debug = function() {
    var args = processArguments_(arguments);
    return winstonLib.debug((global.processId ? global.processId + ', ' : '') + utilsLib.traceCaller(1) + ': ' + Array.prototype.slice.call(args).join(' '));
};

var warn = function() {
    var args = processArguments_(arguments);
    return winstonLib.warn(' ' + (global.processId ? global.processId + ', ' : '') + utilsLib.traceCaller(1) + ': ' + Array.prototype.slice.call(args).join(' '));
};

var error = function() {
    var args = processArguments_(arguments);
    return winstonLib.error((global.processId ? global.processId + ', ' : '') + utilsLib.traceCaller(1) + ': ' + Array.prototype.slice.call(args).join(' '));
};

var zalgo = function() {
    var args = processArguments_(arguments);
    return console.log(new Date().toString() + ' - ' + 'zalgo'.zalgo + ': ' + (global.processId ? global.processId + ', ' : '') + utilsLib.traceCaller(1) + ': ' + Array.prototype.slice.call(args).join(' ').zalgo);
};

exports.log =   log;
exports.info =  info;
exports.debug = debug;
exports.warn =  warn;
exports.error = error;
exports.zalgo = zalgo;

winstonLib.remove(winstonLib.transports.Console);
winstonLib.add(winstonLib.transports.Console, {level: 'silly', prettyPrint: true, colorize: true, timestamp: true});
