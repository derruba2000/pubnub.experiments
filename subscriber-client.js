'use strict';

// Client for the channel
var pubnub = require("pubnub")({
        ssl           : true,  // <- enable TLS Tunneling over TCP
        publish_key   : process.env.pubnub_publishkey, // OS Environment Variables
        subscribe_key : process.env.pubnub_subscribekey
    }),
    every = require('schedule').every;

console.log("\n\n\n ----------------------------------------------");
console.log("Client for Ipsum Channel(s)");

var SubsChannels = [];

process.argv.forEach(function (val, index, array) {
  if (index > 1)
      SubsChannels.push({name:val, msgid:0, channelid:index-1});
});

console.log("Total subscribed channels:"+SubsChannels.length);
    
if (SubsChannels.length > 0){
    // Listen for the messages
    console.log("Listening Specified Channels:");
    SubsChannels.forEach( function(channel){
        console.log("Name: "+ channel.name);
        pubnub.subscribe({
            channel  : channel.name,
            callback : function(message) {
                var content = {
                    payload: message,
                    timestamp: new Date().toISOString().
                                            replace(/T/, ' ').      // replace T with a space
                                            replace(/\..+/, ''),    // delete the dot and everything after,
                    id: (channel.msgid)++
                }
                console.log( "Channel: " +  channel.name +" > ", content );
            }
        });
    });
    
}else{
    console.log("\n\n\n Error, you need to specifiy your channels name!\n");
    console.log("$ node subscriber-server.js channel1 channel2 ...\n");
}
