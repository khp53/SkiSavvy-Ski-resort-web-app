// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Graph = () => {
//   const svgRef = useRef();
//   const [selectedNodes, setSelectedNodes] = useState([]);
//   const [paths, setPaths] = useState([]);
//   const [selectedOption, setSelectedOption] = useState('all');
//   //const [data, setData] = useState(null);

//   // useEffect(() => {
//   //   // Fetch JSON data from the API
//   //   fetch('http://localhost:4000/api/resort')
//   //     .then(response => response.json())
//   //     .then(data => setData(data))
//   //     .catch(error => console.error('Error fetching data:', error));
//   // }, [data]);

//   const data = {
//     "data": {
//       "nodes": [
//         { "id": "1", "x": 50, "y": 50 },
//         { "id": "2", "x": 150, "y": 50 },
//         { "id": "3", "x": 250, "y": 50 },
//         { "id": "4", "x": 50, "y": 150 },
//         { "id": "5", "x": 150, "y": 150 },
//         { "id": "6", "x": 250, "y": 150 }
//       ],
//       "edges": [
//         { "source": "1", "target": "2" },
//         { "source": "2", "target": "3" },
//         { "source": "1", "target": "4" },
//         { "source": "2", "target": "5" },
//         { "source": "3", "target": "6" },
//         { "source": "4", "target": "5" },
//         { "source": "5", "target": "6" }
//       ]
//     }
//   };


//   useEffect(() => {
//     if (!data) return;

//     const svg = d3.select(svgRef.current);

//     // Clear existing graph
//     svg.selectAll('*').remove();

//     const nodesById = new Map(data.data.nodes.map(node => [node.id, node]));
//     const edgesBySource = new Map();
//     data.data.edges.forEach(edge => {
//       if (!edgesBySource.has(edge.source)) {
//         edgesBySource.set(edge.source, []);
//       }
//       edgesBySource.get(edge.source).push(edge);
//     });

//     // Add nodes
//     svg.selectAll('.node')
//       .data(data.data.nodes)
//       .enter().append('circle')
//       .attr('class', 'node')
//       .attr('r', 10)
//       .attr('fill', node => selectedNodes.includes(node.id) ? 'red' : 'blue')
//       .on('click', (event, node) => {
//         setSelectedNodes(prevSelectedNodes => {
//           if (prevSelectedNodes.length === 2) {
//             prevSelectedNodes.shift();
//           }
//           return [...prevSelectedNodes, node.id];
//         });
//       });

//     // Add edges
//     svg.selectAll('.link')
//       .data(data.data.edges)
//       .enter().append('line')
//       .attr('class', 'link')
//       .attr('stroke', 'gray')
//       .attr('x1', edge => nodesById.get(edge.source).x)
//       .attr('y1', edge => nodesById.get(edge.source).y)
//       .attr('x2', edge => nodesById.get(edge.target).x)
//       .attr('y2', edge => nodesById.get(edge.target).y);

//     // Hide tooltip when clicking anywhere on the SVG
//     svg.on('click', () => {
//       setSelectedNodes([]);
//       setPaths([]);
//     });

//     return () => {
//       // Clean up D3 elements when unmounting
//       svg.selectAll('*').remove();
//     };
//   }, [data, selectedNodes]);

//   const handleOptionChange = event => {
//     setSelectedOption(event.target.value);
//   };

//   const handleCalculateRoute = () => {
//     if (selectedNodes.length !== 2) return;

//     const startNode = selectedNodes[0];
//     const endNode = selectedNodes[1];
//     const edgesBySource = new Map();
//     data.data.edges.forEach(edge => {
//       if (!edgesBySource.has(edge.source)) {
//         edgesBySource.set(edge.source, []);
//       }
//       edgesBySource.get(edge.source).push(edge);
//     });
//     const allPaths = findAllPaths(startNode, endNode, [], edgesBySource);
//     setPaths(allPaths);
//   };

//   const filteredPaths = selectedOption === 'all' ? paths : [paths[0]]; // Show all paths or only the first path

//   return (
//     <div>
//       <svg ref={svgRef} width={600} height={400} style={{ border: '1px solid black' }}>
//         {filteredPaths.map((path, index) => (
//           <g key={index}>
//             {path.map((node, idx) => (
//               <circle key={idx} cx={node.x} cy={node.y} r={6} fill="green" />
//             ))}
//           </g>
//         ))}
//       </svg>
//       <div>
//         <select value={selectedOption} onChange={handleOptionChange}>
//           <option value="all">All Paths</option>
//           <option value="scenic">Scenic Route</option>
//           <option value="easy">Easy Path</option>
//           <option value="medium">Medium Path</option>
//           <option value="difficult">Difficult Path</option>
//         </select>
//         <button onClick={handleCalculateRoute}>Calculate Route</button>
//       </div>
//     </div>
//   );
// };

// function findAllPaths(startNode, endNode, path, edgesBySource) {
//   const paths = [];
//   path.push(startNode);

//   if (startNode === endNode) {
//     paths.push([...path]);
//   } else {
//     edgesBySource.get(startNode).forEach(edge => {
//       if (!path.includes(edge.target)) {
//         paths.push(...findAllPaths(edge.target, endNode, [...path], edgesBySource));
//       }
//     });
//   }

//   path.pop();
//   return paths;
// }

// export default Graph;

// // import React, { useEffect, useRef } from 'react';
// // import * as d3 from 'd3';

// // export default function Map({ data }) {
// //   const svgRef = useRef(null);

// //   useEffect(() => {
// //     if (!data) return;

// //     const nodes = data.nodes;
// //     const edges = data.edges;

// //     // Create a new D3 force simulation
// //     const simulation = d3.forceSimulation(nodes)
// //       .force('link', d3.forceLink(edges).id(d => d.id))
// //       .force('charge', d3.forceManyBody().strength(-200))
// //       .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

// //     const svg = d3.select(svgRef.current);
// //     const g = svg.append('g');

// //     // Create edges
// //     const link = g.selectAll('.link')
// //       .data(edges)
// //       .enter().append('line')
// //       .attr('class', 'link')
// //       .style('stroke', 'gray')
// //       .style('stroke-width', 2);

// //     // Create nodes
// //     const node = g.selectAll('.node')
// //       .data(nodes)
// //       .enter().append('circle')
// //       .attr('class', 'node')
// //       .attr('r', 10)
// //       .style('fill', 'steelblue')
// //       .call(d3.drag()
// //         .on('start', dragstarted)
// //         .on('drag', dragged)
// //         .on('end', dragended));

// //     // Update positions of nodes and edges in simulation
// //     simulation.on('tick', () => {
// //       link
// //         .attr('x1', d => d.source.x)
// //         .attr('y1', d => d.source.y)
// //         .attr('x2', d => d.target.x)
// //         .attr('y2', d => d.target.y);

// //       node
// //         .attr('cx', d => d.x)
// //         .attr('cy', d => d.y);
// //     });

// //     // Highlight edges based on selected nodes
// //     function highlightEdges(selectedNode) {
// //       link.style('stroke', d => (d.source === selectedNode || d.target === selectedNode) ? 'red' : 'gray');
// //     }

// //     function dragstarted(event, d) {
// //       if (!event.active) simulation.alphaTarget(0.3).restart();
// //       d.fx = d.x;
// //       d.fy = d.y;
// //     }

// //     function dragged(event, d) {
// //       d.fx = event.x;
// //       d.fy = event.y;
// //     }

// //     function dragended(event, d) {
// //       if (!event.active) simulation.alphaTarget(0);
// //       d.fx = null;
// //       d.fy = null;
// //     }

// //     return () => {
// //       simulation.stop();
// //     };
// //   }, [data]);

// //   return (
// //     <svg ref={svgRef} width={window.innerWidth} height={window.innerHeight}>
// //       {/* Add any other SVG elements or UI components here */}
// //     </svg>
// //   );
// // }

import React, { useState, useEffect } from 'react';

const Graph = () => {
  const [data, setData] = useState({ data: { nodes: [], edges: [] } });
  const [selectedNodes, setSelectedNodes] = useState({ start: null, end: null });
  const [highlightedPaths, setHighlightedPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/resort')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);


  // const data = {
  //   "data": {
  //     "nodes": [
  //       { "id": "1", "x": 50, "y": 50 },
  //       { "id": "2", "x": 150, "y": 50 },
  //       { "id": "3", "x": 250, "y": 50 },
  //       { "id": "4", "x": 50, "y": 150 },
  //       { "id": "5", "x": 150, "y": 150 },
  //       { "id": "6", "x": 250, "y": 150 }
  //     ],
  //     "edges": [
  //       { "source": "1", "target": "2" },
  //       { "source": "2", "target": "1" },
  //       { "source": "2", "target": "3" },
  //       { "source": "1", "target": "4" },
  //       { "source": "2", "target": "5" },
  //       { "source": "3", "target": "6" },
  //       { "source": "4", "target": "5" },
  //       { "source": "5", "target": "6" }
  //     ]
  //   }
  // };

  const handleNodeClick = (nodeId) => {
    if (!selectedNodes.start) {
      setSelectedNodes({ ...selectedNodes, start: nodeId });
    } else if (!selectedNodes.end) {
      setSelectedNodes({ ...selectedNodes, end: nodeId });
    } else {
      setSelectedNodes({ start: nodeId, end: null });
    }
  };

  useEffect(() => {
    if (selectedNodes.start && selectedNodes.end) {
      const paths = findAllPaths(data.data, selectedNodes.start, selectedNodes.end);
      setHighlightedPaths(paths);
    } else {
      setHighlightedPaths([]);
    }
  }, [selectedNodes, data]);

  const findAllPaths = (graph, start, end) => {
    const paths = [];
    const visited = {};
    const stack = [[start]];

    while (stack.length) {
      const path = stack.pop();
      const node = path[path.length - 1];

      if (node === end) {
        paths.push(path);
      } else {
        visited[node] = true;
        const neighbors = graph.edges
          .filter((edge) => edge.source === node || edge.target === node)
          .map((edge) => (edge.source === node ? edge.target : edge.source))
          .filter((neighbor) => !visited[neighbor]);

        for (const neighbor of neighbors) {
          stack.push([...path, neighbor]);
        }
      }
    }

    return paths;
  };

  const isEdgeHighlighted = (edge) => {
    return highlightedPaths.some((path) => path.includes(edge.source) && path.includes(edge.target));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <svg width="800" height="600">
      {data.data.edges.map((edge, index) => {
        const sourceNode = data.data.nodes.find((node) => node.id === edge.source);
        const targetNode = data.data.nodes.find((node) => node.id === edge.target);

        // Calculate the angle between the source and target nodes
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const angle = Math.atan2(dy, dx);

        // Calculate the offset for the edge
        const offset = 2; // Adjust this value as needed
        const x1 = sourceNode.x + Math.cos(angle) * offset;
        const y1 = sourceNode.y + Math.sin(angle) * offset;
        const x2 = targetNode.x - Math.cos(angle) * offset;
        const y2 = targetNode.y - Math.sin(angle) * offset;
        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isEdgeHighlighted(edge) ? 'red' : 'black'}
            strokeWidth="2"
          />
        );
      })}
      {data.data.nodes.map((node, index) => (
        <circle
          key={index}
          cx={node.x}
          cy={node.y}
          r="20"
          fill={selectedNodes.start === node.id || selectedNodes.end === node.id ? 'red' : 'blue'}
          onClick={() => handleNodeClick(node.id)}
          title={node.name}
        />
      ))}
    </svg>
  );
  // return (
  //   <svg width="100" height="100">
  //     <circle cx="50" cy="50" r="5" fill="blue" title="Test Tooltip" />
  //   </svg>
  // );
};

export default Graph;

