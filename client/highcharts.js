// Number of times olympics hosted per city over the years ---- bar chart

fetch("../jsonData/perCityStat.json")
  .then(response => response.json())
  .then(data => chartForGamesPerCity(data));

function chartForGamesPerCity(result) {
  let data = Object.entries(result);
  let seriesData = data.reduce((acc, currVal, index) => {
    let cityArray = [];
    cityArray.push(currVal[0]);
    cityArray.push(currVal[1].count);
    acc.push(cityArray);
    return acc;
  }, []);

  let cityData = seriesData;

  Highcharts.chart("cityStats", {
    chart: {
      type: "column"
    },
    title: {
      text: "Number of times Olympics hosted per City"
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif"
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: ""
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: "Population",
        data: cityData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          align: "right",
          // format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif"
          }
        }
      }
    ]
  });
}

// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze

fetch("../jsonData/topTenCountriesMedals.js")
  .then(response => response.json())
  .then(data => chartForTopTenCountryMedals(data));

function chartForTopTenCountryMedals(result) {
  let seriesData = result.reduce(
    (acc, currVal, index) => {
      acc["Countries"].push(currVal[0]);
      acc["Gold"].push(currVal[1].Gold);
      acc["Silver"].push(currVal[1].Silver);
      acc["Bronze"].push(currVal[1].Bronze);
      return acc;
    },
    {
      Countries: [],
      Gold: [],
      Silver: [],
      Bronze: []
    }
  );

  let data = seriesData;

  Highcharts.chart("topTenCountryByMedals", {
    chart: {
      type: "column"
    },
    title: {
      text: "Top 10 countries who have won most medals after 2000"
    },
    xAxis: {
      categories: data["Countries"],
      title: {
        text: "Country"
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "No. of Medals"
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray"
        }
      }
    },
    legend: {
      align: "right",
      x: -30,
      verticalAlign: "top",
      y: 25,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: "Gold",
        data: data["Gold"]
      },
      {
        name: "Silver",
        data: data["Silver"]
      },
      {
        name: "Bronze",
        data: data["Bronze"]
      }
    ]
  });
}

// M/F PARTICIPATION BY DECADE - column chart

fetch("../jsonData/genderByDecade.json")
  .then(response => response.json())
  .then(data => genderByDecade(data));

function genderByDecade(result) {
  let resultArray = Object.entries(result);
  let seriesData = resultArray.reduce(
    (acc, currVal, index) => {
      acc.Decade.push(currVal[0]);
      acc.M.push(currVal[1].M);
      acc.F.push(currVal[1].F);
      return acc;
    },
    {
      Decade: [],
      M: [],
      F: []
    }
  );

  let data = seriesData;

  Highcharts.chart("genderByDecade", {
    chart: {
      type: "column"
    },
    title: {
      text: "Male/Female participation in Olympics per Decade"
    },
    xAxis: {
      categories: data.Decade,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: "No. of Participants"
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: "Male",
        data: data.M
      },
      {
        name: "Female",
        data: data.F
      }
    ]
  });
}

// Per year average age of athletes who participated in Boxing Men’s Heavyweight - Line

fetch("../jsonData/perYearAvgAge.json")
  .then(response => response.json())
  .then(data => chartForAverageAge(data));

function chartForAverageAge(result) {
  let data = result.reduce((acc, currVal) => {
    acc[currVal[0]] = parseFloat(currVal[1].toFixed(2));
    return acc;
  }, {});

  let x = [
    {
      name: "Average Age",
      data: Object.values(data)
    }
  ];

  let y = Object.keys(data);

  Highcharts.chart("averageAge", {
    title: {
      text: "Average Age of ahtletes Olympics(Boxing: Heavy Weight)"
    },

    xAxis: {
      categories: y,
      title: {
        text: "Years"
      }
    },

    yAxis: {
      title: {
        text: "Age"
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },

    series: x,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  });
}

// Find out all medal winners from India per season - Table
