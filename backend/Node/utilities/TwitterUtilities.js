const Twit      = require("twit")
const fs        = require('fs')
const path      = require('path')
const twitter   = require('twitter')
const MAX_COUNT = 200


require('dotenv').load()

class TwitterUtilites {

    constructor() {
        this.credentials = {
            consumer_key: process.env.consumer_key,
            consumer_secret: process.env.consumer_secret,
            access_token_key: process.env.access_token,
            access_token_secret: process.env.access_token_secret
        };

        this.credentials_twit = {
            consumer_key: process.env.consumer_key,
            consumer_secret: process.env.consumer_secret,
            access_token: process.env.access_token,
            access_token_secret: process.env.access_token_secret
        };


         //console.log(this.credentials)
    }

    getTwitterStream() {
        const T = new Twit({
            consumer_key:           process.env.consumer_key,
            consumer_secret:        process.env.consumer_secret,
            access_token:           process.env.access_token,
            access_token_secret:    process.env.access_token_secret
        });

        let cdmx    = [-99.326777, 19.18871, -98.960448, 19.592757];
        let stream  = T.stream('statuses/filter', {locations: cdmx, tweet_mode: "extended"});

        var fileStream = fs.createWriteStream("tweets.txt", {flags: "a"});
        console.log("Starting to record tweets");

        stream.on('tweet', function(tweet) {
            //console.log(tweet);
            let text        = tweet.text.replace(/\r?\n|\r/g, " ").replace("|"," ");
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
        });
    }

    // Gets tweets from a user timeline, stops when no more are found
    tweetsFor(userName) {
        const fileNamePath = path.join(__dirname,"..", "..","..", "datasets", `${userName}_tweets.json`)
        return require(fileNamePath)
    }

    tweetsForReplies(userName) {
        const fileNamePath = path.join(__dirname,"..", "..","..", "datasets", `${userName}_replies.json`)
        return require(fileNamePath)
    }

    getLocalSavedTweetsReplies(userName) {
        return new Promise ((resolve => {
            try {
                resolve(this.tweetsForReplies(userName))
            } catch(error) {
                resolve(null)
            }
        }))
    }

    getLocalSavedTweets(userName) {
        return new Promise ((resolve => {
            try {
                resolve(this.tweetsFor(userName))
            } catch(error) {
                resolve(null)
            }
        }))
    }

    getRepliesFromTwitter(userName){

        return new Promise((resolve, reject) => {
            if(!userName || !this.credentials_twit) {
                return reject(new Error("User credentials not found, or no username specified"));
            }
            //console.log(process.env.consumer_key);
            const twit = new Twit(this.credentials_twit);

            let tweets = [];
            const params = {
                q: `@${userName}`,
                count: MAX_COUNT,
                exclude_replies: true,
                trim_user: true,
                tweet_mode: 'extended',
                result_type: "mixed"
            };

            const processTweets = (error, newTweets) => {
                if(error) {
                    console.log("Error in process tweets",JSON.stringify(error));
                    return reject(error);
                }

                tweets = tweets.concat(newTweets.statuses.filter((tweet) => !tweet.retweeted));

                if(newTweets.length > 1) {
                    params.max_id = newTweets[newTweets.length - 1].id -1;
                    return twit.get('search/tweets', params, processTweets);
                } else {
                    return resolve(tweets);
                }
            };

            twit.get('search/tweets', params, processTweets);
        })
    };

    getTweetsFromTwitter(userName){

        return new Promise((resolve, reject) => {
            if(!userName || !this.credentials) {
                return reject(new Error("User credentials not found, or no username specified"));
            }



            const twit = new twitter(this.credentials);

            let tweets = [];
            const params = {
                screen_name: userName,
                count: MAX_COUNT,
                exclude_replies: true,
                trim_user: true,
                tweet_mode: 'extended'
            };

            const processTweets = (error, newTweets) => {
                if(error) {
                    console.log("Error in process tweets",JSON.stringify(error));
                    return reject(error);
                }


                tweets = tweets.concat(newTweets.filter((tweet) => !tweet.retweeted));

                if(newTweets.length > 1) {
                    params.max_id = newTweets[newTweets.length - 1].id -1;
                    return twit.get('statuses/user_timeline', params, processTweets);
                } else {
                    return resolve(tweets);
                }
            };

            twit.get('statuses/user_timeline', params, processTweets);
        })
    };

    getTweets(user) {
        return this.getLocalSavedTweets(user).then(
            (tweets) => tweets ? tweets: this.getTweetsFromTwitter(user)
        )
    }

    getReplies(user){
        return this.getLocalSavedTweetsReplies(user).then(
            (tweets) => tweets ? tweets: this.getRepliesFromTwitter(user)
        )
    }

    // Utility functions to save data files
    saveJSONFile(data, fileName) {
        const filePath = path.join(__dirname, "..", "..", "..","datasets", `${fileName}.json`)

        if(fs.existsSync(filePath)) {
            console.log(`${fileName} file already exists, no need to save it`)
        } else {
            console.log(`Saving ${fileName} file...`)
            const content = JSON.stringify(data)
            fs.writeFile(filePath, content, 'utf-8',
                function(err) {
                    if(err) return console.log(err)
                    console.log(`${fileName} json file saved`);
                }
            )
        }
    }

    saveTXTFile(data, fileName) {
        const filePath = path.join(__dirname, "..", "..", "..", "datasets", `${fileName}.txt`)

        if(fs.existsSync(filePath)) {
            console.log(`${fileName} file already exists, no need to save it`)
        } else {
            console.log(`Saving ${fileName} file...`)
            fs.writeFile(filePath, data, 'utf-8',
                function(err) {
                    if(err) return console.log(err)
                    console.log(`${fileName} txt file saved`);
                }
            )
        }

    }





}

module.exports = TwitterUtilites;
