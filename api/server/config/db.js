const mongoose      = require('mongoose');
const dotenv        = require('dotenv').config();
const Candidate     = require('../models/Candidate')

let db_url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

// Populate or check if candidates are already added to the database, if they are just update it
let updateOrCreateCandidate = function (id, candidateValues) {
    Candidate.findOne({frontendId: id}, function(err, candidate) {
        if(err) return console.error(err)

        if(!candidate) candidate        = new Candidate()

        candidate.frontendId                = id
        candidate.firstName                 = candidateValues.firstName
        candidate.lastName                  = candidateValues.lastName
        candidate.party                     = candidateValues.party
        candidate.description               = candidateValues.description
        candidate.twitter_screenName        = candidateValues.twitter_screenName
        candidate.fb_screenName             = candidateValues.fb_screenName
        candidate.yt_screenName             = candidateValues.yt_screenName
        candidate.totalTweets               = candidateValues.totalTweets
        candidate.positiveTweets            = candidateValues.positiveTweets
        candidate.negativeTweets            = candidateValues.negativeTweets
        candidate.favAverage                = candidateValues.favAverage
        candidate.positiveYoutubeComments   = candidateValues.positiveYoutubeComments
        candidate.negativeYoutubeComments   = candidateValues.negativeYoutubeComments
        candidate.analyzedVideoId           = candidateValues.analyzedVideoId
        candidate.videoEmotionResults       = candidateValues.videoResults
        candidate.maxNumberFavs             = candidateValues.maxNumberFavs
        candidate.topFaved                  = candidateValues.topFaved

        if(id == 1) {
            candidate.personalityInsights = require('../models/personality-lopez');
            candidate.personalityInsightsMentions = require('../models/personality-mentions-lopez');
            candidate.personalityInsightsPositiveMentions = require('../models/personality_positive_mentions_amlo');

        } else if(id == 2) {
            candidate.personalityInsights = require('../models/personality-anaya');
            candidate.personalityInsightsMentions = require('../models/personality-mentions-anaya');
            candidate.personalityInsightsPositiveMentions = require('../models/personality_positive_mentions_anaya');

        } else if(id == 3) {
            candidate.personalityInsights = require('../models/personality-meade');
            candidate.personalityInsightsMentions = require('../models/personality-mentions-meade');
            candidate.personalityInsightsPositiveMentions = require('../models/personality_positive_mentions_meade');

        }

        candidate.save(function(err) {
            if(err) {
                console.log(err)
                return console.error("Error saving candidate", JSON.stringify(candidate))
            }
        })

    })
}

mongoose.connect(db_url, function(err){
    if(err)
    {
        console.log('Error'+ err);
    }
    else
    {
        console.log("Connection Established with DB");
        updateOrCreateCandidate(1, require('../models/amlo.candidate'))
        updateOrCreateCandidate(2, require('../models/anaya.candidate'))
        updateOrCreateCandidate(3, require('../models/meade.candidate'))
    }

});
