const router                = require('express').Router();
const DiscoveryController   = require('../controllers/discovery.controller');
const jsonParser            = require('body-parser').json();

router.route('/discovery/topStories')
    .post(jsonParser, DiscoveryController.getTopStories);

router.route('/discovery/newsSentimentAnalysis')
    .post(jsonParser, DiscoveryController.getNewsSentimentAnalysis);

router.route('/discovery/trendsAndAnomalies')
    .post(jsonParser, DiscoveryController.getAnomaliesAndTrends);

module.exports = router;
