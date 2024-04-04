class CRController {
    constructor() {
    }

// Function to calculate the distance between two points using the Haversine formula
async calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}
    async findNeighbors(graph, node) {
        // This function should return an array of neighboring node IDs
        //console.log('get neigbors of ', node)
        const neighbors = [];
        for (const otherNode of graph.nodes) {
            if (node.id !== otherNode.id) { // Exclude the current node
                // check if otherNode is within a certain distance from node
                const distance = await this.calculateDistance(node.latLng[0], node.latLng[1], otherNode.latLng[0], otherNode.latLng[1]);
                if (distance > 1) { // threshold to be adjusted per our implementation
                                    // we can limit the graph traversal to only neighors within a region
                    neighbors.push(otherNode.id);
                }
            }
        }
        return neighbors;
    }

    async findPathsUtil(graph, visited, startNodeId, endNodeId, path, paths) {
        
        const startNode = graph.nodes.find(node => node.id === startNodeId);
    
        // Mark the current node as visited and add it to the path
        visited[startNode.id] = true;
        path.push(startNode);
    
        // If we reached the end node, add the current path to the list of paths
        if (startNodeId === endNodeId) {
            paths.push([...path]);
            //console.log('Added path to paths:', paths[paths.length - 1]);
            //return; // Exit the function since we've found a valid path
        } 
        else{  // If not, continue exploring neighbors
            const neighbors = await this.findNeighbors(graph, startNode); // Find neighbors dynamically
            //console.log("before for loop, neighbors=", neighbors);
            for (const neighborId of neighbors) {
                if (!visited[neighborId]) {
                    //await this.findPathsUtil(graph, visited, neighbor.id, endNodeId, path, paths);
                    //console.log("recalling findPathsUtil of neighborId=", neighborId);
                    //await this.findPathsUtil(graph, Object.assign({}, visited), neighborId, endNodeId, [...path], paths);
                    await this.findPathsUtil(graph, visited, neighborId, endNodeId, [...path], paths);
                }
            }
        }
    
        // Remove the current node from the path and mark it as unvisited
        path.pop();
        visited[startNode.id] = false;
        //delete visited[startNode.id]; // Delete the entry instead of reassigning
    }

    async findAllPaths(graph, startNodeId, endNodeId, userProfile) {
        console.log('start find all paths..');
        const visited = {};
        const paths = [];
        const startNode = graph.nodes.find(node => node.id === startNodeId);
        const endNode = graph.nodes.find(node => node.id === endNodeId);
        
        if (!startNode || !endNode) {
            console.error("Start or end node not found.");
            return paths;
        }
    
        await this.findPathsUtil(graph, visited, startNodeId, endNodeId, [], paths);
        console.log('graph traversal paths found: ', paths);
        
        // return paths.map(path => ({
        //     id: path.map(node => node.id).join('-'),
        //     direction: { source: startNodeId, target: endNodeId },
        //     latLngs: path.map(node => node.latLng)
        // }));

        // Transform paths into edges
    const edges = [];
    paths.forEach((path, index) => {
        for (let i = 0; i < path.length - 1; i++) {
            const sourceNode = path[i];
            const targetNode = path[i + 1];
            edges.push({
                id: i + 1,
                direction: { source: sourceNode.id, target: targetNode.id },
                latLngs: [sourceNode.latLng, targetNode.latLng]
            });
        }
    });
    //console.log('transform graph paths to edges: ', edges);
    //return edges;

    const matchingEdges = [];
    if (userProfile){
        graph.edges.forEach(resortEdge => {
            edges.forEach(graphEdge => {
                if (
                    !matchingEdges.some(edge =>
                        edge.direction.source === resortEdge.direction.source &&
                        edge.direction.target === resortEdge.direction.target &&
                        edge.difficulty === resortEdge.difficulty
                    )
                ) {
                    matchingEdges.push(resortEdge);
                }
            });
        });
    }
    else {
    graph.edges.forEach(resortEdge => {
        edges.forEach(graphEdge => {
            if (
                !matchingEdges.some(edge =>
                    edge.direction.source === resortEdge.direction.source &&
                    edge.direction.target === resortEdge.direction.target
                )
            ) {
                matchingEdges.push(resortEdge);
            }
        });
    });
    }
    return matchingEdges;

    }

    // get the first ski resort by using skiResortController getTheFirstSkiResort method
    // and using the getFirstRoute method to get the first route
    // calculate all possible paths between the first ski resort and the first route
    // and return all possible paths
    async calculateAllRoutes(req, res) {
        try {
            const skiResortController = req.resortController;
            const firstSkiResort = await skiResortController.getTheFirstSkiResort.bind(skiResortController);
            const routeSelectionController = req.routeSelectionController;
            const selectedRoute = await routeSelectionController.getFirstSelection.bind(routeSelectionController);
            const routes = await this.calculateRoutes(firstSkiResort, selectedRoute.start, selectedRoute.end, selectedRoute.profile);
            return res.status(200).json({ statusCode: 200, message: 'All paths calculated successfully', data: routes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }

    // calculate all possible paths between the first ski resort and the first route
    async calculateRoutes(skiResort, start, end, profile) {
        skiResort = {
            "nodes": [
                { "id": 1, "title": "A", "latLng": [12, 270] },
                { "id": 2, "title": "B", "latLng": [20, 300] },
                { "id": 6, "title": "F", "latLng": [65, 292] },
                { "id": 7, "title": "G", "latLng": [62, 314] },
                { "id": 8, "title": "H", "latLng": [74, 293] }
            ],
            "edges": [
              {
                "id": 1, "direction": { "source": 2, "target": 1 }, "latLngs": [[20, 300], [12, 270]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                  "lynx-type": "slope",
                  "title": "20 FIS - Abfahrt",
                  "additional-info": {
                    "length": 2150,
                    "length-open": 0
                  },
                  "oid": "30433",
                  "status": "open",
                  "id": "81538",
                  "subtitle": "slope (medium)",
                  "clients-sub-id": 2615
                },
              },
              {
                "id": 7, "direction": { "source": 7, "target": 2 }, "latLngs": [[62, 314], [20, 300]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                  "lynx-type": "slope",
                  "title": "20 FIS - Abfahrt",
                  "additional-info": {
                    "length": 2150,
                    "length-open": 0
                  },
                  "oid": "30433",
                  "status": "open",
                  "id": "81538",
                  "subtitle": "slope (medium)",
                  "clients-sub-id": 2615
                },
              },
            
              {
                "id": 9, "direction": { "source": 1, "target": 7 }, "latLngs": [[12, 270], [62, 314]], "type": "lift",
                "isMultipleEdges": false,
                "popup": {
                  "lynx-type": "lift",
                  "title": "Turrachbahn",
                  "oid": "29858",
                  "status": "open",
                  "id": "8152",
                  "subtitle": "6-chair lift",
                  "clients-sub-id": 2605
                },
              },
              {
                "id": 10, "direction": { "source": 6, "target": 1 }, "latLngs": [[65, 292], [12, 270]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                  "lynx-type": "slope",
                  "title": "21 Eisenhutabfahrt",
                  "additional-info": {
                    "length": 1550,
                    "length-open": 0
                  },
                  "oid": "30436",
                  "status": "open",
                  "id": "81539",
                  "subtitle": "slope (medium)",
                  "clients-sub-id": 2615
                },
              },
              {
                "id": 11, "direction": { "source": 1, "target": 6 }, "latLngs": [[12, 270], [74, 293]], "type": "slope",
                "isMultipleEdges": false,
                "difficulty": "medium",
                "popup": {
                  "lynx-type": "slope",
                  "title": "21 Eisenhutabfahrt",
                  "additional-info": {
                    "length": 1550,
                    "length-open": 0
                  },
                  "oid": "30436",
                  "status": "open",
                  "id": "81539",
                  "subtitle": "slope (medium)",
                  "clients-sub-id": 2615
                },
              },
            ]
        };
        
        start = 1; // ID of start node
        end = 8; // ID of end node
        profile = "medium";

        //const routes = []; 
        const routes = await this.findAllPaths(skiResort, start, end, profile);
        // calculate all possible paths
        // between the first ski resort and the first route
        return routes;
    }   
}

module.exports = CRController;

