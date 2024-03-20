import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function Map({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const nodes = data.nodes;
    const edges = data.edges;

    // Create a new D3 force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

    const svg = d3.select(svgRef.current);
    const g = svg.append('g');

    // Create edges
    const link = g.selectAll('.link')
      .data(edges)
      .enter().append('line')
      .attr('class', 'link')
      .style('stroke', 'gray')
      .style('stroke-width', 2);

    // Create nodes
    const node = g.selectAll('.node')
      .data(nodes)
      .enter().append('circle')
      .attr('class', 'node')
      .attr('r', 10)
      .style('fill', 'steelblue')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Update positions of nodes and edges in simulation
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    // Highlight edges based on selected nodes
    function highlightEdges(selectedNode) {
      link.style('stroke', d => (d.source === selectedNode || d.target === selectedNode) ? 'red' : 'gray');
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <svg ref={svgRef} width={window.innerWidth} height={window.innerHeight}>
      {/* Add any other SVG elements or UI components here */}
    </svg>
  );
}
