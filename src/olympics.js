//  aE = Athlete Events
//  nR = NOC Regions

// Number of times olympics hosted per city over the years ---- bar chart

let perCityStat = function(aE) {
    const result = aE.reduce((acc, currRow) => {
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
    return JSON.stringify(result);
};

module.exports.perCityStat = perCityStat;


//-------------------------------------------------------------------------------------------------
// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze

//Filter, sort and compress data 
let compress = function(data, yearAfter) {
    let filterData = data.filter( (currRow) => currRow.Medal !== 'NA');
    let sortedData = filterData.sort((athlete1, athlete2) => {
        return (athlete2.Year - athlete1.Year);
    });
    function callBackForFindIndex(sortedData) {
        return sortedData.Year <= yearAfter;
    }
    let slicedData = sortedData.slice( 0 , sortedData.findIndex(callBackForFindIndex) );
    return slicedData;
};
// Main of Top 10
let countryMedals = function( aE, nR, yearAfter, top ) {
    let nocMap = nR.reduce( (acc, currRow) => {
        acc[currRow.NOC] = currRow.region;
        return acc;
    }, {} );
    let processedData = compress(aE, yearAfter);
    let allCountry = processedData.reduce( ( acc, currRow ) => {
        const country = nocMap[currRow['NOC']];           // Get country name for current row by referring to nocMap
        if( acc.hasOwnProperty(country) ) {               // checking if country key already exists in acc
            if( acc[ country ].hasOwnProperty(currRow.Medal) ) {  // checking for existencce of corresponding medal property in that country key
                acc[ country ].count += 1;
                acc[ country ][currRow.Medal] += 1;
            } else if( !(acc[country].hasOwnProperty(currRow.Medal)) ) {
                acc[ country ].count += 1;
                acc[country][currRow.Medal] = 1;
            }        
        } else if( !(acc.hasOwnProperty(country)) ){
            acc[country] = {};
            acc[country]['count'] = 1;
            acc[country][ currRow['Medal'] ] = 1;
        }
        return acc;
    }, {});    
    let result = ((Object.entries(allCountry)).sort( (country1, country2) => {
        return (country2[1].count - country1[1].count);
    })).slice(0, top);
    return JSON.stringify(result);
};

module.exports.countryMedals = countryMedals;


//----------------------------------------------------------------------------------
// M/F PARTICIPATION BY DECADE - column chart

let genderByDecade = function(aE) {
    let result = aE.reduce( (acc, currRow) => {
        let decade = (Math.floor(parseInt(currRow.Year) / 10)) * 10;
        let key = currRow.ID;  
        if( acc.hasOwnProperty(decade) )  {
            if( !(acc[decade]['tracker'].hasOwnProperty(key)) ) {
                acc[decade]['tracker'][key] = [];
            }
            if(!(acc[decade]['tracker'][key].includes(currRow.Games))) {
                acc[decade]['tracker'][key].push(currRow.Games);
                acc[decade][currRow.Sex] += 1;
            }
        } else if( !(acc.hasOwnProperty(decade)) ) {
            acc[decade] ={};
            acc[decade] = {
                M: 0,
                F: 0,
                tracker: {}
            };
            acc[decade]['tracker'][key] = [currRow.Games];
            acc[decade][currRow.Sex] += 1;
        }
        return acc;
    }, {});
    
    let resultArray = Object.entries(result);
    let reducedResult = resultArray.reduce( (acc, currVal) => {
        delete currVal[1]['tracker'];
        acc.push(currVal);
        return acc;
    }, []);
    return JSON.stringify(reducedResult);
};

module.exports.genderByDecade = genderByDecade;


//-------------------------------------------------------------------------------------
// Per year average age of athletes who participated in Boxing Men’s Heavyweight - Line

let averageAge = function(aE, event) {
    let filterData = aE.filter( (currRow) => (currRow.Event === event && currRow.Age !== 'NA') );
    let totalAgePerYear = filterData.reduce( (acc, currRow, index) => {
        if( acc.hasOwnProperty(currRow.Year)) {
            acc[currRow.Year]['Age'] += parseInt(currRow.Age);
            acc[currRow.Year]['count'] += 1;
        } else if( !(acc.hasOwnProperty(currRow.Year)) ) {
            acc[currRow.Year] = {};
            acc[currRow.Year]['Age'] = parseInt(currRow.Age);
            acc[currRow.Year]['count'] = 1;
        }
        return acc;
    }, {} );
    let yearArray = Object.entries(totalAgePerYear);
    let result = yearArray.map( (currElement) => {
        currElement[1] = (currElement[1].Age / currElement[1].count);
        return currElement;
    });

    return JSON.stringify(result);
};

module.exports.averageAge = averageAge;


//----------------------------------------------------------------------------------------

// Find out all medal winners from India per season - Table

let medalWinnersIndia = function(aE, country) {
    let filteredData = aE.filter( (currRow) => ((currRow.NOC === country) && (currRow.Medal !== 'NA')));
    let sortedData = filteredData.sort( (athlete1, athlete2) => {
        return athlete1.Year - athlete2.Year;
    });
    let result = sortedData.reduce( (acc, currRow) => {
        if(acc.hasOwnProperty(currRow.Games) && !(acc[currRow.Games].includes(currRow.Name))) {
            acc[currRow.Games].push(currRow.Name);
        } else  {
            acc[currRow.Games] = [];
            acc[currRow.Games].push(currRow.Name);
        }
        return acc;
    }, {});
    return result;
};

module.exports.medalWinnersIndia = medalWinnersIndia;
//----------------------------------------------------------
