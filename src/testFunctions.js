
// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze
module.exports.prob2 = function(aE, yearAfter) {

    let sortedData = aE.sort((athlete1, athlete2) => {
       return  athlete2.Year - athlete1.Year;
    });

    let miniData = sortedData.slice(0, (sortedData) => {
        sortedData.find()
    });

    let result = sortedData.reduce((acc, currRow, idx) => {
        if( currRow.Year > yearAfter ) {
            s
        }
    }, {});
    
}


// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze

//--------------------------------------------------
//Sort Data
module.exports.sortData = function(array) {
    let sortedData = array.sort((athlete1, athlete2) => {
        return (athlete2.Year - athlete1.Year);
     });
     return sortedData;
};
//---------------------------------------------------
//Compress Data
module.exports.compressData = function endIndex(sortedData, yearAfter) {
    function paramToFindIndex(sortedData) {
        return sortedData.Year <= yearAfter;
    }
    return sortedData.slice( 0 , sortedData.findIndex(paramToFindIndex) );
};
//----------------------------------------------------
