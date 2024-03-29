import React, { useEffect, useState } from 'react';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';

const MapWithGraph = ({ imageUrl }) => {
    const [startNodeId, setStartNodeId] = useState(null);
    const [endNodeId, setEndNodeId] = useState(null);
    const [shortestPath, setShortestPath] = useState([]);
    const map = useMap();

    const graphData = {
        nodes: [
            { id: 1, latLng: [35, 300] },
            { id: 2, latLng: [70, 400] },
            { id: 3, latLng: [75, 380] },
            { id: 4, latLng: [20, 350] },
            { id: 5, latLng: [45, 480] }
        ],
        edges: [
            { id: 1, latLngs: [[35, 300], [70, 400]], weight: 5 },
            { id: 2, latLngs: [[35, 300], [75, 380]], weight: 10 },
            { id: 3, latLngs: [[70, 400], [20, 350]], },
            { id: 4, latLngs: [[75, 380], [45, 480]] },
            { id: 5, latLngs: [[20, 350], [45, 480]] }
        ]
    };

    useEffect(() => {
        graphData.nodes.forEach(node => {
            // Create and add markers for each node
            const marker = L.marker(node.latLng);
            marker.addTo(map);
            // Add event listener to handle node click
            marker.on('click', () => handleNodeClick(node.id));
            // change marker color
            marker.setIcon(
                node.id === startNodeId || node.id === endNodeId ?
                    L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: blue; border-radius: 100%; height: 15px; width: 15px;"></div>`,
                    }) :
                    L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: green; border-radius: 100%; height: 15px; width: 15px;"></div>`,
                    })
            );
            // Add popup for the node on mouseover
            marker.on('mouseover', () => {
                marker.bindPopup(`<b>Node ${node.id}</b>`).openPopup();
            });
            // Close popup on mouseout
            marker.on('mouseout', () => {
                marker.closePopup();
            });
        });

        graphData.edges.forEach(edge => {
            const polyline = L.polyline(edge.latLngs);
            polyline.addTo(map);
            polyline.setStyle({ color: 'grey' });
            // Add popup for the edge on mouseover
            polyline.on('mouseover', () => {
                polyline.bindPopup(`<b>Edge ${edge.id}</b>`).openPopup();
            });
            // Close popup on mouseout
            polyline.on('mouseout', () => {
                polyline.closePopup();
            });
            // Highlight edge if it's part of the shortest path
            if (shortestPath.find(pathEdge => pathEdge.id === edge.id)) {
                polyline.setStyle({ color: 'blue' });
            }
        });
    }, [map, graphData, shortestPath, startNodeId, endNodeId]);

    const handleNodeClick = nodeId => {
        if (startNodeId === null) {
            setStartNodeId(nodeId);
        } else if (endNodeId === null) {
            setEndNodeId(nodeId);
        }
    };

    useEffect(() => {
        // Calculate and set the shortest path when start or end node changes
        if (startNodeId !== null && endNodeId !== null) {
            setShortestPath(calculateShortestPath(startNodeId, endNodeId));
        }
    }, [startNodeId, endNodeId]);

    const calculateShortestPath = (startNodeId, endNodeId) => {
        const shortestPath = [654, 3474, 8834];
        return shortestPath;
    };


    return (
        <>
            <ImageOverlay url={imageUrl} bounds={[[0, 250], [500, 500]]} />
        </>
    );
};

const MapWrapper = ({ imageUrl, graphData }) => {
    return (
        <MapContainer center={[66, 375]} zoom={2} style={{ height: '600px', width: '80%' }}>
            <MapWithGraph imageUrl={imageUrl} graphData={graphData} />
        </MapContainer>
    );
};

export default MapWrapper;
