const Candidate     =   require('../models/Candidate');
const mongoose      =   require('mongoose');

exports.getCandidate = (req, res) => {
    if(!req.params.id) return res.status(400).send({err: "No id provided"})

    Candidate.findOne({frontendId: req.params.id}, function (err, candidate) {
        if(err){
            console.error(err)
            return res.status(500).send({err: err})
        }

        return res.status(200).send(candidate)
    })
}

exports.getAllCandidates = (req, res) => {

    Candidate.find({}, function(err, candidates) {
        if(err) return res.status(500).send({err: err})

        let personalityInsights = {
            "Apertura a experiencias": {},
            "Responsabilidad": {},
            "Extroversión": {},
            "Amabilidad": {},
            "Rango emocional": {}
        }

        let needsInsights = {
            "Desafío": {},
            "Familiaridad": {},
            "Curiosidad": {},
            "Entusiasmo": {},
            "Armonía": {},
            "Ideal": {},
            "Libertad": {},
            "Amor": {},
            "Practicidad": {},
            "Autoexpresión": {},
            "Estabilidad": {},
            "Estructura": {},
        }

        let valuesInsights = {
            "Conservación": {},
            "Apertura al cambio": {},
            "Hedonismo": {},
            "Superación personal": {},
            "Autotranscendencia": {}
        }

        let consumptionPreferenceMap = {
            "1" : [],
            "2" : [],
            "3" : [],
            "4" : [],
            "5" : [],
            "6" : []
        }


        personalityInsightsArray = [];
        valuesInsightsArray = [];
        needsInsightsArray = [];

        positiveMentionsPersonalityInsightsArray = [];
        positiveMentionsValuesInsightsArray = [];
        positiveMentionsNeedsInsightsArray = [];

        let counter = 4;

        // Add personality insights for candidate
        candidates.forEach(
            (candidate) => {

                let personality = candidate.personalityInsights.personality;
                let needs = candidate.personalityInsights.needs;
                let values = candidate.personalityInsights.values;

                let personalityPositiveMentions = candidate.personalityInsightsPositiveMentions.personality;
                let needsPositiveMentions = candidate.personalityInsightsPositiveMentions.needs;
                let valuesPositiveMentions = candidate.personalityInsightsPositiveMentions.values;

                let consumptionPreferences = candidate.personalityInsights.consumption_preferences;
                let positiveMentionsConsumptionPreferences = candidate.personalityInsightsPositiveMentions.consumption_preferences;

                // Get Personality
                personality.forEach(function(element) {
                    personalityInsights[element.name][candidate.frontendId] = element.percentile
                })
                needs.forEach(function(element) {
                    needsInsights[element.name][candidate.frontendId] = element.percentile
                })
                values.forEach(function(element) {
                    valuesInsights[element.name][candidate.frontendId] = element.percentile
                })

                // Get Personality Positive Mentions
                personalityPositiveMentions.forEach(function(element) {
                    personalityInsights[element.name][counter] = element.percentile
                })
                needsPositiveMentions.forEach(function(element) {
                    needsInsights[element.name][counter] = element.percentile
                })
                valuesPositiveMentions.forEach(function(element) {
                    valuesInsights[element.name][counter] = element.percentile
                })

                consumptionPreferences.forEach( (consumptionPreference) => {
                    consumptionPreference.consumption_preferences.forEach((singleConsumptionPreference) => {
                        let object = {name: singleConsumptionPreference.name, score: singleConsumptionPreference.score}
                        consumptionPreferenceMap[candidate.frontendId].push(object);
                    })
                })

                positiveMentionsConsumptionPreferences.forEach( (consumptionPreference) => {
                    consumptionPreference.consumption_preferences.forEach((singleConsumptionPreference) => {
                        let object = {name: singleConsumptionPreference.name, score: singleConsumptionPreference.score}
                        consumptionPreferenceMap[counter].push(object);
                    })
                })

                counter++;

            })
        ;

        for(var key in personalityInsights) {
            personalityInsightsArray.push({
                name: key,
                1: personalityInsights[key]['1'],
                2: personalityInsights[key]['2'],
                3: personalityInsights[key]['3'],
                4: personalityInsights[key]['4'],
                5: personalityInsights[key]['5'],
                6: personalityInsights[key]['6']
            })
        }

        for(var key in valuesInsights) {
            valuesInsightsArray.push({
                name: key,
                1: valuesInsights[key]['1'],
                2: valuesInsights[key]['2'],
                3: valuesInsights[key]['3'],
                4: valuesInsights[key]['4'],
                5: valuesInsights[key]['5'],
                6: valuesInsights[key]['6'],
            })
        }

        for(var key in needsInsights) {
            needsInsightsArray.push({
                name: key,
                1: needsInsights[key]['1'],
                2: needsInsights[key]['2'],
                3: needsInsights[key]['3'],
                4: needsInsights[key]['4'],
                5: needsInsights[key]['5'],
                6: needsInsights[key]['6'],
            })
        }


        return res.status(200).send({
            candidates : candidates,
            personalityInsights: personalityInsightsArray,
            needsInsights: needsInsightsArray,
            valuesInsights: valuesInsightsArray,
            consumptionPreferences: consumptionPreferenceMap,
        })

    })
}



exports.createCandidate     = (req,res) =>{
    if(!req.body.firstName) return res.status(400).send({err:"First Name required"});
    if(!req.body.lastName)  return res.status(400).send({err:"Last Name required"});
    if(!req.body.party)     return res.status(400).send({err:"Party required"});
    if(!req.body.twitter_screenName) return res.status(400).send({err:"Twitter screen name required"});
    if(!req.body.fb_screenName) return res.status(400).send({err:"Fb screen name required"});
    if(!req.body.yt_screenName) return res.status(400).send({err:"YT screen name required"});


    let candidate = new Candidate();
    candidate.firstName = req.body.firstName;
    candidate.lastName  = req.body.lastName;
    candidate.party     = req.body.party;
    candidate.twitter_screenName    = req.body.twitter_screenName;
    candidate.fb_screenName = req.body.fb_screenName;

    candidate.save(
        (err) => {
            if(err){
                return res.status(500).json(err);
            }
            return res.status(200).send({msg:"Candidate successfully created"});
        }
    );
}
