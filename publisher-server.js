'use script';

var pubnub = require("pubnub")({
        ssl           : true,  // <- enable TLS Tunneling over TCP
        publish_key   : process.env.pubnub_publishkey,
        subscribe_key : process.env.pubnub_subscribekey
    }),
    every = require('schedule').every,
    dummyjson = require('dummy-json');

console.log("\n\n\n ----------------------------------------------");
console.log("Publisher for Ipsum Channel(s)");

// Defining max publish rate
publishrate= process.env.time_period+""+process.env.time_unit;
console.log("Max Publishing Rate per channel:" + publishrate);


// Reading the Channels and starting the rate setup
var Channels = [];
process.argv.forEach(function (val, index, array) {
  if (index > 1)
      Channels.push({name:val, msgid:0, channelid:index-1, ratescore:Math.round(Math.random()*10)});
});
Channels.forEach(function (channel){
    console.log(" Channel: "+ channel.name + ", Score:" + channel.ratescore);
});






//Publishing the Contents
every(publishrate).do(function() {
    
    Channels.forEach(function (channel){
       
        if (Math.round(Math.random()*10) < channel.ratescore){ //Defines if publishes
            // Building Random position around the base
            var latmin = String(parseFloat(process.env.base_latitude) - parseFloat(process.env.max_range));
            var latmax = String(parseFloat(process.env.base_latitude) + parseFloat(process.env.max_range));
            var lngmin = String(parseFloat(process.env.base_longitude) - parseFloat(process.env.max_range));
            var lngmax = String(parseFloat(process.env.base_longitude) + parseFloat(process.env.max_range));

            var str_lat = '\''+ latmin + '\' \'' + latmax + '\''; 
            var str_lng = '\''+ lngmin + '\' \'' + lngmax + '\''; 

            var myPayload = '{ "name": "{{firstName}} {{lastName}}", "email": "{{email}}", "uid": "{{number 1 3000}}", "msglen": "{{number 10 128}}", ';
                myPayload = myPayload + '  "lat": "{{ number ' + str_lat + '}}", "lng": "{{ number ' + str_lng + '}}" }';

            var result = JSON.parse(dummyjson.parse(myPayload));

            var content ={
                SRCpayload: result,
                SRCtimestamp: new Date().toISOString().
                                replace(/T/, ' ').
                                replace(/\..+/, ''),
                SRCmsgid: (channel.msgid)++
            };

            
            // And publishes
            pubnub.publish({ 
                    channel   : channel.name,
                    message   : content,
                    callback  : function(e) { console.log( "Channel " + channel.name , e ); },
                    error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
            });


        }
    });
    
    
    
    

});