const router            = require('express').Router();
const PythonController  = require('../controllers/python.controller');
const jsonParser        = require('body-parser').json();

router.route('/python/predictTweet')
    .post(jsonParser, PythonController.predictTweet);

module.exports = router;
