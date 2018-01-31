# First layer - alexa skill handler service 

Next level of app is service hook that will receive json from Alexa service with all necessary data parsed already. All we need is to follow API, do necessary steps and respond with some text message (or not)
Other side if IoT message hub, which in my case Azure IoT Hub. Amazon own message hub is also an option. Reasons for me are
* It is free for my limits
* I want to see how apps from different providers will work together, sort of test how well my layers are isolated

Tutorial covering this part you can find in the same [YouTube] (https://www.youtube.com/watch?v=zt9WdE5kR6g) video, althouh API changed since then

To work with lambdas you will have to subscribe to that service. This implies provding valid credit card information to Amazon, althoug service itself is free within certain limits

Also since we are using dependencies that lambdas are not providing by default, I use [zip package method] (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html) to upload code to amazon

## IoT Hub

This service acts as 'service' in Azure terms, so connection string that you will peek should have service permissions. This is because we are firing Cloud-To-Device messages, where Device will speak to Mopidy service itself (and not accessible from public web.
To work with device channel it should be created first, device Id should be placed in config

please go to ../02-mopidy-device-control for more

## Setup 

1. Create config file, config-example.js could be your starting point. 
1. Create zip package by running create-zip.sh
1. Create lambda function using this package, set Alexa as trigger

## Example requests

For testing purposes I included example reqests nin the form that Alexa will send them to skill handler. You can set up test events within lambda function control panel to be able manually trigger certain events.
To generate those sample reqests yourself just go to skill control panel - test tab and put any phrase there - you will get json corresponding to that phrase.

## Links

* [Amazon lambda functions root](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions)
* [YouTube tutorial](https://www.youtube.com/watch?time_continue=39&v=zt9WdE5kR6g)
* [Alexa SDK Source and Reference](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
* [Azure IoT Hub API Reference](https://docs.microsoft.com/en-us/javascript/api/azure-iothub/registry?view=azure-iot-typescript-latest)
* [Azure IoT Hub service docs](https://github.com/Azure/azure-iot-sdk-node/tree/master/service)
* [Azure IoT Hub service invocation example and docs](https://github.com/Azure/azure-iot-sdk-node/blob/master/service/samples/device_method.js)
* [Azure IoT Hub device docs](https://github.com/Azure/azure-iot-sdk-node/tree/master/device)
* [Azure IoT Hub device subscribe example and docs](https://github.com/Azure/azure-iot-sdk-node/blob/master/device/samples/device_methods.js)

