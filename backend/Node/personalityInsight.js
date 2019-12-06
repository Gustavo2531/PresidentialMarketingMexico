const PersonalityInsight = require('watson-developer-cloud/personality-insights/v3');
require('dotenv').config({path: __dirname + '/.env'})
const username = process.env.username_watson;
const password = process.env.password_watson;


/*Setting the keys for our IBM Watson account*/
const personalityInsights = new PersonalityInsight({
    username : username,
    password : password,
    version_date : '2017-10-13'
});

/*Set the different headers */
const toContentItem = (tweet) => {
  return {
    language: 'es',
    contenttype: 'text/plain',
    content: tweet.text.replace('[^(\\x20-\\x7F)]*',''),
  };
};

/* Get personality given txt file*/
const getProfile = (params) =>
  new Promise((resolve, reject) => {
    if (params.language) {
      params.headers = {
        'Content-Language': params.language,
        'Accept-Language': params.language
      };
    }
    return personalityInsights.profile(params, (err, profile) => {
      if (err) {
        reject(err);
      } else {
        resolve(profile);
      }
    });
});


/* Get personality given  tweets*/
const profileFromTweets = (params) => (tweets) => {
  params.content_items = tweets.map(toContentItem);
  return getProfile(params);
};

module.exports = {
    profileFromText : getProfile,
    profileFromTweets,
};
