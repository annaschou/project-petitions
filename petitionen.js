(function(){

  let margin = { top: 50, left: 10, right: 20, bottom: 50 }

  let height = 150 - margin.top - margin.bottom
  let width = 680 - margin.left - margin.right

// Create SVG  

// Chart 1
let svgPer = d3
  .select('#class-per')
  .append('svg')
  .attr('width', '100%')
  .attr('height', 'auto')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
let gPer = svgPer.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


// Chart 2
let svgAbs = d3
  .select('#class-abs')
  .append('svg')
  .attr('width', '100%')
  .attr('height', 'auto')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
let gAbs = svgAbs.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


// Chart 3
let svgFilter = d3
  .select('#class-filter')
  .append('svg')
  .attr('width', '100%')
  .attr('height', 'auto')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
let gFilter = svgFilter.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Build Scales 
     
  let xPositionScalePer = d3.scaleLinear().domain([0, 13.73]).range([0, width])
  let xPositionScaleAll = d3.scaleLinear().domain([0, 1759]).range([0, width])
  let xPositionScaleFilter = d3.scaleLinear().domain([0, 135]).range([0, width])
  let colorScale = d3.scaleOrdinal().domain(['Stop', 'No', 'Against', 'Ban', 'Safe', 'Yes', 'Pro', 'Better']).range(['#792e1d', '#ff7453', '#ffae95','#d1462b','#0b5006', '#006001', '#d7e4d3', '#8aae7f'])

// Define data 

  let mood = [ 
          { all: 1759,filter: 135,percentage: 7.67, label: "Stop"},
          { all: 84,filter: 7,percentage: 8.33, label: "No"},
          { all: 517,filter: 30,percentage: 5.80, label: "Against"},
          { all: 417,filter: 32,percentage: 7.67, label: "Ban"},
          { all: 153, filter: 21,percentage: 13.73, label: "Safe"},
          { all: 55,filter: 2,percentage: 3.64, label: "Yes"},
          { all: 745,filter: 46,percentage: 6.17, label: "Pro"},
          { all: 233,filter: 3,percentage: 1.29, label: "Better"}
        ];

 //    D3 

gPer.selectAll('circle')
  .data(mood)
  .enter().append('circle')
  .attr('cx', function(d){
    return xPositionScalePer(d.percentage)
  })
  .attr('cy', 0)
  .attr('r', 10)
  .attr('fill', function(d){
    return colorScale(d.label)
  })
  .attr('opacity', 0.7)
  .attr('stroke', 'white')
  .on("mouseover", handleMouseOverPer)
  .on("mousemove", handleMouseMove)
  .on("mouseout", handleMouseOut);


gAbs.selectAll('circle')
  .data(mood)
  .enter().append('circle')
  .attr('cx', function(d){
    return xPositionScaleAll(d.all)
  })
  .attr('cy', 0)
  .attr('r', 10)
  .attr('fill', function(d){
    return colorScale(d.label)
  })
  .attr('opacity', 0.7)
  .attr('stroke', 'white')
  .on("mouseover", handleMouseOverAll)
  .on("mousemove", handleMouseMove)
  .on("mouseout", handleMouseOut);

gFilter.selectAll('circle')
  .data(mood)
  .enter().append('circle')
  .attr('cx', function(d){
    return xPositionScaleFilter(d.filter)
  })
  .attr('cy', 0)
  .attr('r', 10)
  .attr('fill', function(d){
    return colorScale(d.label)
  })
  .attr('opacity', 0.7)
  .attr('stroke', 'white')
  .on("mouseover", handleMouseOverFilter)
  .on("mousemove", handleMouseMove)
  .on("mouseout", handleMouseOut);


// Tooltip 

function handleMouseOverPer(event, d) {
  d3.select("#tooltip")
    .style("opacity", 1)
    .html(`<strong>${d.label}</strong><br>${d.percentage}`);
}

function handleMouseOverAll(event, d) {
  d3.select("#tooltip")
    .style("opacity", 1)
    .html(`<strong>${d.label}</strong><br>${d.all}`);
}

function handleMouseOverFilter(event, d) {
  d3.select("#tooltip")
    .style("opacity", 1)
    .html(`<strong>${d.label}</strong><br>${d.filter}`);
}

function handleMouseMove(event, d) {
  d3.select("#tooltip")
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 20) + "px");
}

function handleMouseOut(event, d) {
  d3.select("#tooltip")
    .style("opacity", 0);
}


// Axes 


let xAxis = d3.axisBottom(xPositionScalePer)
gPer
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + 20 + ')')
    .call(xAxis)

let xAxisAll = d3.axisBottom(xPositionScaleAll)
gAbs
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + 20 + ')')
    .call(xAxisAll)   

let xAxisFilter = d3.axisBottom(xPositionScaleFilter)
gFilter
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + 20 + ')')
    .call(xAxisFilter) 


})()