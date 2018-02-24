var w, h;

h=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
w=window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;

if (h > 1170)
  h = 1170;

h -= 80;
w -= 20;

// window.onresize = function() {
//     h=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
//     w=window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;

//     if (h > 1170)
//       h = 1170;

//     h -= 80;
//     w -= 20;

//     treemap.size([w, h]);
    
//     zoom(root);
// }



var node, root;

var x = d3.scaleLinear().range([0, w]),
    y = d3.scaleLinear().range([0, h]);

// 创建treemap布局，设定value访问器
var treemap = d3.treemap()
    .size([w, h])
    .round(false)
    // .tile(d3.treemapResquarify)
    // .sticky(true)
    .padding(2);

var color = d3.scaleOrdinal(d3.schemePastel1);
    

// 画布
var svg = d3.select("#notes").append("div")
    .attr("class", "canvas")
    .style("width", w + "px")
    .style("height", h + "px")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
    


// 转换文件数据
d3.json("res/notes.json", function(error, data) {
  if (error) throw error;
  
  //对root数据进行矩形树布局
  root = d3.hierarchy(data)
    .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
    .sum(function(d) { return d.size; })
    .sort(function(a, b) { return a.height - b.height || b.size - a.size; });

  treemap(root);

  // 标记当前缩放层级
  node = root;

  nodes = root.descendants().filter(function(d) { return d.depth > 1; });
  nodes.reverse();

  var cell = svg.selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "cell")
      .style("transform", function(d) { return "translate(" + d.x0 + "px," + d.y0 + "px)"; })
      .on("click", function(d) { 
        if (node.data.name == d.parent.data.name)
          return zoom(root);
        else
          return zoom(d.parent);
      });

  cell.append("rect")
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("fill", function(d) { return color(d.parent.data.name); })
      .style("opacity", 0.36);

  cell.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("x", function(d) { return (d.x1-d.x0) / 2; })
      .attr("y", function(d) { return (d.y1-d.y0) / 2; })
      .text(function(d) { return d.data.name; });
      // .style("opacity", function(d) {
      //   d.w = this.getComputedTextLength();
      //   return (d.x1-d.x0-20)*(d.y1-d.y0-20) > d.w * 400 ? 1 : 0;
      // });


  svg.selectAll("g")
      .data(nodes)
      .filter(function(d) { return d.depth == 2 && d.children != null; })
      .selectAll("rect")
      .style("opacity", 0.72);

  svg.selectAll("g")
      .data(nodes)
      .filter(function(d) { return d.depth > 2; })
      .selectAll("text")
      .style("opacity", 0.0);




  d3.select(window).on("click", function() { zoom(root); });


});



function zoom(n) {

      x.domain([n.x0, n.x1]);
      y.domain([n.y0, n.y1]);

      var t = svg.selectAll("g").transition()
          .duration(750)
          .style("transform", function(d) { return "translate(" + x(d.x0) + "px," + y(d.y0) + "px)"; });

      t.select("rect")
          .attr("width", function(d) { return (x(d.x1)-x(d.x0)); })
          .attr("height", function(d) { return (y(d.y1)-y(d.y0)); })
          .style("opacity", 1.0);

      t.select("text")
          .attr("x", function(d) { return (x(d.x1)-x(d.x0)) / 2; })
          .attr("y", function(d) { return (y(d.y1)-y(d.y0)) / 2; })
          .style("opacity", 1.0);
          // .style("opacity", function(d) { d.w = this.getComputedTextLength(); return (d.x1-d.x0-20)*(d.y1-d.y0-20) > d.w * 400 ? 1 : 0; });

      if (n.depth == 1 && n.children[0].children != null) {
        t.filter(function(d) { return d.depth == 2;} ).style("opacity", 0.0);
      }
      if (n.parent == null) {
        t.filter(function(d) { return d.depth == 2;} ).style("opacity", 1.0);

        t.selectAll("rect")
          .style("opacity", 0.36);

        t.filter(function(d) { return d.depth == 2 && d.children != null; })
          .selectAll("rect")
          .style("opacity", 0.72);

        t.filter(function(d) { return d.depth > 2; })
          .selectAll("text")
          .style("opacity", 0.0);
      }


  node = n;
  d3.event.stopPropagation();
}

