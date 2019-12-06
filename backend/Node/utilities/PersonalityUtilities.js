const Twit  = require("twit");
const fs = require('fs');
const path = require('path');
const profileInsightHelper = require('../personalityInsight.js');
const profileFromText = profileInsightHelper.profileFromText;
require('dotenv').config({path: __dirname + '/.env'})


class PersonalityUtilites {
    getPersonalityInsight(filename, tweets){
        var fileStream = fs.createWriteStream(path.join(__dirname, "..", "..", "..","datasets", `${filename}.txt`), {flags: "a"});
        var filePath = path.join(__dirname,"..", "..", "..", "datasets")
        console.log("File path "+ filePath);
        fs.readFile( filePath + `/${tweets}.txt`, function (err, data) {
            if (err) {
                console.log("error");
                throw err;
           }
            profileFromText({language: "es", text: data.toString()}).then(
            function success(res){
                console.log(filename+" Saved successfully");
                fileStream.write(JSON.stringify(res)+ "\n");

                },
            function error(res){
                console.log(res);
            });
        });

    }

    getPersonalityInsightWithConsumerNeeds(filename,tweets){
        var fileStream = fs.createWriteStream(path.join(__dirname, "..", "..", "..","datasets", `${filename}.txt`), {flags: "a"});
        var filePath = path.join(__dirname,"..", "..", "..", "datasets")
        console.log("File path "+ filePath);
        fs.readFile( filePath + `/${tweets}.txt`, function (err, data) {
            if (err) {
                console.log("error");
                throw err;
           }
            profileFromText({language: "es", text: data.toString(), consumption_preferences: true, accept_language: "es"}).then(
            function success(res){
                console.log(filename+" Saved successfully");
                fileStream.write(JSON.stringify(res)+ "\n");

                },
            function error(res){
                console.log(res);
            });
        });
    }

}

module.exports = PersonalityUtilites;
