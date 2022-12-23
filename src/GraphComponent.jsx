import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

function Graph(data, dim) {
  const { height, width } = dim;
  //Initializing 

  const { nodes, links } = data;

  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
  var svg = d3
    .select("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox",[-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .style("pointer-events", "all");

  const zoom = d3
    .zoom()
    .scaleExtent([1 / 2, 64])
    .on("zoom", zoomed);

  //ZOOM
  function zoomed(e) {
    /* const { k, x, y } = e.transform; */
    svg.select(".root").attr("transform", e.transform);
  }

  const strength = -500;
  const simulation = d3
    .forceSimulation()
    .force("charge", d3.forceManyBody().strength(strength))
    .force("center", d3.forceCenter(0, 0))
    .force(
      "collision",
      d3.forceCollide().radius((d) => d.radius?d.radius:5)
    )
    .force(
      "link",
      d3
        .forceLink()
        .id(function (d) {
          return d.id;
        })
        .distance((d) => d.length?d.length:null)
    );

  const root = svg.append("g").attr("class", "root");

  const link = root
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", 1);

  const node = root
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", (d) => d.radius?d.radius:5)
    .call(drag(simulation));

  node.append("title").text(function (d) {
    return d.id;
  });

  simulation.nodes(nodes).on("tick", ticked);
  svg.call(zoom);
  simulation.force("link").links(links);

  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  }
  return svg;
}
export default function GraphComponens({ data, dim }) {
  const { height, width } = dim;
  const SVG = useRef()
  useEffect(() => {
    if(document.querySelector(".root") == undefined){
      SVG.current = Graph(data, dim)
    }else{
      SVG.current.attr("width", width)
      .attr("height", height)
      .attr("viewBox",[-width / 2, -height / 2, width, height])
    }
    

  }, [data,dim])
  

  return <svg className="chart" />;
}
