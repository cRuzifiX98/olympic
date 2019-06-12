// Number of times olympics hosted per city over the years ---- bar chart

fetch("../jsonData/perCityStat.json")
.then(response => response.json())
.then(data => chartForGamesPerCity(data));

function chartForGamesPerCity(result) {
    let cityData = result;
    console.log(cityData);
    
Highcharts.chart('Problem1', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Number of times Olympics hosted per City'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Population',
        data: cityData,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            // format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});    
}


// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze

fetch("../jsonData/topTenCountriesMedals.js")
.then(response => response.json())
.then(data => chartForTopTenCountryMedals(data));

function chartForTopTenCountryMedals(data) {

    Highcharts.chart('Problem2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top 10 countries who have won most medals after 2000'
        },
        xAxis: {
            categories: data["Countries"],
            title: {
            text: 'Country'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'No. of Medals'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Gold',
            data: data['Gold']
        }, {
            name: 'Silver',
            data: data['Silver']
        }, {
            name: 'Bronze',
            data: data['Bronze']
        }]
    });
}


// M/F PARTICIPATION BY DECADE - column chart

Highcharts.chart('Problem3', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Male/Female participation in Olympics per Decade'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'No. of Participants'
        }
    },
    // tooltip: {
    //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //         '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //     footerFormat: '</table>',
    //     shared: true,
    //     useHTML: true
    // },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Male',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    }, {
        name: 'Female',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

    }]
});


// Per year average age of athletes who participated in Boxing Men’s Heavyweight - Line

fetch("../jsonData/perYearAvgAge.json")
.then(response => response.json())
.then(data => chartForAverageAge(data));


function chartForAverageAge(data) {
    let x = [{
        name: 'Average Age',
        data: Object.values(data)
    }];

    // console.log(x)
    let y = Object.keys(data);

    Highcharts.chart('Problem4', {

        title: {
            text: 'Average Age of ahtletes Olympics(Boxing: Heavy Weight)'
        },
        
        xAxis: {
            title: {
                text: 'Years'
            },
            Categories: y
        },
        
        yAxis: {
            title: {
                text: 'Age'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
        
            }
        },
    
        series: x,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1000
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}


// Find out all medal winners from India per season - Table
