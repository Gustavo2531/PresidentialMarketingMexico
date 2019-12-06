require('dotenv').load()
const Twit = require('twit')
const fs = require('fs')

const T = new Twit({
                    consumer_key:           "7jHKrdDxM9jJsLm2mkXh0xaC2",
                    consumer_secret:        "qiWbt3Miw3DYqgZs04E7pfh3mLZ1E0xjnrDRDJVFmbzHM8CI5g",
                    access_token:           "952843470988816385-mxqN7ZZyzwWiftjj6MDDaiySgzS4Qzt",
                    access_token_secret:    "s3y9TzKqV4OavgvIU39Vg6VFHbxHCaP8P5FxqMmpep8XC"
          });

let stream  = T.stream('statuses/filter', {track: '@JoseAMeadeK', tweet_mode: "extended"});

var fileStream = fs.createWriteStream("mentions_meade.txt", {flags: "a"});
console.log("Starting to record tweets");

let count = 0
stream.on('tweet', function(tweet) {

            if(tweet.user.statuses_count > 1500 && tweet.extended_tweet) {

                console.log(count)
                text = tweet.extended_tweet.full_text
                text = text.replace(/\r?\n|\r/g, " ").replace("|"," ")
                text = text.replace(/\B@[a-z0-9_-]+/gi, "")
                text = text.replace(/ +(?= )/g,'')

                var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
                var regex = new RegExp(expression)
                text = text.replace(regex,"")

                if(text != "") {
                    console.log(tweet.extended_tweet.full_text)
                    fileStream.write(text + "\n");
                    count++;
                }

            }

            /*
            let text        = tweet.full_text.replace(/\r?\n|\r/g, " ").replace("|"," ");
            let userName    = tweet.user.screen_name;
            let placeName;
            let coordinates;

            if(tweet.place)         placeName   = tweet.place.full_name;
            if(tweet.coordinates)   coordinates = tweet.coordinates.coordinates;
            if(tweet.extended_tweet) {
                text = tweet.extended_tweet.full_text.replace(/\r?\n|\r/g, " ").replace("|"," ");
            }

            tweet = `@${userName}|${placeName}|${coordinates}|${text}`;

            console.log(tweet);
            fileStream.write(tweet + "\n");
            */
        });
