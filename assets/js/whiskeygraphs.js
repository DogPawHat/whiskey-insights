$(document).ready(function() {
    // console.log( "ready!" );

queue()
    .defer(d3.csv, "assets/data/whiskey-insight.csv")
    .await(getCountryData);
    
// We create a variable with an object (whiskeyBubbles) to determine the number of bottles per country,
// and a variable with a number (whiskeyTotal), to calculate the total of bottles reviewd

var whiskeyBubbles = new Object();

var whiskeyTotal = 0;

function getCountryData(error, whiskeyData) {
    for (i = 0; i < whiskeyData.length; i++) {
      
        // console.log(whiskeyData[i]["Country"]);
        
        if (whiskeyData[i]["Country"] in whiskeyBubbles) {
            whiskeyBubbles[whiskeyData[i]["Country"]]++
            whiskeyTotal++;
        } else {
            whiskeyBubbles[whiskeyData[i]["Country"]] = 1;
            whiskeyTotal++;
        }
    }
    
    // console.log(whiskeyBubbles);
    
    // console.log(whiskeyTotal);
    
  // Below, we start to create the individual bubbles

  var bubble_map = new Datamap({
    element: document.getElementById("world-map"),
    geographyConfig: {
      popupOnHover: false,
      highlightOnHover: true
    },
    fills: {
      defaultFill: '#ff794d',
      BEL: 'red',
      CAN: 'purple',
      GBR: 'khaki',
      FIN: 'black',
      FRA: 'pink',
      IND: 'brown',
      IRL: 'green',
      JPN: 'orange',
      NLD: 'crimson',
      SCT: 'hotPink',
      ZAF: 'cyan',
      SWE: 'darkgreen',
      CHE: 'gold',
      TWN: 'indigo',
      AUS: 'lime',
      USA: 'blue',
      WLS: 'teal'
    }
  });
  
  // To calculate the radius, I've done a rule of three to help me scale them up 
  // because otherwise the bigger radius would make the chart impossible to read
  
  function calculateradius(countryTotal) {
    return countryTotal*100/whiskeyTotal;
  }
  
  bubble_map.bubbles([
    {
      name: 'Belgium',
      radius: calculateradius(whiskeyBubbles["Belgium"]),
      centered: 'BEL',
      bottles: whiskeyBubbles["Belgium"],
      country: 'BEL',
      fillKey: 'BEL',
    },{
      name: 'Canada',
      radius: calculateradius(whiskeyBubbles["Canada"]),
      centered: 'CAN',
      bottles: whiskeyBubbles["Canada"],
      country: 'CAN',
      fillKey: 'CAN',
    },{
      name: 'England',
      radius: calculateradius(whiskeyBubbles["England"]),
      // centered: 'GBR',
      bottles: whiskeyBubbles["England"],
      country: 'GBR',
      fillKey: 'GBR',
      latitude: 51.50,
      longitude: 0.12,
    },{
      name: 'Finland',
      radius: calculateradius(whiskeyBubbles["Finland"]),
      centered: 'FIN',
      bottles: whiskeyBubbles["Finland"],
      country: 'FIN',
      fillKey: 'FIN',
    },{
      name: 'France',
      radius: calculateradius(whiskeyBubbles["France"]),
      centered: 'FRA',
      bottles: whiskeyBubbles["France"],
      country: 'FRA',
      fillKey: 'FRA',
    },{
      name: 'India',
      radius: calculateradius(whiskeyBubbles["India"]),
      centered: 'IND',
      bottles: whiskeyBubbles["India"],
      country: 'IND',
      fillKey: 'IND',
    },{
      name: 'Ireland',
      radius: calculateradius(whiskeyBubbles["Ireland"]),
      centered: 'IRL',
      bottles: whiskeyBubbles["Ireland"],
      country: 'IRL',
      fillKey: 'IRL',
    },{
      name: 'Japan',
      radius: calculateradius(whiskeyBubbles["Japan"]),
      centered: 'JPN',
      bottles: whiskeyBubbles["Japan"],
      country: 'JPN',
      fillKey: 'JPN',
    },{
      name: 'Netherlands',
      radius: calculateradius(whiskeyBubbles["Netherlands"]),
      centered: 'NLD',
      bottles: whiskeyBubbles["Netherlands"],
      country: 'NLD',
      fillKey: 'NLD',
    },{
      name: 'Scotland',
      radius: calculateradius(whiskeyBubbles["Scotland"]),
      // centered: 'SCT',
      bottles: whiskeyBubbles["Scotland"],
      country: 'SCT',
      fillKey: 'SCT',
      latitude: 55.95,
      longitude: -3.18,
    },{
      name: 'South Africa',
      radius: calculateradius(whiskeyBubbles["South Africa"]),
      centered: 'ZAF',
      bottles: whiskeyBubbles["South Africa"],
      country: 'ZAF',
      fillKey: 'ZAF',
    },{
      name: 'Sweden',
      radius: calculateradius(whiskeyBubbles["Sweden"]),
      centered: 'SWE',
      bottles: whiskeyBubbles["Sweden"],
      country: 'SWE',
      fillKey: 'SWE',
    },{
      name: 'Switzerland',
      radius: calculateradius(whiskeyBubbles["Switzerland"]),
      centered: 'CHE',
      bottles: whiskeyBubbles["Switzerland"],
      country: 'CHE',
      fillKey: 'CHE',
    },{
      name: 'Taiwan',
      radius: calculateradius(whiskeyBubbles["Taiwan"]),
      centered: 'TWN',
      bottles: whiskeyBubbles["Taiwan"],
      country: 'TWN',
      fillKey: 'TWN',
    },{
      name: 'Australia (Tasmania)',
      radius: calculateradius(whiskeyBubbles["Tasmania"]),
      // centered: 'AUS',
      bottles: whiskeyBubbles["Tasmania"],
      country: 'AUS',
      fillKey: 'AUS',
      latitude: -41.45,
      longitude: 145.97,
    },{
      name: 'USA',
      radius: calculateradius(whiskeyBubbles["USA"]),
      centered: 'USA',
      bottles: whiskeyBubbles["USA"],
      country: 'USA',
      fillKey: 'USA',
    },{
      name: 'Wales',
      radius: calculateradius(whiskeyBubbles["Wales"]),
      // centered: 'WLS',
      bottles: whiskeyBubbles["Wales"],
      country: 'WLS',
      fillKey: 'WLS',
      latitude: 52.13,
      longitude: -3.78,
    }
  ], {
    popupTemplate: function(geo, data) {
      return '<div class="hoverinfo">Botles Reviewed: ' + data.bottles;
    }
  });
  
  // Now that the bubblechart is sorted, I'll work on the rest of the graphs

  var ndx = crossfilter(whiskeyData);
  
  // Because my numeric values are strings in whiskeyData, 
  // I need to turn them into numbers
  
  whiskeyData.forEach(function(d){
        d.MetaCritic = parseFloat(d.MetaCritic);
        d.STDEV = parseFloat(d.STDEV);
        d.Reviews = parseInt(d.Reviews);
    });
  
  // Below, a call to all the functions I'll need
  
  showPreferredFlavourProfiles(ndx);
  showMostDivisiveWhiskeys(ndx);
  showWhiskeyPriceRange(ndx);
  // showBestValueWhiskeys(ndx);
  
  dc.renderAll();

}
  
function showPreferredFlavourProfiles(ndx) {
  
  // var flavourProfileDim = ndx.dimension(dc.pluck("Cluster"));
  
  var flavourProfileDim = ndx.dimension(function(d) {
    if (d["Cluster"] !== "n/a") {
      return d["Cluster"];
    } 
  });
  
  var averageRatingByCluster = flavourProfileDim.group().reduce(
    function (p, v) {
      p.count++;
      p.total += v.MetaCritic;
      return p;
    },
    function (p, v) {
      p.count--;
      if (p.count == 0) {
        p.total = 0;
      } else {
        p.total -= v.MetaCritic;
      }
      return p;
    },
    function () {
      return {count: 0, total: 0};
    }
  );
  
  // PENDING - Add colour to the bars
  // PENDING - Add information on what does each cluster mean
  
  // var minRating = 0;
  // var maxRating = 10;
  

  dc.barChart("#preferred-flavour-profile")
    .width(850)
    .height(350)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .colorAccessor(function (d) {
      return d.key;
    })
    .ordinalColors(["#ff6600", "#cc5200", "#993d00", "#cc6600", "#ff8000", "#ff9933", "#ffb366", "#ff3300", "#b32400", "#ccff66", "#ccff33", "#cccc00", "#cc9900", "#996600"])
    .dimension(flavourProfileDim)
    .group(averageRatingByCluster)
    .valueAccessor(function (d) {
      
        var valueAverage = d.value.total / d.value.count;
      
        if (d.value.count == 0) {
            return 0;
        } else {
            return valueAverage.toFixed(2);
        }
    })
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel("Different Clusters (Sets of Flavour Profiles)")
    .yAxisLabel("Ratings from 0 to 10 Points")
    .yAxis().ticks(4);
}
  

// WORK IN PROGRESS - chart to show most divisive samples - START
// PENDING - Manage to get only the top 25 samples to be rendered in the scatter plot
// Create three colour categories for high, veryHigh and extreme standard deviations


function showMostDivisiveWhiskeys(ndx) {
    
  // Define vars, dimension and group

  var stdevColors = d3.scale.ordinal()
    .domain(function() {
      if (mostDivisiveDim.key[2] <= 1) {
        return "#cc6600";
      } else if ((mostDivisiveDim.key[2] = 1) && (mostDivisiveDim.key[2] <= 1.1)) {
        return "#ccff66";
      } else {
        return "#ff0000";
      }
    })
    .range(["#cc6600", "#ccff66", "#ff0000"]);
  
  // PENDING - Find a way to get "high" "very high" and "extreme" as 
  // categories with different colours (IDEA: To use var and if/else to
  // separate them and name them)
  
  // var stdevDim = ndx.dimension(dc.pluck("STDEV"));
  var stdevDim = ndx.dimension(function(d) {
    if (d["STDEV"] >= 0.91) {
      return [d["STDEV"], d["MetaCritic"], d["Whisky"]]; 
    }
  });
  // var topStdev = stdevDim.top(25);
  // console.log(topStdev);
  
  // var mostDivisiveDim = ndx.dimension(function(d) {
  //   return [d.STDEV, d.MetaCritic, d.Whisky];
  // });
    
  var mostDivisiveGroup = stdevDim.group();
  
  
  console.log(stdevDim.bottom(10)[0]);

  // PENDING - Change the hardcode of the range to programatic calculation
  var minStdev = stdevDim.bottom(1)[0]["STDEV"];
  var maxStdev = stdevDim.top(1)[0]["STDEV"];

// Render chart
  dc.scatterPlot("#most-divisive-whiskeys")
    .width(800)
    .height(400)
    // .x(d3.scale.ordinal().domain([minStdev, maxStdev]))
    .x(d3.scale.linear().domain([0.85, 5]))
    .brushOn(false)
    .symbolSize(8)
    .clipPadding(10)
    .yAxisLabel("Rating")
    .xAxisLabel("Standard Deviation")
    .title(function (d) {
        return d.key[2] + " has a STDEV of " + d.key[0] + " and a rating of " + d.key[1];
    })
    // .colorAccessor(function (d) {
    //     return d.key[3];
    // })
    // .colors(genderColors)
    .dimension(stdevDim)
    .group(mostDivisiveGroup)
    .margins({top: 10, right: 50, bottom: 75, left: 75});
}
  

  // WORK IN PROGRESS - chart to show most divisive samples - END 
  
  // Now we'll try to find the best rated whiskeys in the different price groups
  // We'll start with a selector
  
  function showWhiskeyPriceRange(ndx) {
    var priceDim = ndx.dimension(dc.pluck("Cost"));
    var priceSelect = priceDim.group();

    dc.selectMenu("#best-value-whiskeys")
      .dimension(priceDim)
      .group(priceSelect);
  }
  
  // Now, we'll folow by creating tables that will show when selecting the 
  // different price ranges - START
  
//   function showBestValueWhiskeys(ndx){
//     var whiskeyPriceDim = ndx.dimension(dc.pluck("Cost"));
//     var bestRatedPerPrice = whiskeyPriceDim.group.reduce(
//       function (p, v) {
//         ++p.number;
//         p.total += +v.Speed;
//         p.avg = Math.round(p.total / p.number);
//         return p;
//       },
//       function (p, v) {
//         --p.number;
//         p.total -= +v.Speed;
//         p.avg = (p.number == 0) ? 0 : Math.round(p.total / p.number);
//         return p;
//       },
//       function (p, v) {
//         return {number: 0, total: 0, avg: 0};
//       });
//   rank = function (p) { return "rank" };
   
// chart
//   .width(768)
//   .height(480)
//   .dimension(groupedDimension)
//   .group(rank)
//   .columns([function (d) { return d.key },
//             function (d) { return d.value.number },
//             function (d) { return d.value.avg }])
//   .sortBy(function (d) { return d.value.avg })
//   .order(d3.descending)
//   chart.render();
//   } 
    
});