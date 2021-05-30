width = d3.select('div#mapLayer').node().getBoundingClientRect().width;
dx = 24;
dy = width / 7;
if (dy < 120)
  dy = 100;
margin = ({top: 80, right: width/5, bottom: 80, left: width/20});
diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)

d3.json("/demo/hci-map.json").then(data => {
  const root = d3.hierarchy(data);
  root.x0 = dy / 2;
  root.y0 = 0;
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth) {
      d.children = null;
    }
  });

  const svg = d3.select('div#mapLayer').append("svg")
      .attr("viewBox", [-margin.left, -margin.top, width, dx])
      .style("font", "0.8em sans-serif")
      .style("user-select", "none")
      .style("overflow-x", "auto");

  const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#C6C6C6")
      .attr("stroke-width", 1)
      .classed("notchangefill", true);

  const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

  function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();

    // Compute the new tree layout.
    tree = d3.tree().nodeSize([dx, dy]);
    //tree = d3.tree().nodeSize([dx, dy]).separation(function(a, b) { return (a.parent == b.parent ? 1 : 2); });
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom;
    // console.log(left, right);

    const transition = svg.transition()
        .duration(duration)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    d3.select('div#textLayer')
        .style("height", height+8+'px');

    // Update the nodes…
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().insert("g", "svg")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill", "#242424")
        .on("click", function(d) {
          d.children = d.children ? null : d._children;
          
          d3.selectAll(".selected circle").attr("fill", d => d._children ? "#242424" : "#F6F6F6");
          d3.selectAll(".selected").classed("selected notchangefill", false);
          d3.select("#textLayer h3").remove();
          d3.select("#textLayer p").remove();

          d3.select(this).classed("selected notchangefill", true);
          d3.select(this).select("circle").attr("fill", d => d._children ? "#1B8DFF" : "#F6F6F6");

          d3.selectAll("g:not(.notchangefill)").attr("fill", "#999999");

          d3.json("/demo/" + d.data.name + ".json").then(data => {
            d3.select("#textLayer").append("h3")
                .text(data.title);

            d3.select("#textLayer").append("p")
                .text(data.content);
            
          })
          .catch(error => {
            // console.error(error);
          });

          update(d);

          var openNode = d;
          while (openNode.depth > 1) {
            openNode = openNode.parent;
            // console.log(openNode);
          };
          root.children.forEach((d, i) => {
            // console.log(d.children);
            if (d.children !== null && d !== openNode) {
              d.children = null;
              update(d);
            }
          });
          
          
        })
        // .on("mouseover", function(d) {
        //   // d3.select(this).attr("fill", "#1B8DFF");
        //   d3.select(this).classed("selected", true);
        //   d3.select(this).attr("stroke-opacity", 0);
        // })
        // .on("mouseout", function(d) {
        //   // d3.select(this).attr("fill", "#242424");
        //   d3.select(this).classed("selected", false);
        //   d3.select(this).attr("stroke-opacity", 1);
        // });

    nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", d => d._children ? "#242424" : "#F6F6F6")
        .attr("stroke-width", 10);

    nodeEnter.append("text")
        .attr("dy", "0.3em")
        .attr("x", d => d._children ? -6 : 6)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 10)
        .attr("stroke", "#F6F6F6");

    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

    // Update the links…
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        });

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    const zoom = d3.zoom().scaleExtent([1, 2])
      .filter(function() {
        isWheelEvent = d3.event instanceof WheelEvent;
        return !isWheelEvent || (isWheelEvent && (d3.event.ctrlKey || d3.event.metaKey));
      })
      .on("zoom", ()=> {
        svg.attr(
          "transform",
          "translate(" + (d3.event.transform.x) +"," +(d3.event.transform.y) +
            ") scale(" + d3.event.transform.k + ")"
      );
    })

    svg.call(zoom).on("dblclick.zoom", null);


  }

  update(root);

});