# Second layer - mopidy adapter

This layer lives inside of my home network and have no direct access from internet, that is actually the reason I need this layer.
App will subscribe to IoT Hub device channel and listen to certain events, and call to Mopidy REST service directly.

Just as other layers I reuse intent-schema.json to load all the intents from it.

## Setup 

### Docker

Service runs in docker (like everything else does)
Two dockerfiles available: x86-64 and armhf, both tested on debian/ubuntu

1. Create service file in /etc/systemd/system from [mopidy-device-control.service](systemd/mopidy-device-control.service) file (just copy content)
1. Adjust environment variables, change image architecture to x86_64 if you need to
1. Execute in terminal
```
 sudo systemctl daemon-reload
 sudo systemctl start mopidy-device-control.service
```
this will take some time, since image should be pulled first
```            
 sudo systemctl enable mopidy-device-control.service
```
to start service by default

### Nodejs

OR you can run this from node directly

From [www](www) folder
1. Create config file, config-example.js should be your starting point. 
1. Start service by running
` npm install`
` npm start`

## Links

* [Alexa SDK Source and Reference](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
* [Azure IoT Hub API Reference](https://docs.microsoft.com/en-us/javascript/api/azure-iothub/registry?view=azure-iot-typescript-latest)
* [Azure IoT Hub device docs](https://github.com/Azure/azure-iot-sdk-node/tree/master/device)
* [Azure IoT Hub device subscribe example and docs](https://github.com/Azure/azure-iot-sdk-node/blob/master/device/samples/device_methods.js)
* [Mopidy API Reference](https://docs.mopidy.com/en/latest/api/http/)

## Screenshots

![Running service](https://raw.githubusercontent.com/anabolyc/alexa-mopidy-voice-control/master/screenshots/22-docker-service-running.png)