const csv = require('csvtojson');
const fs = require('fs');

const nR = require("../jsonData/nocRegions.json");     // nR = NOC Regions
const olympics = require('./olympics');

const csvFilePath = '../csvData/athlete_events.csv';

// function csvToJson(csvFilePath) {
//     let jsonData = csv().fromFile(csvFilePath);
// }
// function()

const aE = require("../jsonData/atheleteEvents.json"); // aE = Athlete Events

// Function to Write data to json file
writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, error => {
            if(error) reject(error);
            resolve('Data written'); 
        });
    });
};

// Number of times olympics hosted per city over the years ---- bar chart

let cityStatJson = '../jsonData/perCityStat.json';
let perCityStatData = olympics.perCityStat(aE);

writeFilePromise(cityStatJson, perCityStatData)
.then( result => console.log(result))
.catch( error => console.log(error));


// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze

let topCountryByMedalJson = '../jsonData/topTenCountriesMedals.js';
let topTenCountryMedals = olympics.countryMedals(aE, nR, 2000, 10);

writeFilePromise(topCountryByMedalJson, topTenCountryMedals)
.then( result => console.log(result))
.catch( error => console.log(error));


// M/F PARTICIPATION BY DECADE - column chart

let genderByDecadeJson = '../jsonData/genderByDecade.json';
let genderByDecadeResult = olympics.genderByDecade(aE);

writeFilePromise(genderByDecadeJson, genderByDecadeResult)
.then( result => console.log(result))
.catch( error => console.log(error));


// Per year average age of athletes who participated in Boxing Men’s Heavyweight - Line

let avgAgeDataJson = '../jsonData/perYearAvgAge.json';
let avgAgeData = olympics.averageAge(aE, "Boxing Men's Heavyweight");

writeFilePromise(avgAgeDataJson, avgAgeData)
.then( result => console.log(result))
.catch( error => console.log(error));
