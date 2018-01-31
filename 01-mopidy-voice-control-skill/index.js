/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
'use strict';

const Alexa = require('alexa-sdk');
const config = require('./config');
const intents = require('./intent-schema.json');
const APP_ID = config.appId;

var Client = require('azure-iothub').Client;
var client = Client.fromConnectionString(config.connectionString);

var handlers = {
    'Unhandled': function () {
        this.emit(':ask', 'sorry, i did not get that', "Could you repeat?");
    }
};

intents.intents.forEach(x => {
    console.log("* Adding handler for [", x.intent, "] method");
    handlers[x.intent] = fireDeviceMethodAndReply(x)
})

var getMethodParams = function (methodName, payload) {
    return {
        methodName: methodName, 
        payload: payload,
        responseTimeoutInSeconds: config.timeout
    };
};

var fireDeviceMethod = function (methodParams, successCallback, failCallback) {
    client.invokeDeviceMethod(config.targetDevice, methodParams, function (err, result) {
        if (err) {
          console.error('Failed to invoke method \'' + methodParams.methodName + '\': ' + err.message);
          if (failCallback)
            failCallback(err);
        } else {
          console.log(methodParams.methodName + ' on ' + config.targetDevice + ':');
          console.log(JSON.stringify(result, null, 2));
          if (successCallback)
            successCallback(result);
        }
    });
};

function fireDeviceMethodAndReply(intent) {
    return function() {
        var self = this;
        var payload = {};

        if (intent.slots) {
            intent.slots.forEach(x => {
                payload[x.name] = this.event.request.intent.slots[x.name].value;
            });
        }
        
        fireDeviceMethod(getMethodParams(intent.intent, payload), function (result) {
            var message = result.payload.message || 'OK';
            self.emit(':tell', message);
        }, function(err) {
            self.emit(':tell', 'Sorry, but we have an error');
        });
    };
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};