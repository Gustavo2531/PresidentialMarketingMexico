const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let QueryResult   =   new Schema(
    {
        // Candidate associated with this query
        candidate_id: {
            type : String,
            required : true
        },
        // Type of query to make analytics on the future
        type: {
            type : String,
            enum : ['top_news','news_sentiment_analysis'],
            required: true
        },
        // Date this query was made, we are going to make a query per day
        date : {
            type: Date,
            required: true
        },
        // Result Object stored
        result: {
            type: {},
            required: true
        }
    }

);

module.exports = mongoose.model('QueryResult', QueryResult);
