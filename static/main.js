// custom javascript

$(function () {
    console.log('jquery is working!');
    createGraph();
})

function createGraph() {
    // Main config
    var width = 960; // chart width
    var height = 700; // chart height
    var format = d3.format(",d"); // convert value to integer
    var color = d3.scaleOrdinal(d3.schemeAccent); // create ordinal scale
    var sizeOfRadius = d3.scalePow().domain([-100,100]).range([-50,50]); // https://github.com/d3/d3-scale/blob/master/README.md#power-scales

    // Bubble config
    var bubble = d3.pack()
        // .sort(null) //disable sorting, use DOM tree traversal
        .size([width, height]) //chart layout size
        .padding(1) // padding between circles
        .radius(function (d) { return 20 + (sizeOfRadius(d.value) * 30); }); // radius for each circle
    
    // SVG config
    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");
    
    // Request the data
    d3.json("/data").then(function(quotes) {
        var root = d3.hierarchy(quotes)
            .sum(function (d) { return d.value; })
        
        var nodes = bubble(root).leaves()

        var node = svg.selectAll('.node')
            .data(nodes)
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' });
        
        node.append('circle')
            .attr('r', function (d) { return d.r; })
            .style('fill', function (d) { return color(d.data.symbol); })
            .on("mouseover", function (d) {
                tooltip.text(d.data.name + ": $" + (+d.data.current_price).toFixed(2) + "\n"
                    + "previous price: $" + (+d.data.current_price / (1 + d.data.percent_change / 100)).toFixed(2) + "\n"
                    + "change: " + (+d.data.percent_change).toFixed(2) + "%");
                tooltip.style("visibility", "visible");
            })
            .on("mousemove", function () {
                return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
              })
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
        
        node.append('text')
            .attr("dy", ".3em")
            .style('text-anchor', 'middle')
            .text(function (d) { return d.data.symbol; });
    })

    // tooltip config
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("border-radius", "6px")
        .style("font", "12px sans-serif")
        .text("tooltip")
}
