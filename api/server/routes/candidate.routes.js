let router  =   require('express').Router();
let CandidateController = require('../controllers/candidate.controller.js');
const jsonParser = require('body-parser').json();

router.route('/candidates')
    .get(jsonParser, CandidateController.getAllCandidates);

router.route('/candidate')
    .post(jsonParser, CandidateController.createCandidate);

router.route('/candidate/:id')
    .get(jsonParser, CandidateController.getCandidate);

module.exports = router;
