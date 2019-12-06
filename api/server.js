require('dotenv').load();
const express           = require('express');
const methodOverride    = require('method-override');
const routes            = require('./server/routes');
const app               = express();
const PORT              = process.env.PORT || 8080;
const middlewares       = require('./server/middlewares/custom.middleware')
const Candidate         = require('./server/models/Candidate')
require('./server/config/db');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(middlewares.logRequest)
routes(app);


app.listen(PORT,()=>{
    console.log('Server running on Port '+ PORT);
});
