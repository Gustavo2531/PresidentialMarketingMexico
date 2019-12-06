/**
 * Main Driver File, show the usage of all utilities we developed.
 *
 * @type {TwitterUtilites}
 */
const TwitterUtilities  = require('./utilities/TwitterUtilities');
const waterfall         = require('async-waterfall')

/**
 * Gets all possible timeline tweets and saves a txt file contianing only text from those tweets, as well as a tweets.json that contains all information
 */
let generateTextFromTweets = function () {

    var self = this;
    const twitterUtils = new TwitterUtilities();

    let getAnayaTweets = function (callback) {
        let result = {};

        twitterUtils.getTweets("RicardoAnayaC").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "RicardoAnayaC_tweets")

                result['anayaTweets'] = tweets;
                callback(null, result);
            }
        )
    };

    let getAmloTweets = function (result, callback) {

        twitterUtils.getTweets("lopezobrador_").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "lopezobrador__tweets")

                result['amloTweets'] = tweets;
                callback(null, result);
            }
        )
    }

    let getMeadeTweets = function (result, callback) {

        twitterUtils.getTweets("JoseAMeadeK").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "JoseAMeadeK_tweets")

                result['meadeTweets'] = tweets;
                callback(null, result);
            }
        )
    };

    // Utility function to process text from tweets.json
    self.getTextFromTweets = function(tweets) {
        let justText = ""
        tweets.forEach((tweet) => {
            let cleanTweet = tweet.full_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // remove urls
            cleanTweet = cleanTweet.replace("RT", "") // remove RT
            cleanTweet = cleanTweet.replace(/\B@[a-z0-9_-]+/gi, '') // remove @mentions
            cleanTweet = cleanTweet.replace(/\r?\n|\r/g, " ") // remove any /n we may find

            justText = justText.concat(cleanTweet)
            justText = justText.concat('\n')
        });
        return justText
    };




    waterfall([
        getAnayaTweets,
        getAmloTweets,
        getMeadeTweets
    ], (err, result) => {
        if(err) console.log(err)

        let anayaTweets = result['anayaTweets']
        let meadeTweets = result['meadeTweets']
        let amloTweets  = result['amloTweets']

        twitterUtils.saveTXTFile(self.getTextFromTweets(anayaTweets), "RicardoAnayaC_tweets_text")
        twitterUtils.saveTXTFile(self.getTextFromTweets(amloTweets), "lopezobrador_tweets_text")
        twitterUtils.saveTXTFile(self.getTextFromTweets(meadeTweets), "JoseAMeadeK_tweets_text")


    });
};

let generateTextFromReplies = function () {

    var self = this;
    const twitterUtils = new TwitterUtilities();

    let getAnayaTweets = function (callback) {
        let result = {};

        twitterUtils.getReplies("RicardoAnayaC").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "RicardoAnayaC_replies_tweets")

                result['anayaTweets'] = tweets;
                callback(null, result);
            }
        )
    };

    let getAmloTweets = function (result, callback) {

        twitterUtils.getReplies("lopezobrador_").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "lopezobrador_replies_tweets")

                result['amloTweets'] = tweets;
                callback(null, result);
            }
        )
    }

    let getMeadeTweets = function (result, callback) {

        twitterUtils.getReplies("JoseAMeadeK").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "JoseAMeadeK__replies_tweets")

                result['meadeTweets'] = tweets;
                callback(null, result);
            }
        )
    };

    // Utility function to process text from tweets.json
    self.getTextFromTweets = function(tweets) {
        let justText = ""
        tweets.forEach((tweet) => {
            let cleanTweet = tweet.full_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // remove urls
            cleanTweet = cleanTweet.replace("RT", "") // remove RT
            cleanTweet = cleanTweet.replace(/\B@[a-z0-9_-]+/gi, '') // remove @mentions
            cleanTweet = cleanTweet.replace(/\r?\n|\r/g, " ") // remove any /n we may find

            justText = justText.concat(cleanTweet)
            justText = justText.concat('\n')
        });
        return justText
    };
    waterfall([
        getAnayaTweets,
        getAmloTweets,
        getMeadeTweets
    ], (err, result) => {
        if(err) console.log(err)

        let anayaTweets = result['anayaTweets']
        let meadeTweets = result['meadeTweets']
        let amloTweets  = result['amloTweets']

        twitterUtils.saveTXTFile(self.getTextFromTweets(anayaTweets), "RicardoAnayaC_replies_text")
        twitterUtils.saveTXTFile(self.getTextFromTweets(amloTweets), "lopezobrador_replies_text")
        twitterUtils.saveTXTFile(self.getTextFromTweets(meadeTweets), "JoseAMeadeK_replies_text")


    });
};


let getFavoritesFromTweets = function(){

    var self = this;
    const twitterUtils = new TwitterUtilities();

    let wordCount = {};

    let stopwords = {
        a : 0,
        ante : 0,
        bajo: 0,
        cabe :0,
        con :0,
        contra :0,
        de :0,
        desde : 0,
        hacia :0,
        hasta :0 ,
        para :0,
        por: 0,
        según : 0,
        si : 0,
        sobre : 0,
        tras: 0,
        la :0,
        las :0 ,
        los : 0,
        lo: 0,
        un :0,
        uno :0,
        unos :0,
        una :0,
        unas :0,
        el :0,
        ella :0,
        ellos:0,
        ellas :0,
        esta: 0,
        este: 0,
        es : 0,
        fue :0,
        nos: 0,
        te: 0
    };

    let getAnayaTweets = function (callback) {
        let result = {};

        twitterUtils.getTweets("RicardoAnayaC").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "RicardoAnayaC_tweets");

                result['anayaTweets'] = tweets;
                callback(null, result);
            }
        )
    };
    let getAmloTweets = function (result, callback) {

        twitterUtils.getTweets("lopezobrador_").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "lopezobrador__tweets");

                result['amloTweets'] = tweets;
                callback(null, result);
            }
        )
    };

    let getMeadeTweets = function (result, callback) {

        twitterUtils.getTweets("JoseAMeadeK").then(
            tweets => {
                twitterUtils.saveJSONFile(tweets, "JoseAMeadeK_tweets");

                result['meadeTweets'] = tweets;
                callback(null, result);
            }
        )
    };
     self.getTextFromFavorites = function(tweets){
        let justText = "";
        tweets.forEach((tweet) =>{
            let cleanTweet = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // remove urls
            cleanTweet = cleanTweet.replace("RT", "") // remove RT
            cleanTweet = cleanTweet.replace("\"","")
            cleanTweet = cleanTweet.replace("\"","")
            cleanTweet = cleanTweet.replace(/\B@[a-z0-9_-]+/gi, '') // remove @mentions
            cleanTweet = cleanTweet.replace(/\r?\n|\r/g, " ") // remove any /n we may find

            justText = justText.concat("\"");
            justText = justText.concat(cleanTweet);
            justText = justText.concat("\"");
            justText = justText.concat(",");

            //let favs = tweet.favoriteCount;

            /*
            let favs = tweet.favoriteCount/100;
            favs = Math.floor(favs);

            if(favs == 0){
                favs = 0;
            }
            else if(favs >9){
                favs = 1000;
            }
            else{
                favs=favs*100;
            }
            */

            let favs = tweet.favoriteCount;

            justText = justText.concat(favs);
            justText = justText.concat('\n')


        });

        return justText;

    };

    self.orderByFavorites = function(tweets){
        let tweetsWithFavorites = [];
        tweets.forEach((tweet) => {
            let result ={
                text : tweet.full_text,
                favoriteCount   : tweet.favorite_count
            };
            tweetsWithFavorites.push(result);
        });

        return self.mergesort(tweetsWithFavorites);
    };

    self.mergesort = function(array){
        if(array.length <= 1){
            return array;
        }
        let middle = array.length/2;
        let left     = array.slice(0,middle);
        let right     = array.slice(middle,array.length);


         self.mergesort(left);
         self.mergesort(right);
         self.sort(left,right,array);

        return array;

    };

    self.sort = function(a1, a2, array){
        let pointer1 = 0;
        let pointer2 = 0;
        let index =0;

        while(pointer1 < a1.length && pointer2 < a2.length){
            if(a1[pointer1].favoriteCount< a2[pointer2].favoriteCount){
                array[index] = a1[pointer1];
                pointer1++;
            }
            else{
                array[index] = a2[pointer2];
                pointer2++;
            }
            index++;
        }

        while(pointer1 < a1.length){
            array[index] = a1[pointer1];
            pointer1++;
            index++;
        }

        while(pointer2 < a2.length){
            array[index] = a2[pointer2];
            pointer2++;
            index++;
        }
    };

    self.getAverageFavorites = function(tweets){
        var sum = 0;
        for(var i=0;i<tweets.length;i++){

            sum += tweets[i].favorite_count;

        }
        let result = sum/tweets.length;
        console.log("Average "+result);
        return result;
    };

    self.getMostFavoritedTweets = function(tweets){

        let index = tweets.length-1;
        let counter =0;
        let mostFavorited = [];

        while(counter<10 && index>-1){

            mostFavorited.push(tweets[index]);
            index--;
            counter++;
        }

        return mostFavorited;

    };

    self.get100MostFavoritedTweets = function(tweets){

        let index = tweets.length-1;
        let counter =0;
        let mostFavorited = [];
        console.log(tweets[0]);

        while(counter<100 && index>-1){

            mostFavorited.push(tweets[index].text);
            index--;
            counter++;
        }

        return mostFavorited;

    };


    self.countWords = function(tweets){

        let index = tweets.length-1;
        let counter =0;

        while(counter<500 && index>-1){
            tweet = tweets[index].text.toLowerCase();
            var  splittedTweet = self.splitString(tweet," ");
            for(var i =0;i<splittedTweet.length;i++){
                var tempString = splittedTweet[i];
                if (!stopwords.hasOwnProperty(tempString)) {
                    if(wordCount.hasOwnProperty(tempString)){
                        let value = wordCount[tempString];
                        value +=1;
                        wordCount[tempString] =value;
                    }else{

                        wordCount[splittedTweet[i]] = 1;
                    }
                }
                else{
                    continue;
                }
            }
            index--;
            counter++;
        }


    };
    self.splitString = function(stringToSplit, separator) {
        var arrayOfStrings = stringToSplit.split(separator);
        return arrayOfStrings;
    }


    waterfall([
        getAnayaTweets,
        getAmloTweets,
        getMeadeTweets
    ], (err, result) => {
        if(err) console.log(err);

        let anayaTweets = result['anayaTweets'];
        let meadeTweets = result['meadeTweets'];
        let amloTweets  = result['amloTweets'];

        let test = [5,6,346,22,4,68902,2,3,4,1,7,2];
      /* let test = [{

        full_text: "Esta es primer primera primera oracion oye wow la primera oracion"

       },{
        full_text: "Esta es la segunda oracion segunda segunda segunda"
       }
       ];*/

       //console.log(self.orderByFavorites(anayaTweets));




        /* twitterUtils.saveJSONFile(self.orderByFavorites(anayaTweets), "RicardoAnayaC_tweets_ordered_by_favorites");
         twitterUtils.saveJSONFile(self.orderByFavorites(amloTweets), "lopezobrador_tweets_ordered_by_favorites");
         twitterUtils.saveJSONFile(self.orderByFavorites(meadeTweets), "JoseAMeadeK_tweets_ordered_by_favorites");


        */

       /* let anayaFavorites = require('../../datasets/RicardoAnayaC_tweets_ordered_by_favorites');
        twitterUtils.saveJSONFile(self.getMostFavoritedTweets(anayaFavorites), "RicardoAnayaC_top_faved");
        let meadeFavorites = require('../../datasets/JoseAMeadeK_tweets_ordered_by_favorites');
        twitterUtils.saveJSONFile(self.getMostFavoritedTweets(meadeFavorites), "JoseAMeadeK_top_faved");
        let amloFavorites = require('../../datasets/lopezobrador_tweets_ordered_by_favorites');
        twitterUtils.saveJSONFile(self.getMostFavoritedTweets(amloFavorites), "lopezobrador_top_faved");

*/

       /**Get top 100*/

        let anayaFavorites = require('../../datasets/RicardoAnayaC_tweets_ordered_by_favorites');
        twitterUtils.saveJSONFile(self.get100MostFavoritedTweets(anayaFavorites), "RicardoAnayaC_100_top_faved");
        let meadeFavorites = require('../../datasets/JoseAMeadeK_tweets_ordered_by_favorites');
        twitterUtils.saveJSONFile(self.get100MostFavoritedTweets(meadeFavorites), "JoseAMeadeK_100_top_faved");
        let amloFavorites = require('../../datasets/lopezobrador_tweets_ordered_by_favorites');
        twitterUtils.saveJSONFile(self.get100MostFavoritedTweets(amloFavorites), "lopezobrador_100_top_faved");



       // self.getAverageFavorites(anayaTweets);

       /* let favoritesAnaya = require('../../datasets/RicardoAnayaC_tweets_ordered_by_favorites')
        twitterUtils.saveTXTFile(self.getTextFromFavorites(favoritesAnaya),"RicardoAnayaC_tweets_text_with_favs");
        let favoritesMeade = require('../../datasets/JoseAMeadeK_tweets_ordered_by_favorites')
        twitterUtils.saveTXTFile(self.getTextFromFavorites(favoritesMeade),"JoseAMeadeK_tweets_text_with_favs");
        let favoritesAmlo = require('../../datasets/lopezobrador_tweets_ordered_by_favorites')
        twitterUtils.saveTXTFile(self.getTextFromFavorites(favoritesAmlo),"lopezobrador_tweets_text_with_favs");
        */
       // console.log(self.mergesortOccurrence(wordCount,"sortByOccurrence"));
    });


};

// Aqui comentar si no se quiere usar esa funcion


//generateTextFromTweets();
getFavoritesFromTweets()
//generateTextFromReplies()
// Aqui poner las demas asi como arriba, por ejemplo:
// generateTextFromReplies()
// generateAnalyticsFile()
// etc etc



/*
twitterUtils.getTweets(screenName).then(
    function (tweets){
        const content = JSON.stringify(tweets)
        fs.writeFile(
            path.join(__dirname, "..", "..", "datasets", `${screenName}_tweets.json`),
            content,
            'utf-8',
            function(err) {
                if(err) return console.log(err)
                console.log(`${screenName} tweets saved`);
            }
        )
    })
*/


/*let getPersonalityInsightsForPositive = function(){
    var self = this;
    const twitterUtils = new TwitterUtilities();


    waterfall([

    ], (err, result) => {
        if(err) console.log(err);

        let anayaMentions = require('../../datasets/debatePresidencial2018_anaya_evaluado.csv');

         });

};*/


//getPersonalityInsightsForPositive();

const fs = require('fs');
const path = require('path');

const PersonalityUtilities = require('./utilities/PersonalityUtilities');
let personalityUtilities = new PersonalityUtilities();
const twitterUtilities = new TwitterUtilities();
var candidates = ["RicardoAnayaC","JoseAMeadeK","lopezobrador_"];
var filenames  = ["RicardoAnayaC_tweets_text", "JoseAMeadeK_tweets_text", "lopezobrador_tweets_text"];
var filenamesReplies  = ["mentions_anaya", "mentions_meade", "mentions_obrador"];
var personalities =["personality-anaya", "personality-meade", "personality-lopez"];
var personalitiesReplies =["personality-mentions-anaya", "personality-mentions-meade", "personality-mentions-lopez"];

var positiveMentions =["positive_mentions_anaya", "positive_mentions_meade", "positive_mentions_amlo"];
var positiveMentionsFiles =["personality_positive_mentions_anaya", "personality_positive_mentions_meade", "personality_positive_mentions_amlo"];



var personalitiesConsumptionNeeds =["RicardoAnayaC-consumer-needs", "JoseAMeadeK-consumer-needs", "lopezobrador-consumer-needs"];

var getTweets = function(){
    for(var i=0;i<candidates.length;i++){
        twitterUtilities.saveTweets(filenames[i], candidates[i]);
    }
}
//getTweets();

var getReplies = function(){
    for(var i=0;i<candidates.length;i++){
        twitterUtilities.saveJSONFile(filenamesReplies[i], candidates[i]);
    }
}
//getReplies();

var getPersonalityInsightsCandidates = function(){
    for(var i=0;i<candidates.length;i++){
        personalityUtilities.getPersonalityInsight(personalities[i], filenames[i]);
    }
}
//getPersonalityInsightsCandidates();


var getPersonalityInsightsCandidatesWithConsumptionNeeds = function(){
    for(var i=0;i<candidates.length;i++){
        personalityUtilities.getPersonalityInsightWithConsumerNeeds(personalities[i], filenames[i]);
    }
}
//getPersonalityInsightsCandidatesWithConsumptionNeeds();

var getPersonalityInsightsReplies = function(){
    for(var i=0;i<candidates.length;i++){
        personalityUtilities.getPersonalityInsightWithConsumerNeeds(personalitiesReplies[i], filenamesReplies[i]);
    }
};
//getPersonalityInsightsReplies();

var getPersonalityInsightsForPositive = function () {
    for(var i=0;i<candidates.length;i++){
        personalityUtilities.getPersonalityInsightWithConsumerNeeds( positiveMentionsFiles[i], positiveMentions[i]);
    }
};
//getPersonalityInsightsForPositive();







