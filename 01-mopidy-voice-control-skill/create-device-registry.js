/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
'use strict';

var iothub = require('azure-iothub');
const config = require('./config');

var registry = iothub.Registry.fromConnectionString(config.registryConnectionString);

var device = {
    deviceId: config.targetDevice
};

registry.create(device, function(err, deviceInfo, res) {
    if (err) 
        console.log('error: ' + err.toString());
    if (res) 
        console.log('status: ' + res.statusCode + ' ' + res.statusMessage);
    if (deviceInfo) 
        console.log('device info: ' + JSON.stringify(deviceInfo));
});