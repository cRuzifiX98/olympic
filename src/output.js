const aE = require("../jsonData/atheleteEvents.json"); // aE = Athlete Events
const nR = require("../jsonData/nocRegions.json");     // nR = NOC Regions
const result = require('./olympics');

//--------------------------------------------------------

// Problem 1
// console.log(result.perCityStat(aE));

//--------------------------------------------------------

//Problem 2
// console.log(result.countryMedals(aE, nR, 2000, 10));

//--------------------------------------------------------

//Problem 3
// console.log(result.genderByDecade(aE));

//--------------------------------------------------------------

//Problem 4
// console.log(result.averageAge(aE, "Boxing Men's Heavyweight"));

//--------------------------------------------------------------

// Problem 5
console.log(result.medalWinnersIndia(aE, 'IND'));



