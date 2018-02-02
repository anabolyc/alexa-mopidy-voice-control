# alexa-mopidy-voice-control

Remotely control [Mopidy](https://www.mopidy.com/) media service using Amazon Alexa

## Motivation

* Want to control my home media center via Amazon Alexa voice control
    * Control playback
    * Change tracks
    * Change volume
* Want to try Alexa dev stack (this is my first attempt)

## General structure

1. [Alexa part](00-alexa-amazon-dev-console)
    * You should create and define custom Alexa skill
    * Skill should contain identity (how you will call it then, for example "Alexa, ask Mopidy to play")
    * Skill should contain list in intents, meaning distinctive actions that it shold be capable of (like play, stop etc). Intent may have slots - place where some variable should be, like "Alexa, ask Mopidy to set volume {FIVE}"
    * Skill should contain list of phrases mapped to each intent
    * Service hook that will implement custom logic behind intents
    * After skill definition is done you can enable it for your account
1. [Service part](01-mopidy-voice-control-skill)
    * Should receive json requests from Alexa, already recognized and parsed, simlified just something like 
    ```
    {
        "intent": "SetVolume",
        "slot": {
            "value": 10
        }
    }  
    ```  
    * Should do something with it and reply to Alexa with specific text that she should reply to user
    * In my case put requst into IoT hub, where it can be captured by next layer of app
    * Receive speach reply from service or notify user if device didn't reply within timeout
1. [Mopidy service part](02-mopidy-device-control)
    * Should subscribe to IoT hub and wait for messages
    * Upon receiving call appropriate JSON RPC service (or do chain of calls)
    * Reply back to sender positive or negative response





