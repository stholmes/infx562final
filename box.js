var width = 600;
  var height = 300;
  var barWidth = 30;

  var margin = {top: 20, right: 10, bottom: 20, left: 10};

 ;



d3.csv('box.csv', function(d){
    return {
    state : d.state,
    districts : +d.districts,
    polsby : +d.polsby,
    schwartzberg : +d.schwartzberg,
    convex : +d.convex,
    reock : +d.reock,
}
}).then(function(data){
    generate(data)
});
function generate(data){
    var svg = d3.select('div.box').append('svg')
        .attr('height', height)
        .attr('width', width)
        .style('overflow', 'visible')
    var x_type = 'count'
    var measurement = "reock"
    //scale
    var x_max = d3.max(data, function(d){return d.districts})
    var x_min = d3.min(data, function(d){return d.districts})
    var x_scale = d3.scaleLinear()
                .domain([0,(x_max + 10)])
                .range([0, width-25])
    var y_max = d3.max(data, function(d){return d.reock}) 
    var y_min = d3.min(data, function(d){return d.reock}) 
    var y_scale = d3.scaleLinear()
                .domain([0,(y_max+10)])
                .range([height-25, 25])
    var state_scale = d3.scaleBand()
                    .domain(['Alabama','Arizona', 'Arkansas','California','Colorado','Connecticut','Florida','Georgia','Hawaii',
                        'Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana', 'Maine', 'Maryland', 'Massachusetts',
                        'Michigan', 'Minnesota', 'Mississippi', 'Missouri','Nebraska', 'Nevada', 'NewHampshire','NewJersey',
                        'NewMexico', 'NewYork','NorthCarolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'RhodeIsland',
                        'SouthCarolina', 'Tennessee', 'Texas','Utah', 'Virginia', 'Washington', 'WestVirginia','Wisconsin'])
                    .range([0,width])
    var y_axis = d3.axisLeft(y_scale)
    var state_axis = d3.axisBottom(state_scale)            
    var x_axis = d3.axisBottom(x_scale)
    
    //points
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d){return x_scale(d.districts)})
        .attr('cy', function(d) {return y_scale(d.reock)})
        .attr('r', 7)
        .attr('class', function(d){return d.state})
        .attr('fill', function(d){if(d.state=="Maryland"){return "blue"}else{return '#D1AB0E'}})
      

        svg.append('g')
        .attr('class', 'y-axis')
        .call(y_axis)
        svg.append('text')
            .attr('class', 'ylegend')
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 50)
            .attr("x",0 - (150))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Compactness Score");   
        svg.append('text')
            .attr('class', 'xlegend')
            .attr("y", 325)
            .attr("x",150)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Districts per State")
            .style('margin-bottom', '15px')
            .style('margin-top', '30px'); 
    
        svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,'+(height-25) + ')') 
        .call(x_axis)
        svg.append('g')
            .attr('class', 'state')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function(d){
                return d.state + ': ' + d[measurement]})  
            .attr('x', function(d){return x_scale(d.districts)})
            .attr('y', function(d) {return y_scale(d[measurement])}) 
            .attr('class', function(d){return d.state})
            .style('opacity', 1)  
            .style('font-size', '12px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
    
            
           
    //events
    d3.select('div.measurebtn').selectAll('input').on('change', function(){
        x_type = this.value
        if(this.value == 'bystate'){
        d3.select('g.x-axis').remove()
        svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,'+(height-25) + ')') 
        .call(state_axis)
        .selectAll('text')
        .attr('transform', 'rotate(90)')
        .style('text-anchor', 'start')
        .attr('x', 10)
        d3.select('.xlegend')
            .text('State')
        svg.selectAll('circle')
            .transition()
            .duration(2000)    
            .attr('cx', function(d){ return state_scale(d.state)})
            svg.select('g.state')
            .selectAll('text')
            .text(function(d){
                return d.state + ': ' + d[measurement]})  
            .attr('y', function(d) {return y_scale(d[measurement])}) 
            .attr('x', function(d){if(x_type == 'bystate'){return state_scale(d.state)}else{return x_scale(d.districts)}})}
        else{
            d3.select('g.x-axis').remove()
        svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,'+(height-25) + ')') 
        .call(x_axis)
        d3.select('.xlegend')
            .text('Districts per State')
        svg.selectAll('circle')
            .transition()
            .duration(2000)    
            .attr('cx', function(d){ return x_scale(d.districts)})
            svg.select('g.state')
            .selectAll('text')
            .text(function(d){
                return d.state + ': ' + d[measurement]})  
            .attr('y', function(d) {return y_scale(d[measurement])}) 
            .attr('x', function(d){if(x_type == 'bystate'){return state_scale(d.state)}else{return x_scale(d.districts)}}) 
        }
    })
    svg.selectAll('circle').on('mouseover', function(){
        d3.select(this)
        .attr('fill', function(d){if(d.state=="Maryland"){return "blue"}else{return 'red'}})
            console.log(this)
        d3.select('div.box').selectAll("."+this.className['baseVal'])
       .style('opacity', 1)
    })

    svg.selectAll('circle').on('mouseout', function(){
        d3.select(this)
        .attr('fill', function(d){if(d.state=="Maryland"){return "blue"}else{return '#D1AB0E'}})
       d3.selectAll("text."+this.className['baseVal'])
          .style('opacity', 0)
    })

d3.select('div.measurebtn').selectAll('button').on('click', function(){
    create_graph(this.className)
    measurement = this.className
    d3.select('div.measurebtn').selectAll('button')
        .style('pointer-events', 'auto')
        .style('opacity', function(d){if (this.className == measurement){return .5} else{return 1}})


})


function create_graph(measurement){
    var y_max = d3.max(data, function(d){return d[measurement]}) 
    var y_min = d3.min(data, function(d){return d[measurement]}) 
    var y_scale = d3.scaleLinear()
                .domain([0,y_max+10])
                .range([height-25, 25])

    var y_axis = d3.axisLeft(y_scale)
   
    svg.selectAll('circle')
        .transition()
        .duration(2000)
        .attr('cx', function(d){if(x_type == 'bystate'){return state_scale(d.state)}else{return x_scale(d.districts)}})
        .attr('cy', function(d) {return y_scale(d[measurement])})
        .attr('r', 7)
        .attr('fill', function(d){if(d.state=="Maryland"){return "blue"}else{return '#D1AB0E'}})
    d3.select('g.y-axis')
        .attr('class', 'y-axis')
        .call(y_axis)
    svg.select('g.state')
        .selectAll('text')
        .text(function(d){
            return d.state + ': ' + d[measurement]})  
        .attr('y', function(d) {return y_scale(d[measurement])}) 
        .attr('x', function(d){if(x_type == 'bystate'){return state_scale(d.state)}else{return x_scale(d.districts)}})

            }
           
        
}
            
