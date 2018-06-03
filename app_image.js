var pictureArray = ['images/tisdale.png','images/gerrymandering.jpg']
var button_click = 0
var measure_text = ["Gerrymandering is measured by a district\'s compactness.","Compactness is the ratio of a district's area compared to the area of a similarly sized circle.", "The circle is drawn from a district's center to its furthest point.","The radii of these two circles is the same.",
                    "A compact district will have more whitespace, indicating gerrymandering is less likely."]
var measure_text2=["Here are two very differently shapped districts.","test"]
var related_text=['Tisdale\'s The Gerry-Mander from 1812.', 'Interactive map from fivethirtyeight.com.']

var svg = d3.select('div#related')
            .append('svg')
            .attr('width', '600px')
            .attr('height', '400px')


    svg.append('svg:image')
        .attr("xlink:href",'images/tisdale.png') 
        .attr('width', '600px')
        .attr('height', '400px')
        .style('opacity',1)
        
var svg2 = d3.select('div.measure')
                .append('svg')
                .attr('width', '600px')
                .attr('height', '300px')
                .style('display', 'block')
                .style('margin', 'auto')
var svg3 = d3.select('div.compact_state')
                .append('svg')
                .attr('width', '600px')
                .attr('height', '700px')
                .style('display', 'block')
                .style('margin', 'auto')
                .style('overflow', 'visible')
var svg4 = d3.select('div.solution')
                .append('svg')
                .attr('width', '600px')
                .attr('height', '400px')
                .style('display', 'block')
                .style('margin', 'auto')
                .style('margin-top', '30px')
                .style('overflow', 'visible')
    svg2.append('text')
        .append('tspan')
        .style('text-anchor', 'middle')
        .text(measure_text[0])
        .attr('y', 25)
        .attr('x', 300)
        .attr('class', 'toptext')
        .append('tspan')
        .style('text-anchor', 'middle')
        .attr('y',275)
        .attr('x',300)
        .attr('class', 'bottomtext')
        .text(measure_text2[0])
    svg2.append('circle')
        .attr('cx',100 )
        .attr('cy',150)
        .attr('r',1)
        .attr('id', 'circle1')
        .attr('stroke', 'black')
        .attr('stroke-width', '1px')
        .attr('fill-opacity', 0)
        .style('opacity',0)
    svg2.append('circle')
        .attr('cx',480 )
        .attr('cy',150)
        .attr('r',1)
        .attr('id', 'circle2')
        .attr('stroke', 'black')
        .attr('stroke-width', '1px')
        .attr('fill-opacity', 0)
        .style('opacity',0)
    svg2.append('svg:image')
        .attr("xlink:href", 'images/measure.svg')
        .attr('x',300)
        .attr('y',50)
        .attr('class', 'rect2')
        .style('opacity', 1)
    svg2.append('rect')
        .attr('height', 130)
        .attr('width', 150)
        .attr('fill', 'black')
        .attr('x',150)
        .attr('y',85)
        .attr('id', 'rect1')
    svg3.append('svg:image')
    .attr("xlink:href", 'images/compact_state.svg')
    .attr('x',-150)
    svg4.append('svg:image')
        .attr('xlink:href','images/current.jpg')    
    
   
        

//Events
d3.select('button.solution').on('click',function(){
    svg4.select('image')
    .attr('xlink:href','images/compact.jpg')
    d3.select('button.current')
        .style('opacity', 1)
    d3.select('button.solution')
        .style('opacity', .5)
    
})

d3.select('button.current').on('click', function(){
    
    svg4.select('image')
        .attr('xlink:href','images/current.jpg')
        d3.select('button.current')
        .style('opacity', .5)
    d3.select('button.solution')
        .style('opacity', 1)
        
    
})
d3.select('button.btnnext').on('click', function(){

    button_click = button_click + 1
    if(button_click > 5){
        button_click =5
    }
    
    animation(button_click)
    })

d3.select('button.btnreplay').on('click', function(){
    console.log('button')
    replay(button_click)
    button_click = button_click -1

})

function animation(button_click){
    button_lockout(button_click)
    if(button_click == 1){
        svg2.select('bottomtext')
            .text(measure_text2[button_click])
        svg2.select('.toptext')
            .text(measure_text[button_click])
        
        svg2.select('image')
            .transition()
            .duration(2000)
            .attr('x',400)
            .attr('y',50)
            .attr('id', 'step2' )
        svg2.select('rect')
            .transition()
            .duration(2000)
            .attr('x',25)
            .attr('id', 'step2')}
    else{if(button_click==2){
        svg2.select('.toptext')
            .text(measure_text[button_click])
        svg2.select('.bottomtext')
            .text(measure_text2[button_click])
        svg2.select('circle#circle1')
            .transition()
            .duration(2000)
            .attr('r',100)
            .style('opacity',1)
            .attr('fill', 'blue')
            .attr('fill-opacity',1)
            .transition()
            .duration(2000)
            .attr('fill-opacity', .75)
            .transition()
            .duration(1000)
            .attr('cx',100 )
            
        svg2.select('circle#circle2')
            .transition()
            .duration(2000)
                .attr('r',100)
            .style('opacity',1)
            .attr('fill', 'red')
            .attr('fill-opacity',1)
            .transition()
            .duration(1000)
            .attr('fill-opacity', .75)}
    else{if(button_click==3){
        svg2.select('.toptext')
            .text(measure_text[button_click])
            svg2.select('.bottomtext')
            .text(measure_text2[button_click])
        svg2.selectAll('circle')
            .transition()
            .duration(2000)
            .attr('cx', 300)}
    else{if(button_click==4){
        svg2.select('circle#circle1')
            .transition()
            .duration(1000)
            .attr('cx', 100)
        svg2.select('circle#circle2')
            .transition()
            .duration(1000)
            .attr('cx',480 )
        svg2.select('.toptext')
            .text(measure_text[button_click])
        svg2.select('.bottomtext')
            .text(measure_text2[button_click])
        svg2.select('rect')
            .transition()
            .delay(1250)
            .attr('fill', 'white')
        svg2.select('image')
            .transition()
            .delay(1250)
            .attr("xlink:href", 'images/measure_white.svg')}
    else{if(button_click==5){
        svg2.select('circle#circle1')
            .transition()
            .duration(1000)
            .attr('cx', 300)
        svg2.select('circle#circle2')
            .transition()
            .duration(1000)
            .attr('cx',300 )
        svg2.select('rect')
            .transition()
            .duration(1000)
            .attr("x",223)
            .style('opacity', 0)
        svg2.select('image')
            .transition()
            .duration(1000)
            .attr('x',223)
            
        

    }}}

    }}}


function replay(button_click){
    button_lockout(button_click)
    if(button_click == 1){
        svg2.select('.toptext')
            .text(measure_text[0])
        svg2.select('.bottomtext')
            .text(measure_text2[0])
        svg2.select('image')
            .transition()
            .duration(2000)
            .attr('x',300)
            .attr('y',50)
        svg2.select('rect')
            .transition()
            .duration(2000)
            .attr('x',150)}
    else{if(button_click==2){
        svg2.select('.toptext')
            .text(measure_text[button_click-1])
        svg2.select('.bottomtext')
            .text(measure_text2[button_click-1])
        svg2.selectAll('circle')
        .transition()
        .duration(2000)
        .attr('r',1)
        .attr('stroke', 'black')
        .attr('stroke-width', '1px')
        .attr('fill-opacity', 0)
        .style('opacity',0)}
    else{if(button_click==3){
        svg2.select('.toptext')
            .text(measure_text[button_click-1])
            svg2.select('.bottomtext')
            .text(measure_text2[button_click-1])
        svg2.select('circle#circle1')
            .transition()
            .duration(2000)
            .attr('cx', 100)
        svg2.select('circle#circle2')
            .transition()
            .duration(2000)
            .attr('cx',480)}
    else{if(button_click==4){
        svg2.select('.toptext')
            .text(measure_text[button_click-1])
            svg2.select('.bottomtext')
            .text(measure_text2[button_click-1])
        svg2.selectAll('circle')
            .transition()
            .duration(2000)
            .attr('cx', 300)
        svg2.select('rect')
            .transition()
            .attr('fill', 'black')
        svg2.select('image')
            .transition()
            .attr("xlink:href", 'images/measure.svg')}
        else{if(button_click==5){
        svg2.select('circle#circle1')
            .transition()
            .duration(1000)
            .attr('cx', 100)
        svg2.select('circle#circle2')
            .transition()
            .duration(1000)
            .attr('cx',480 )
        svg2.select('rect')
            .transition()
            .duration(1000)
            .attr("x",25)
            .style('opacity', 1)
        svg2.select('image')
            .transition()
            .duration(1000)
            .attr('x',400)
            
            }}}}
}}
        

       
function button_lockout(button_click){
    d3.select('button.btnreplay')
        .transition()
        .style('pointer-events', 'none')
        .style('opacity', .5)
        .transition()
        .delay(2000)
        .style('pointer-events', 'auto')
        .style('opacity', function(){
            if(button_click == 0){return .5}
            if(button_click > 5){return .5
            }else{ return 1}
            })
    d3.select('button.btnnext')
        .transition()
        .style('pointer-events', 'none')
        .style('opacity', .5)
        .transition()
        .delay(2000)
        .style('pointer-events', function(){if(button_click==5){return 'none'}else{return 'auto'}})
        .style('opacity',function(){if(button_click == 5){return .5}else{
        if(button_click >= 1){
            return 1}}})

        }

d3.select('div#relatedsidebar').selectAll('img').on('mouseover', function(){
    d3.select(this)
        .style('border', '2px solid black')
        .style('opacity', 1)
})

d3.select('div#relatedsidebar').selectAll('img').on('mouseout', function(){
    d3.select(this)
        .style('opacity', function(){if(this.id == 'selected'){ return .15}else{return 1}})
        .style('border','0')
})

d3.select('div#relatedsidebar').selectAll('img').on('click', function(){
    d3.select('div#related').select('svg').select('image').remove()
    svg.append('svg:image')
        .attr("xlink:href", this.src)
        .attr('width', '600px')
        .attr('height', '400px')
    d3.select('div#relatedsidebar').selectAll('img')
        .attr('id', 'deselected')
        .style('opacity', 1)
    d3.select(this)
        .attr('id', 'selected')
        .style('opacity', .15)

        
    
})
    
