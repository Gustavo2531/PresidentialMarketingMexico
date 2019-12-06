const PythonShell = require('python-shell');
require('dotenv').load();

exports.predictTweet = (req, res) => {

    if(!req.body.tweet) return res.status(400).send({err: "Error, no tweet provided"});
    if(!req.body.candidateFrontendId) return res.status(400).send({err: "Error no candidate ID provided"});

    let candidateFrontendId = req.body.candidateFrontendId;
    var options = {};

    switch(candidateFrontendId) {
        case "1":
            options = {
                args: [req.body.tweet, "lopezobrador_tweets_text_with_favs.txt"],
                pythonPath: process.env.PYTHON_PATH
            }
            break;
        case "2":
            options = {
                args: [req.body.tweet, "RicardoAnayaC_tweets_text_with_favs.txt"],
                pythonPath: process.env.PYTHON_PATH
            }
            break;
        case "3":
            options = {
                args: [req.body.tweet, "JoseAMeadeK_tweets_text_with_favs.txt"],
                pythonPath: process.env.PYTHON_PATH
            }
            break;
    }

    console.log("options", options);

    PythonShell.run('../backend/Python/create_tweet_prediction_model.py', options,
        function (err, result) {
            if(err) {
                console.error("Error in running python script", err);
                return res.status(500).send({err: err});
            }

            return res.status(200).send(result);
        })
}

