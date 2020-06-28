var articleList = [["个人网站设计开发记录","/ck8wsxu3w0001l5wj9v67n4mc"], 
                    ["hello2","/ck8wsxu3w0001l5wj9v67n4mc"],
                    ["网站建成记录","/ck8wsxu3w0001l5wj9v67n4mc"], 
                    ["hello2","/ck8wsxu3w0001l5wj9v67n4mc"],
                  ];
var golden_ratio = 0.618033988749895;


var width = document.getElementById('content').clientWidth;
var height = document.getElementById('content').clientHeight;

const svg = d3.select('svg#floatLayer')
 
const graph = {
    nodes: [
      { id: 1, name: '', url: '/ck8wsxu3w0001l5wj9v67n4mc', lenght:'0' },
    { id: 2, name: '拖延症的网站',url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  },
    { id: 3, name: '琴怀', url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  },
    { id: 4, name: 'testtesttexttest',url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  },
    { id: 5, name: '', url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'0' },
    { id: 6, name: 'test2',url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  },
    { id: 7, name: 'testtesttexttest',url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  },
    { id: 8, name: 'testtesttexttest',url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  },
    { id: 9, name: '', url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'0' },
    { id: 10, name: 'test2',url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  },
    { id: 11, name: 'testtesttexttest',url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  },
    { id: 12, name: 'testtesttexttest',url: '/ck8wsxu3w0001l5wj9v67n4mc',lenght:'64'  }
  ],
  links: [
      { source: 1, target: 2 },
      { source: 1, target: 3 },
      { source: 1, target: 4 },
      { source: 1, target: 5 },
      { source: 1, target: 6 },
      { source: 1, target: 7 },
      { source: 1, target: 8 },
      { source: 1, target: 9 },
      { source: 1, target: 10 },
      { source: 1, target: 11 },
      { source: 1, target: 12 }

  ]
}
 



const simulation = d3.forceSimulation() 
  .force('charge', d3.forceManyBody().strength(-width*5).distanceMin(150).distanceMax(450)) 
  .force('link', d3.forceLink().id(d => d.id)) 
  .force('center', d3.forceCenter(document.body.clientWidth / 2, document.body.clientHeight / 2 -60))

const link = svg.selectAll('link')
  .data(graph.links)
  .enter()
  .append('line')
  .attr('class', 'link')  
 

const node = svg.selectAll('node')
  .data(graph.nodes)
  .enter().append('g')
  .attr('class', 'node')
  .append('svg:a')
  .attr('xlink:href', d => d.url)
  .attr('target', 'new')
  .call(d3.drag()
  .on("start",dragstarted)
  .on("drag",dragged)
  .on("end",dragended));

node.on('mouseover', function() {
    d3.select(this)
          .call(d3.zoom().scaleBy, 6)
      .select("text")
      .transition()
      .duration(300)
      .attr('opacity', '1.0')
      .style('font-size', '1.5rem')

  })
  .on('mouseout', function() {
    d3.select(this)
      .select("text")
      .transition()
      .duration(300)
      .attr('opacity', '0.5')
      .style('font-size', '1.2rem')
      
  })

node.append('rect')
  .style('width', d => d.lenght)
  .style('height', '16')
  .style('fill', '#2A14D9')
  .attr('y', -8)
  .attr('opacity', '1')


node.append('text')
  .style('font-size', '1.2rem')
  .attr('fill', '#fff')
  .attr('opacity', '0.5')
  .attr('text-anchor', 'middle')
  .text(d => d.name)



const ticked = function () {
  link.attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2',  d => d.target.y);
  
  node.attr('transform', d => `translate(${d.x}, ${d.y})`)

}


function dragstarted(d){
  if (!d3.event.active) {
    simulation.alphaTarget(0.8).restart();
  }
  d.fx=d.x;
  d.fy=d.y;

}

function dragged(d){
  disX = Math.abs((d3.event.x - document.body.clientWidth / 2));
  disY = (d3.event.y - document.body.clientHeight / 2);
  
  if (disX < document.body.clientWidth/3) {
    d.fx=d3.event.x;
  }
  if (disY > 24 - document.body.clientHeight / 2 && disY < document.body.clientHeight / 2 - 160) {
    d.fy=d3.event.y;
  }

}

function dragended(d){
  if(!d3.event.active) {
    simulation.alphaTarget(0);
    simulation.alphaTarget(0.3).restart();
  }
  d.fx=null;
  d.fy=null;
}

const { nodes, links } = graph
 
simulation.nodes(nodes).on('tick', ticked)
simulation.force('link').links(links)

window.onresize = function() {
  width = document.getElementById('content').clientWidth;
  height = document.getElementById('content').clientHeight;
  console.log("5");
  simulation.force('charge', d3.forceManyBody().strength(-width*5).distanceMin(150).distanceMax(450)) 
            .force('center', d3.forceCenter(document.body.clientWidth / 2, document.body.clientHeight / 2 -60));
  simulation.restart();
};

