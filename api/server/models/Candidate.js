const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let Candidate   =   new Schema(
    {
        frontendId : {
            type        : Number,
            required    : true
        },
        firstName :{
            type        :      String,
            required    :      true
        },
        lastName    :{
            type        :      String,
            required    :      true
        },
        party       :{
            type        :       String,
            required    :       true
        },
        description : {
            type        :       String,
            required    :       true
        },
        twitter_screenName :{
            type        :       String,
            required    :       true
        },
        fb_screenName :{
            type        :       String,
            required    :       true,
        },
        yt_screenName :{
            type        :       String,
            required    :       true
        },
        totalTweets: {
            type        :       Number,
            required    :       true
        },
        positiveTweets: {
            type        :       Number,
            required    :       true
        },
        negativeTweets: {
            type        :       Number,
            required    :       true
        },
        favAverage: {
            type        :       Number,
            required    :       true
        },
        positiveYoutubeComments: {
            type        :       Number,
            required    :       true
        },
        negativeYoutubeComments: {
            type        :       Number,
            required    :       true
        },
        personalityInsights: {
            type        :       {},
            required    :       true
        },
        personalityInsightsMentions: {
            type        :       {},
            required    :       true
        },
        analyzedVideoId : {
            type        :       String,
            required    :       true
        },
        videoEmotionResults: {
            type        :       [],
            required    :       true
        },
        personalityInsightsPositiveMentions: {
            type        : {},
            required    : true
        },
        topFaved: {
            type : String,
            required: true
        },
        maxNumberFavs :{
            type: Number,
            required: true
        }
    }

);

module.exports = mongoose.model('Candidate', Candidate);
