

const RouteOptions = require('./routeOptions');
class CRController {
    constructor() {
        this.routeOptions = new RouteOptions();
    }

    // get the first ski resort by using skiResortController getTheFirstSkiResort method
    // and using the getFirstRoute method to get the first route
    // calculate all possible paths between the first ski resort and the first route
    // and return all possible paths
    async calculateAllRoutes(req, res) {
        try {
            const skiResortController = req.resortController;
            const firstSkiResort = await skiResortController.getFirstSkiResortData.bind(skiResortController)();
            // const firstSkiResort = await this.SkiResort.findOne();
            const routeSelectionController = req.routeSelectionController;
            const selectedRoute = await routeSelectionController.getFirstSelection.bind(routeSelectionController);
            //const routes = await this.calculateRoutes(firstSkiResort, selectedRoute.start, selectedRoute.end, selectedRoute.profile);
            const firstSkiResortString = JSON.stringify(firstSkiResort);
            const firstSkiResortParsed = JSON.parse(firstSkiResortString);
            let difficulties = [];
            const routes = this.calculateRoutes(firstSkiResortParsed, 28, 26, difficulties);
            return res.status(200).json({ statusCode: 200, message: 'All paths calculated successfully', data: routes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }

    // calculate all possible paths between the first ski resort and the first route
    calculateRoutes(graph, startNodeId, endNodeId, difficulties, shortestPath = [], visited = new Set(), currentPath = [], allPaths = []) {
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
            const edges = graph.edges.filter(edge => edge.direction && edge.direction.source === startNodeId);
            for (const edge of edges) {
                const neighborId = edge.direction.target;
                if (!visited.has(neighborId)) {
                    // Check if edge is of type "lift" and include it in the paths
                    if (edge.type === "lift" || (difficulties.length === 0 || (difficulties.includes(edge.difficulty) && edge.type === "slope"))) {
                        if (edge.popup["additional-info"] && edge.popup["additional-info"].length) {
                            shortestPath.push({ id: edge.id, length: edge.popup["additional-info"].length });
                        }
                        this.calculateRoutes(graph, neighborId, endNodeId, difficulties, shortestPath.slice(), visited, currentPath.slice(), allPaths);
                        if (edge.popup["additional-info"] && edge.popup["additional-info"].length) {
                            shortestPath.pop();
                        }
                    }
                }
            }
        }

        const shortestPathRoute = this.routeOptions.selectShortest(allPaths, shortestPath, graph);
        const shortestTimeRoute = this.routeOptions.selectQuickest(allPaths, graph);
        const easiestPath = this.routeOptions.selectEasiest(allPaths, graph, difficulties);
        const minLiftsPath = this.routeOptions.selectMinimalLiftUsage(allPaths, graph);

        // Generate text description for each path
        const pathsWithDescriptions = this.findAllPathDescriptions(graph, allPaths);

        return {
            all: { allPaths, pathsWithDescriptions }, short: shortestPathRoute, time: shortestTimeRoute,
            easy: easiestPath, minLift: minLiftsPath
        };
    }

    findAllPathDescriptions(graph, allPaths) {
        const pathsWithDescriptions = allPaths.map(path => {
            const route = path.map(node => node.title).join(" -> ");
            const textDescription = path.map((node, index) => {
                if (index === 0) return `From Node ${node.title}`;
                const prevNode = path[index - 1];
                const edge = graph.edges.find(edge => edge.direction.source === prevNode.id && edge.direction.target === node.id);
                if (edge) {
                    if (edge.type === "lift") {
                        return `take the ${edge.popup.title} lift to Node ${node.title}`;
                    } else {
                        return `take the ${edge.popup.title} slope to Node ${node.title}`;
                    }
                }
            }).filter(description => description !== undefined).join(", ");
            return { route, textDescription };
        });
        return pathsWithDescriptions;
    }
}

module.exports = CRController;