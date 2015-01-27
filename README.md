# pubnub.experiments
Trying Pubnub features using node schedule and pubnub


## To install please do
```
npm install
```

## To run the publisher
```
npm start
```
This configuration has three channels by default: Ipsumchannel, ContentPT and Message2You, change package.json for new default config

or 

```
node publisher-server.js channel(1) ... channel(n)
```


Where channel(n) is the name of the channel, a random  score between 1 and 10 will be associated to that channel to stabilish different rates between channels


## To run the subscriber client
```
node subscriber-client.js channel(1) .... channel(n)
```
Where channel(n) is the name of the channel the client subscribed


## Need to define the following environment variables

PubNub
```
    pubnub_appname 
    pubnub_keyname 
    pubnub_tier
    pubnub_publishkey
    pubnub_subscribekey
    pubnub_secretkey
```

Other
```
    time_period
    time_unit
```
These are max publishing rate variables for each channel, ex: time_period=2 and time_unit=s means a maximum publishing rate every 2s, the random score will define what is the probability to publish during that period

And also
```
    base_latitude (base of the contant location position)
    base_longitude
    max_range (for position base deviation)
```

Example:
```
export time_period="2"
export time_unit="s"
export base_latitude="38.733935"
export base_longitude="-9.143557"
export max_range=".0001"
```
