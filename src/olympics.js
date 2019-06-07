const aE = require("../jsonData/atheleteEvents.json"); // aE = Athlete Events
const nR = require("../jsonData/nocRegions.json");     // nR = NOC Regions

// Number of times olympics hosted per city over the years ---- bar chart

module.exports.problem1 = function() {
    const result = aE.reduce((acc, currRow, idx) => {
        if(acc.hasOwnProperty(currRow.City) && !(acc[currRow.City].Games.includes(currRow.Games))) {
            acc[currRow.City].count += 1;
            acc[currRow.City].Games.push(currRow.Games);
        } else if(!(acc.hasOwnProperty(currRow.City))){
            acc[currRow.City] = {
                Games: [currRow.Games],
                count: 1,
            };
        }
        return acc;
    }, {});
    return result;
};