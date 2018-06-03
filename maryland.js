// Width and height
var chart_width     =   800;
var chart_height    =   500;


//Projection
var projection = d3.geoAlbers()
    .scale(11000)
    .translate([-chart_width*2.65, chart_height-25])


var selected_congress = '22'
var years = [{"start":"1789", "end": "1792"},{"start":"1793", "end": "1802"},{"start":"1803", "end": "1832"},
{"start":"1833", "end": "1834"}, {"start":"1835", "end": "1842"}, {"start":"1843", "end": "1844"}, {"start":"1845", "end": "1852"},
{"start":"1853", "end": "1862"}, {"start":"1863", "end": "1872"},{"start":"1873", "end": "1890"},{"start":"1891", "end": "1896"},{"start":"1897", "end": "1898"},
{"start":"1899", "end": "1902"},{"start":"1903", "end": "1922"},{"start":"1923", "end": "1946"}, {"start":"1947", "end": "1952"},{"start":"1953", "end": "1962"},
{"start":"1963", "end": "1964"}, {"start":"1965", "end": "1972"},{"start":"1972", "end": "1982"},{"start":"1983", "end": "1992"}, {"start":"1993", "end": "2002"},{"start":"2003", "end": "2012"}]
var cities = [{"city":"Baltimore",'lon': -76.612, "lat": 39.29},
{"city":"Columbia", "lon":-76.839, "lat":39.24},
{"city":"Germantown", "lon":-77.272, "lat":39.173},
{"city":"Columbia", "lon":-76.839, "lat":39.24},
{"city":"Silver Spring", "lon":-77.026, "lat":38.991},
{"city":"Frederick", "lon":-77.411, "lat":39.414},{"city": "Annapolis", "lon":-76.4922, "lat": 38.9784},
{"city":"District of Columbia", "lon":-77.0369, "lat": 38.9072},{"city":"Ocean City", "lon":-75.0849, "lat":38.3365}  ]
var capital = [{"city": "Annapolis", "lon":-76.55, "lat": 39.05}]
var path = d3.geoPath(projection)
var selectValue = '0'
var city_layer = 'on'
var files = ['data/Maryland_1_to_2.geojson', 'data/Maryland_3_to_7.geojson','data/Maryland_8_to_22.geojson','data/Maryland_23_to_23.geojson','data/Maryland_24_to_27.geojson','data/Maryland_28_to_28.geojson',
'data/Maryland_29_to_32.geojson','data/Maryland_33_to_37.geojson','data/Maryland_38_to_42.geojson','data/Maryland_43_to_51.geojson','data/Maryland_52_to_54.geojson','data/Maryland_55_to_55.geojson',
'data/Maryland_56_to_57.geojson','data/Maryland_58_to_67.geojson','data/Maryland_68_to_79.geojson','data/Maryland_80_to_82.geojson','data/Maryland_83_to_87.geojson','data/Maryland_88_to_89.geojson','data/Maryland_90_to_92.geojson',
'data/Maryland_93_to_97.geojson','data/Maryland_98_to_102.geojson','data/Maryland_103_to_107.geojson','data/Maryland_108_to_112.geojson']
var promises = [];

files.forEach(function(url){
    promises.push(d3.json(url))
});

Promise.all(promises).then(function(values){

    // Create SVG
    var svg             =   d3.select("div.maryland")
        .append("svg")
        .attr("width", chart_width)
        .attr("height", 250)
        .attr('overflow', 'visible')
        .attr('class', 'map')
        .attr('transform', 'rotate(12 0 0)')
        
    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0)
    
    redraw_map(svg,values,selected_congress)
    console.log(values)
//Events

    d3.selectAll('select').on('change', function(d){
       selected_congress =  d3.select("#select").property("value")
       redraw_map(svg, values, selected_congress)
       console.log(selectValue)
    })

    d3.selectAll('input').on('click', function(d){
        if (city_layer == 'on'){city_layer = 'off'}else{city_layer = 'on'}
        redraw_map(svg,values,selected_congress)

    })

    d3.selectAll('path').on('click', function(d){
        

        selectValue = onClick(d)
        console.log(selectValue)
        //redraw_map(svg, values, selected_congress)
        
    })
    // d3.selectAll('path').on('click', function(d){
    //     selectValue = onClick(d)
    //     d3.select(this)
    //         .attr('id', 'clicked')
        
        
        
            
       // redraw_map(svg,values,selected_congress)
  //  })
    //    console.log(d)
    //     d3.select(this)
    //         .attr('fill', '#5FFFF3')
    //     if( selectValue == d.properties.district){
    //         selectValue= 0}
    //     //d3.selectAll('path')
    //       //  .forEach
    //         //.attr('fill', function(d){if (d.properties.district == '3' ) {return '#E86453'}
    //         //else{return'#d9d9db'}})}
    //     else{ selectValue = d.properties.district}
          
    //        console.log(selectValue))

    d3.select('button.start').on('click', function(d){
          var counter = parseInt(selected_congress, 10); 
          var i = setInterval(function(){ 
            redraw_map(svg, values, (counter.toString()))
              counter = counter + 1;
                if (counter == 23){
                    clearInterval(i)
                } }, 1000)
          })

    d3.select('button.reset').on('click', function(d){
        selectValue= 0
        redraw_map(svg,values,selected_congress) 
    })

})

  


function redraw_map(svg, values, index){
    d3.selectAll('path').remove()
    svg.selectAll('path')
            .data(values[index].features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('stroke', '#000000') 
            .attr('fill', function(d){if (d['properties']['district'] == '3' ) {return '#E86453'}
                    else if(d['properties']['district'] == selectValue){return '#5FFFF3' }
                    else{return'#d9d9db'}})
            .attr('stroke-width', 1)
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)
            .exit().remove()
    draw_cities(svg)
    create_labels(values[index].features, index)
    add_capital(svg)
    info(values[index].features, index, values)
    
    
    
    
    return; 
}


function handleMouseOver(){
    d3.select(this)
        .attr('fill', function(d){if (d['properties']['district'] == '3' ) {return '#E86453'}
        else{return'#5FFFF3'}
        })
    return;
}

function handleMouseOut(){
    d3.select(this)
    .attr('fill', function(d){if (d['properties']['district'] == '3' ) {return '#E86453'}
    else if(d['properties']['district'] == selectValue){return '#5FFFF3' }
    else{return'#d9d9db'}})
        
    
    
    
    return;
}

function handleClick(){

    d3.select(this)
        .attr('class', 'selected')
   
    return 

}

function draw_cities(svg){
    if (city_layer == 'on'){
    d3.selectAll('circle').remove()
        svg.selectAll('circle')
            .data(cities)
            .enter()
            .append('circle')
            .attr('fill', 'yellow')
            .style('opacity', 0.75)
            .attr('cx', function(d) {
                return projection([d.lon, d.lat])[0]})
            .attr('cy', function(d) {
                return projection([d.lon, d.lat])[1]})
            .attr('r', 5)
    d3.selectAll('.city').remove()
        svg.selectAll('text')
            .data(cities)
            .enter()
            .append('text')
            .text(function(d){return d['city']})
            .attr('y', function(d){return projection([d.lon, d.lat])[1]})
            .attr('x', function(d){return projection([d.lon, d.lat])[0]})
            .attr('class', 'city')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .style('font-family', 'sans-serif')
            }else {
                d3.selectAll('circle').remove()
                d3.selectAll('.city').remove()
        }
    return
}


function create_labels(session,index){
    d3.selectAll('.label').remove()
    d3.select('#facts')
    .append('svg')
    .attr('class', 'label')
    .attr("width", "20")
    .attr("height", "20")
    .attr('overflow', 'visible')
    .append('text')
    .append('tspan')
    .text('Congressional Sessions: ' + session[0]['properties'].startcong+ " - " + session[0]['properties'].endcong)
    .attr("font-family", "sans-serif")
    .attr('dx','.2em')
    .attr("font-size", '14px')
    .attr("fill", "black")
    .attr("class", "session")
    d3.select('#facts')
    .append('svg')
    .attr('class', 'label')
    .attr("width", "20")
    .attr("height", "20")
    .attr('overflow', 'visible')
    .append('text')
    .append('tspan')
    .text('Years: ' + years[index].start + ' - ' + years[index].end)
    .attr('dy', '1.25em')
    .attr('dx', '98px')
    .attr('class', 'years')
    .attr("font-family", "sans-serif")
    .attr("font-size", '14px')
    .attr("fill", "black")
    .attr("class", "years")
    
}

function add_capital(svg){
    if (city_layer == 'on'){
        d3.selectAll("image").remove()
        var img = svg.selectAll("image")
            .data(capital)
            .enter()
            .append("svg:image")
            .attr("xlink:href", "images/star.svg")
            .attr('x', function(d) {
                return projection([d.lon, d.lat])[0]})
            .attr('y', function(d) {
                return projection([d.lon, d.lat])[1]})
            .attr("with", "20")
            .attr("height", "20")
            .append('path')
            .attr('fill', '#FFE57E')
            
            
        
    }else{
        d3.selectAll("image").remove()
        
    }

}

function onClick(d){
    
    selectValue = d.properties.district
    
    return selectValue
}

function removeClick(){
    d3.selectAll('path')
        .attr('id', 'not_clicked')
}

function info(session, index, values){
    console.log(session.length)
    console.log('yup')
    var rep_array = []
    var district_index = 0 
    for (var i =0; i < session.length; i++){
        if (session[i]['properties']['district']=='3')
        {district_index = i}
        
    }
    for (var key in values[index].features[district_index].properties.member ){
        //if (values[index].features[district_index].properties.member['108'].hasOwnProperty(key))
        
        rep_array.push(key)
        
    }
    for (var number in rep_array){
        console.log(rep_array[number])
        for (var key in values[index].features[district_index].properties.member[number])
            console.log(values[index].features[district_index].properties.member[number][key][name] )
    }
    console.log(district_index)
   //console.log(values[index].features[district_index].properties.member['108'])
    d3.select('.district3').remove()
    d3.select('#infopane')
        .append('svg')
        .attr('class', 'district3')
        .attr('overflow', 'visible')
        .append('text')
        .text('Information about district three: ')
        .style('font-size', '15px')
    d3.select('#infopane')
        .append('tspan')
     //   .text('Representative: ' + values[index].features[district_index].properties.member['108'][key]['name'])
        

        console.log(district_index)
        //.text( session[district_index]['properties']['district'])
        //.attr("font-family", "sans-serif")
        //.attr("font-size", '14px')
        //.attr("fill", "black")
        //.attr('class', 'info')
        
        //.text(function(session) {for(var i = 0; i <8; i++){
        //    if (session[i]['properties']['district'] == '3') {return "O"}
        //}}
    //)
        //.text(session.properties.member['1']['3430'].party)
}