import React, { useState, useEffect } from 'react';
import map from '@/assets/mountain.jpg'

const Graph = () => {
  const [data, setData] = useState({ data: { nodes: [], edges: [] } });
  const [selectedNodes, setSelectedNodes] = useState({ start: null, end: null });
  const [highlightedPaths, setHighlightedPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(true); // State to control difficulty modal visibility
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // State to store selected difficulty will be used in iteration 3
  const [routeCalculated, setRouteCalculated] = useState(false);
  const [selectedRouteOption, setSelectedRouteOption] = useState('all');
  const [alertShown, setAlertShown] = useState(false);


  useEffect(() => {
    fetch('http://localhost:4000/api/resort')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('Welcome! Please choose a start location on the map!');
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

  const handleNodeClick = (nodeId) => {
    if (!selectedNodes.start) {
      setSelectedNodes({ ...selectedNodes, start: nodeId });
      alert('Please choose your destination on the map!');
    } else if (!selectedNodes.end) {
      setSelectedNodes({ ...selectedNodes, end: nodeId });
      alert('Please choose your difficulty level.');
    }
  };

  useEffect(() => {
    if (selectedNodes.start && selectedNodes.end) {
      const paths = findAllPaths(data.data, selectedNodes.start, selectedNodes.end);
      if (!showDifficultyModal) {
        setHighlightedPaths(paths);
        setRouteCalculated(true);
        alert('Calculated routes! You can also choose your desired route options from dropdown.');
        setAlertShown(true);
      }
    } else {
      setHighlightedPaths([]);
      setAlertShown(false);
    }
  }, [selectedNodes, showDifficultyModal, selectedRouteOption, alertShown]);

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

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyModal(false); // Close the difficulty modal after selecting a difficulty
  };

  const restartPathFinding = () => {
    setSelectedNodes({ start: null, end: null });
    setHighlightedPaths([]);
    setShowDifficultyModal(true);
    setRouteCalculated(false);
    setSelectedRouteOption('all');
  }

  return (
    <div>
      <div className="graph-container">
        <svg width="800" height="600" viewBox="0 0 800 600">
          <image href={map} width="800" height="400" />
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
                stroke={
                  isEdgeHighlighted(edge) ?
                    edge.difficulty === 'none' ?
                      'green' :
                      edge.difficulty === 'easy' ?
                        'blue' :
                        edge.difficulty === 'medium' ?
                          'red' :
                          edge.difficulty === 'hard' ?
                            'black'
                            : 'blue' : 'grey'
                }
                strokeWidth="4"
              >
                <title>{`${edge.type}\nDifficulty: ${edge.difficulty}`}</title>
              </line>
            );
          })}
          {data.data.nodes.map((node, index) => (
            <circle
              key={index}
              cx={node.x}
              cy={node.y}
              r="20"
              fill={selectedNodes.start === node.id || selectedNodes.end === node.id ? 'red' : 'black'}
              onClick={() => handleNodeClick(node.id)}
            >
              <title>{`${node.name}`}</title>
            </circle>

          ))}
        </svg>
        {selectedNodes.end && showDifficultyModal && (
          <div>
            <h3>Choose a difficulty level:</h3>
            <select onChange={(val) => handleDifficultySelect(val.target.value)}>
              <option value="Select Difficulty">Select Difficulty</option>
              <option value="Begginer">Begginer</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
        )}
        {routeCalculated && !showDifficultyModal && (
          <div>
            <h3>Choose a route option:</h3>
            <select onChange={(val) => setSelectedRouteOption(val.target.value)}>
              <option value="all">All Routes</option>
              <option value="scenic">Scenic Routes</option>
              <option value="easy">Easy Routes</option>
              <option value="medium">Medium Routes</option>
              <option value="difficult">Difficult Routes</option>
            </select>
          </div>
        )}
      </div>
      <div>
        {routeCalculated && !showDifficultyModal && (
          <button onClick={restartPathFinding} style={{
            backgroundColor: '#4CAF50', /* Green */
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            marginLeft: '50px',
          }}>Restart Path Finding</button>
        )}
      </div>
    </div>
  );
};

export default Graph;