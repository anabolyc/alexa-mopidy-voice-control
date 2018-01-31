# Zero layer - alexa skill definition

First layer of this app is amazon skill definition. It have all the information about natural language commands that we are planning to handle. Also it have service hook definition which will recieve Alexa's calls.

Good tutorial covering this part you can find on [YouTube] (https://www.youtube.com/watch?v=zt9WdE5kR6g)

In my case i want to handle following mesages

* Play control: play, pause, resume, stop
* Volume control: set specific volume, mute, increase and decrease volume
* Play radio from my favourites list, identified just by slot number
* Play audio track in tha same manner

## Service hook

I decided to host service as amazon lambda function. 

* For my volumes it is free
* It is very well covered in tutorials
* Why not

please go to ../01-mopidy-voice-control-skill for more

## Setup 

1. Go to [Amazon Dev Console/ Alexa] (https://developer.amazon.com/edw/home.html#/skills) and create skill using step by step routine
2. Use schema and sample utterances from this folder 
3. Enable skill at [your profile page] (https://alexa.amazon.com/spa/index.html#skills/your-skills/?ref-suffix=ysa_gw)

## Links

* [Amazon dev Console - starting point](https://developer.amazon.com/edw/home.html#/skills)
* [Amazon Skill Model docs](https://developer.amazon.com/docs/custom-skills/define-the-interaction-model-in-json-and-text.html)
* [YouTube tutorial](https://www.youtube.com/watch?time_continue=39&v=zt9WdE5kR6g)
