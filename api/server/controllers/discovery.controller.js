require('dotenv').load()

const DiscoveryV1   = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  username: process.env.discoveryUsername,
  password: process.env.discoveryPassword,
  version_date: '2017-08-01'
});

exports.queryDiscovery = (req,res) => {
    discovery.query({
        environment_id: process.env.environmentId,
        collection_id: process.env.collectionId,
        query: 'AMLO'
    }, function (error, data) {
        return res.status(200).send(data)
    })
}

exports.getTopStories = (req, res) => {
    if(!req.body.query) return res.status(400).send({err: "No query in body specified"})

    let params = {
        environment_id: process.env.environmentId,
        collection_id: process.env.collectionId,
        query: req.body.query,
        deduplicate: true,
        count: 5,
        return: "title, url, host, crawl_date"
    }

    discovery.query(params, function (err, data) {
        if(err) {
            console.log("Error on get Top Stories", JSON.stringify(err))
            return res.status(500).send(err)
        }

        return res.status(200).send(data)
    })
}

exports.getNewsSentimentAnalysis = (req, res) => {
    if(!req.body.query) return res.status(400).send({err: "No query in body specified"})

    let params = {
        environment_id: process.env.environmentId,
        collection_id: process.env.collectionId,
        query: req.body.query,
        aggregation: [
            "term(host).term(enriched_text.sentiment.document.label).term(enriched_text.sentiment.document.label)"
        ],
        return: "agregations"
    }

    discovery.query(params, function (err, data) {
        if(err) {
            console.log("Error on get News Sentiment Analysis", JSON.stringify(err))
            return res.status(500).send(err)
        }
        data = processNewsSentimentAnalysis(data.aggregations[0].results)
        return res.status(200).send({results: data})
    })

}

exports.getAnomaliesAndTrends = (req, res) => {
    if(!req.body.query) return res.status(400).send({err: "No query in body specified"})

    let today = new Date();
    let threeMonthsAgo = new Date();
    threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 90);

    let params = {
        environment_id: process.env.environmentId,
        collection_id: process.env.collectionId,
        query: req.body.query,
        filter: `crawl_date>${threeMonthsAgo.toISOString()}, crawl_date<${today.toISOString()}`,
        aggregation: [
            "timeslice(field:crawl_date,interval:1day,time_zone:America/Mexico_City,anomaly:true).term(enriched_text.keywords.text,count:1).term(title,count:1)"
        ]
    }

    discovery.query(params, function (err, data) {
        if(err) {
            console.log("Error on get News Sentiment Analysis", JSON.stringify(err))
            return res.status(500).send(err)
        }

        data = processTrends(data.aggregations[0].results)
        return res.status(200).send({results: data});

    })

}

function processTrends(results) {
    let finalResults = results.map( (result) => {
        let name = new Date(result.key_as_string).toDateString();
        let total = result.matching_results;
        let anomaly = result.anomaly ? result.anomaly : 0

        return {
            name: name,
            total: total,
            anomaly: anomaly
        }
    })

    return finalResults;
}

function processNewsSentimentAnalysis(results) {

    let finalResults = results.map( (result) => {
        let name = result.key;
        let total = result.matching_results;
        let totalPositive, totalNegative, totalNeutral;

        result.aggregations[0].results.forEach( (sentimentResult) => {
            if(sentimentResult.key == 'positive') {
                totalPositive = sentimentResult.matching_results
            } else if(sentimentResult.key == 'negative') {
                totalNegative = sentimentResult.matching_results
            } else if(sentimentResult.key == 'neutral') {
                totalNeutral  = sentimentResult.matching_results
            }
        })

        return {
            name: name,
            positive: totalPositive * 100 / total,
            negative: totalNegative * 100 / total,
            neutral: totalNeutral * 100 / total
        }
    })

    return finalResults;
}
