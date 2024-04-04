const Resort = require('../model/skiResortModel');
class CRController {
    constructor() {
    }

    // get the first ski resort by using skiResortController getTheFirstSkiResort method
    // and using the getFirstRoute method to get the first route
    // calculate all possible paths between the first ski resort and the first route
    // and return all possible paths
    async calculateAllRoutes(req, res) {
        try {
            const skiResortController = req.resortController;
            const firstSkiResort = await skiResortController.getFirstSkiResortData.bind(skiResortController)();
            console.log(firstSkiResort);
            console.log(firstSkiResort.edges.direction);
            // const firstSkiResort = await this.SkiResort.findOne();
            const routeSelectionController = req.routeSelectionController;
            const selectedRoute = await routeSelectionController.getFirstSelection.bind(routeSelectionController);
            //const routes = await this.calculateRoutes(firstSkiResort, selectedRoute.start, selectedRoute.end, selectedRoute.profile);
            const routes = await this.calculateRoutes(firstSkiResort, 6, 2, selectedRoute.profile);
            return res.status(200).json({ statusCode: 200, message: 'All paths calculated successfully', data: routes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }

    // calculate all possible paths between the first ski resort and the first route
    async calculateRoutes(data, startId, endId, profile) {
        let routes = this.findAllPaths(data, startId, endId);
        return routes;
    }

    findAllPaths(graph, startNodeId, endNodeId, shortestPath = [], visited = new Set(), currentPath = [], allPaths = []) {
        // Check if graph.nodes array exists
        if (!graph.nodes || graph.nodes.length === 0) {
            return [];
        }

        // Find current node by startNodeId
        const currentNode = graph.nodes.find(node => node.id === startNodeId);
        if (!currentNode) {
            return [];
        }

        // Add current node to current path
        currentPath.push(currentNode);

        // Mark current node as visited
        visited.add(startNodeId);

        // If current node is the end node, add current path to all paths
        if (startNodeId === endNodeId) {
            allPaths.push([...currentPath]);
        } else {
            // Explore neighbors
            const edges = graph.edges.filter(edge => edge.direction.source === startNodeId);
            for (const edge of edges) {
                const neighborId = edge.direction.target;
                if (!visited.has(neighborId)) {
                    this.findAllPaths(graph, neighborId, endNodeId, shortestPath, visited, currentPath, allPaths);
                }
            }
        }

        // Remove current node from current path and mark it as unvisited
        currentPath.pop();
        visited.delete(startNodeId);

        // Check if the current path is part of the shortest path
        const pathEdges = allPaths[allPaths.length - 1]; // Last path added to allPaths
        pathEdges.forEach(pathEdge => {
            if (shortestPath.find(shortestPathEdge => shortestPathEdge.id === pathEdge.id)) {
                pathEdge.highlighted = true;
            } else {
                pathEdge.highlighted = false;
            }
        });

        const textDescription = currentPath.map((node, index) => {
            if (index === 0) return `From Node ${node.title}`;
            const prevNode = currentPath[index - 1];
            const edge = graph.edges.find(edge => edge.direction.source === prevNode.id && edge.direction.target === node.id);
            if (edge) {
                if (edge.type === "lift") {
                    return `take the ${edge.popup.title} lift to Node ${node.title}`;
                } else {
                    return `take the ${edge.popup.title} slope to Node ${node.title}`;
                }
            }
        }).filter(description => description !== undefined).join(", ");

        return {
            paths: allPaths.map(path => path.map(node => node.title)),
            textDescription: textDescription
        };
    }
}

module.exports = CRController;

// adjust slope speed to 20 km/h
// if user does not select a difficulty level dont incorporate it in the calculation.
// filter out only one route based on user filter.
// let user select another route if they want to.