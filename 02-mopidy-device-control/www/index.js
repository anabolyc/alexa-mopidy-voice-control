/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
'use strict';

const config = require('./config');
const mopidy = require('./mopidy');
const answers = require('./answers');

var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;

var client = null;

(function () {
    client = Client.fromConnectionString(config.connectionString, Protocol);
    client.open(function (err) {
        if(!!err) {
            console.error('Could not connect: ' + err.message);
        } else {
            console.log('Connected to device. Registering handlers for methods:');
            mopidy.actions.forEach(x => {
                console.log("*", x.name);
                client.onDeviceMethod(x.name, getActionHandler(x));
            });
            console.log("Ready");
        }
    });
})();

var getActionHandler = function(action) {
    return function (request, response) {
        printDeviceMethodRequest(request);
    
        var actions = mopidy.actions.filter((x) => { return x.name === action.name });
    
        if (actions.length == 0) {
            doResponse(request, response, {
                message: answers.getNegativeResponse()
            });
        } else {
            var thisAction = actions.pop();
            mopidy.requestPromise(thisAction, request.payload).then((res) => {
                console.log("MOPIDY:", res.data);
                var message = res.data.error ? answers.getNegativeResponse() : answers.getPositiveResponse();
                doResponse(request, response, {
                    message: message
                });
            }).catch((error) => {
                console.error("MOPIDY:", error);
                doResponse(request, response, {
                    message: answers.getNegativeResponse()
                });
            });
        }
    }
};

var doResponse = function(request, response, payload) {
    console.log("REPLY:", payload.message);
    response.send(200, payload, function(err) {
        if(!!err) {
            console.error('An error ocurred when sending a method response:\n' +
                err.toString());
        } else {
            console.log('Response to method \'' + request.methodName +
                '\' sent successfully.' );
        }
    });
};

var printDeviceMethodRequest = function(request) {
    console.log('Received method call for method \'' + request.methodName + '\'');
    //if(!!(request.payload)) {
    //    console.log('Payload:\n' + request.payload);
    //}
};