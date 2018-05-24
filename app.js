var house_locations = [{'x':'250', 'y': '72'}, {'x':'436', 'y': '160'}, {'x':'308', 'y': '134'},{'x':'300', 'y':'50'},{'x':'436', 'y': '32'},
                    {'x':'187', 'y': '162'},{'x':'123', 'y': '21'}, {'x':'380', 'y': '121'},{'x':'150', 'y': '88'}];
var stacking =[{'x1':'104', 'x2':'310', 'y1':'200', 'y2': '114'},{'x1':'260', 'x2':'310', 'y1':'15', 'y2': '115'},
                {'x1':'420', 'x2':'330', 'y1':'200', 'y2': '125'},{'x1':'330', 'x2':'475', 'y1':'125', 'y2': '15'} ]
var district1 = [['10','10'],['10','200'],['310','125']]
//Draw box
var svg = d3.selectAll('div#compactness')
            .append('svg')
            .attr('width', '600px')
            .attr('height', '220px')
            .attr('display', 'block')
            .attr('margin', 'auto')
            .style('overflow', 'visible')
    d3.select('svg')
        .append('svg:image')                
        .attr("xlink:href",function(d) {return"images/plot.svg"})
        .attr('x', '0')
        .attr('y', '0')
        .attr('class','map')
    
    d3.select('svg')
        .append('svg:image')                
        .attr("xlink:href",function(d) {return"images/district1_blue.svg"})
        .attr('x', '0')
        .attr('y', '0')
        .attr('class', 'district1')
        .style('opacity', '0')
    d3.select('svg')
        .append('svg:image')                
        .attr("xlink:href",function(d) {return"images/district2_red.svg"})
        .attr('x', '0')
        .attr('y', '0')
        .style('opacity', '0')
        .attr('class', 'district2')
        
    d3.select('svg')
        .append('svg:image')                
        .attr("xlink:href",function(d) {return"images/district3_red.svg"})
        .attr('x', '0')
        .attr('y', '0')
        .style('opacity', '0')
        .attr('class', 'district3')
flashDistricts()

function flashDistricts(){
    d3.select('.district1')
    .transition()
    .duration(2000)
    .style('opacity', '1')
    .transition()
    .delay(1000)
    .duration(1000)
    .style('opacity', '0')
    d3.select('.district2')
    .transition()
    .delay(3000)
    .duration(2000)
    .style('opacity', '1')
    .transition()
    .duration(1000)
    .style('opacity', '0')
    d3.select('.district3')
    .transition()
    .delay(4000)
    .duration(2000)
    .style('opacity', '1')
    .transition()
    .duration(1000)
    .style('opacity', '0')
}
    
//drawHouses()
//drawBoundary()

//draw_people()

d3.select('svg')
    .append

function draw_people(){
    d3.select('svg')
    .selectAll('image')
    .data(house_locations)
    .enter()
    .append('svg:image')
    .attr("xlink:href", function(d, i){if ( i == 0) {return"images/male_speaker.svg"}else  if(i ==1){return "images/woman_speaker.svg"}})
    .attr('width', '50px')
    .attr('height', '50px')
    .attr('x', function(d){return d['x']})
    .attr('y', function(d){return d['y']})
    }


function drawHouses(){
    d3.select('svg')
    .selectAll('image')
    .data(house_locations)
    .enter()
    .append('svg:image')
    .attr("xlink:href", function(d, i){if ( i % 2 == 0) {return"images/house_blue.svg"}else {return "images/house_red.svg"}})
    .attr('width', '50px')
    .attr('height', '50px')
    .attr('x', function(d){return d['x']})
    .attr('y', function(d){return d['y']})
    }

function drawBoundary(){
    var boundary =  d3.select('svg')
    .selectAll('line')
    .data(stacking)
    .enter()
    .append('line')
    .style('opacity', '1')
    .attr('x1', function(d){return d['x1']})
    .attr('x2', function(d){return d['x1']})
    .attr('y1', function(d){return d['y1']})
    .attr('y2', function(d){return d['y1']})
    .attr('stroke', 'black')
    .attr('stroke-dasharray', '10,10')
    .attr('stroke-width', '1')
repeat();
function repeat(){
    boundary
    .attr('stroke-width', '1')
    .attr('stroke-dasharray', '10,10')
    .attr('x1', function(d){return d['x1']})
    .attr('x2', function(d){return d['x1']})
    .attr('y1', function(d){return d['y1']})
    .attr('y2', function(d){return d['y1']})
    .transition()
    .duration(3000)
    .attr('x1', function(d){return d['x1']})
    .attr('x2', function(d){return d['x2']})
    .attr('y1', function(d){return d['y1']})
    .attr('y2', function(d){return d['y2']})
    .transition()
    .duration(3000)
    .on('end', repeat)
}
}