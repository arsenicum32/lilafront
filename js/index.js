"use strict";

d3.select("svg").attr({
  width: window.innerWidth,
  height: window.innerHeight
});

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
  return d.id;
})).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(width / 2, height / 2));

var svgDefs = svg.append('defs');

var mainGradient = svgDefs.append('linearGradient').attr('id', 'mainGradient');

// Create the stops of the main gradient. Each stop will be assigned
// a class to style the stop using CSS.
mainGradient.append('stop').attr('class', 'stop-left').attr('offset', '0');

mainGradient.append('stop').attr('class', 'stop-right').attr('offset', '1');

var OUT = ['red', 'green', 'blue', 'white'];
var IN = ['s', 'm', 'h', 'w', 'dd', 'mm', 'yyyy'];

d3.json("https://untitled-ys0e32c146y1.runkit.sh/", function (error, graph) {
  if (error) throw error;

  d3.select('#fl').html("\n    <span>input: " + 12 + "</span><br/>\n    <span>output: " + 4 + "</span><br/>\n    <span>hidden: " + (graph.nodes.length - 16) + "</span>\n  ");

  var link = svg.append("g").attr("class", "links").selectAll("line").data(graph.links).enter().append("line").attr("stroke-width", function (d) {
    return Math.sqrt(d.value);
  });

  function getc(t) {
    var fd = {
      "INPUT": 'red',
      "OUTPUT": 'lightgreen',
      "RELU": 'orange',
      "SELU": 'blue',
      "STEP": 'pink',
      "ABSOLUTE": 'yellow',
      "IDENTITY": 'brick',
      "INVERSE": 'red',
      "SINUSOID": 'yellow',
      "TANH": 'green',
      "BENT_IDENTITY": 'hotpink',
      "IDENTITY": 'pink',
      "SOFTSIGN": 'brown'
    };
    return fd[t] ? fd[t] : 'black';
  }
  var node = svg.append("g").attr("class", "nodes").selectAll("circle").data(graph.nodes).enter().append("circle").attr("fl", function (d) {
    return d.name == "INPUT" ? IN.pop() : d.name == "OUTPUT" ? OUT.pop() : null;
  }).attr("r", function (d) {
        return d.name != "INPUT" && d.name !=  "OUTPUT" ?
        Math.min(
          Math.abs(d.bias)*180 || 10, 
        40)
        :
        10;
  }).attr("fill", function (d) {
    return d.name == 'INPUT' ? 'white' : d.name != 'OUTPUT' ? d3.select(this).classed('filled', true) : 'black';
  }).attr('stroke', 'black').on('mouseover', function (d) {
    d3.select('#info').html("\n          <p><b>ID</b> " + d.id + "</p>\n          <p><b>NAME</b> " + d.name + "</p>\n          <p><b>BIAS</b> " + d.bias + "</p>\n          " + (d3.select(this).attr('fl') ? "<p><b>DATA</b> " + d3.select(this).attr('fl') + "</p>" : "") + "\n          \n        ");
    //alert(d.name)
  }).call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

  node.append("title").text(function (d) {
    return d.id;
  });

  simulation.nodes(graph.nodes).on("tick", ticked);

  simulation.force("link").links(graph.links);

  function ticked() {
    link.attr("x1", function (d) {
      return d.source.x;
    }).attr("y1", function (d) {
      return d.source.y;
    }).attr("x2", function (d) {
      return d.target.x;
    }).attr("y2", function (d) {
      return d.target.y;
    });

    node.attr("cx", function (d) {
      return d.x;
    }).attr("cy", function (d) {
      return d.y;
    });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.7).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
