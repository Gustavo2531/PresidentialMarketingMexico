const twitter   = require('twitter')
var Twit = require('twit')
const fs = require('fs')
const moment = require('moment-timezone')

require('dotenv').load()

function isReply(tweet) {
  if ( tweet.retweeted_status
    || tweet.in_reply_to_status_id
    || tweet.in_reply_to_status_id_str
    || tweet.in_reply_to_user_id
    || tweet.in_reply_to_user_id_str
    || tweet.in_reply_to_screen_name )
    return true
}

const T = new Twit({
            consumer_key: '7jHKrdDxM9jJsLm2mkXh0xaC2',
            consumer_secret: 'qiWbt3Miw3DYqgZs04E7pfh3mLZ1E0xjnrDRDJVFmbzHM8CI5g',
            access_token: '952843470988816385-mxqN7ZZyzwWiftjj6MDDaiySgzS4Qzt',
            access_token_secret: 's3y9TzKqV4OavgvIU39Vg6VFHbxHCaP8P5FxqMmpep8XC'
        });

        let cdmx    = [-99.326777, 19.18871, -98.960448, 19.592757];
        let stream  = T.stream('statuses/filter', {locations: cdmx, tweet_mode: "extended", track: ["JoseAMeadeK", "lopezobrador_","RicardoAnayaC", "DebateINE", "DebatePresidencial2018", "DebateDelDebate"]});

        var streamGeneral = fs.createWriteStream("debatePresidencial2018.txt", {flags: "a"})
        var streamAnaya = fs.createWriteStream("debatePresidencial2018_anaya.txt", {flags: "a"})
        var streamAmlo = fs.createWriteStream("debatePresidencial2018_amlo.txt", {flags: "a"})
        var streamMeade = fs.createWriteStream("debatePresidencial2018_meade.txt", {flags: "a"})

        console.log("Starting to record tweets");

        stream.on('tweet', function(tweet, error) {

            if(!isReply(tweet) && tweet.extended_tweet) {

                let text, userName, placeName, coordinates, m;

                userName = tweet.user.screen_name;
                m = moment(new Date(tweet.created_at));
                m.tz("America/Chicago")
                text = tweet.extended_tweet.full_text.replace(/\r?\n|\r/g, " ").replace("|"," ");

                if(tweet.place) placeName   = tweet.place.full_name;
                if(tweet.coordinates) coordinates = tweet.coordinates.coordinates;

                let recorded_tweet = `@${userName}|${placeName}|${coordinates}|${text}|${m}`;

                if(text.includes("RicardoAnayaC")) {
                    streamAnaya.write(recorded_tweet + "\n");
                } else if(text.includes("JoseAMeadeK")) {
                    streamMeade.write(recorded_tweet + "\n");
                } else if(text.includes("lopezobrador_")) {
                    streamAmlo.write(recorded_tweet + "\n");
                }

                streamGeneral.write(recorded_tweet + "\n");
                console.log(recorded_tweet);

            }

        });
