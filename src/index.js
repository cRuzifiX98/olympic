const fs = require('fs');
const aE = require("../jsonData/atheleteEvents.json"); // aE = Athlete Events
const nR = require("../jsonData/nocRegions.json");     // nR = NOC Regions
const olympics = require('./olympics');


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

let file1 = '../jsonData/perCityStat.json';
let perCityStatData = olympics.getPerCityStatData(aE);

writeFilePromise(file1, perCityStatData)
.then( result => console.log(result))
.catch( error => console.log(error));


// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze

let file2 = '../jsonData/topTenCountriesMedals.js';
let topTenCountryMedals = olympics.getCountryMedalsData(aE, nR, 2000, 10);

writeFilePromise(file2, topTenCountryMedals)
.then( result => console.log(result))
.catch( error => console.log(error));


// M/F PARTICIPATION BY DECADE - column chart

let file3 = '../jsonData/genderByDecade.json';
let genderByDecade = olympics.getGenderParticipationData(aE);

writeFilePromise(file3, genderByDecade)
.then( result => console.log(result))
.catch( error => console.log(error));


// Per year average age of athletes who participated in Boxing Men’s Heavyweight - Line

let file4 = '../jsonData/perYearAvgAge.json';
let avgAgeData = olympics.getAverageAgeData(aE, "Boxing Men's Heavyweight");

writeFilePromise(file4, avgAgeData)
.then( result => console.log(result))
.catch( error => console.log(error));
