# Second layer - mopidy adapter

This layer lives inside of my home network and have no direct access from internet, that is actually the reason I need this layer.
App will subscribe to IoT Hub device channel and listen to certain events, and call to Mopidy REST service directly.

Just as other layers I reuse intent-schema.json to load all the intents from it.

## Setup 

TBD

## Links

* [Alexa SDK Source and Reference](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
* [Azure IoT Hub API Reference](https://docs.microsoft.com/en-us/javascript/api/azure-iothub/registry?view=azure-iot-typescript-latest)
* [Azure IoT Hub device docs](https://github.com/Azure/azure-iot-sdk-node/tree/master/device)
* [Azure IoT Hub device subscribe example and docs](https://github.com/Azure/azure-iot-sdk-node/blob/master/device/samples/device_methods.js)
* [Mopidy API Reference](https://docs.mopidy.com/en/latest/api/http/)