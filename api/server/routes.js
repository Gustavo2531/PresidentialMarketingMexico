let candidate   = require('./routes/candidate.routes');
let discovery   = require('./routes/discovery.routes');
const python    = require('./routes/python.routes');

let api_version = '1'

let api_routes = function(app){
    app.use(`/api/v${api_version}`, candidate);
    app.use(`/api/v${api_version}`, discovery);
    app.use(`/api/v${api_version}`, python);
};

module.exports = api_routes;
