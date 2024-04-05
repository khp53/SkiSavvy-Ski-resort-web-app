

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
            // get the first ski resort
            const firstSkiResort = await skiResortController.getFirstSkiResortData.bind(skiResortController)();

            const routeSelectionController = req.routeSelectionController;
            // get the first selection of user
            const selectedRoute = await routeSelectionController.getFirstSelection.bind(routeSelectionController)();
            // stringifying and parsing the first ski resort data
            const firstSkiResortString = JSON.stringify(firstSkiResort);
            const firstSkiResortParsed = JSON.parse(firstSkiResortString);
            // stringifying and parsing the first route data
            const selectedRouteString = JSON.stringify(selectedRoute);
            const selectedRouteParsed = JSON.parse(selectedRouteString);
            console.log(selectedRouteParsed);
            const routes = this.calculateRoutes(firstSkiResortParsed, selectedRouteParsed.start.id, selectedRouteParsed.end.id, selectedRouteParsed.profile.difficulty);
            return res.status(200).json({ statusCode: 200, message: 'All paths calculated successfully', data: routes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }

    // calculate all possible paths between the first ski resort and the first route
    calculateRoutes(graph, startNodeId, endNodeId, difficulties, shortestPath = [], visited = new Set(), currentPath = [], allPaths = []) {
        if (!graph.nodes || graph.nodes.length === 0) {
            return [];
        }

        const currentNode = graph.nodes.find(node => node.id === startNodeId);
        if (!currentNode) {
            return [];
        }

        currentPath.push(currentNode);

        visited.add(startNodeId);

        if (startNodeId === endNodeId) {
            allPaths.push([...currentPath]);
        } else {
            const edges = graph.edges.filter(edge => edge.direction && edge.direction.source === startNodeId);
            for (const edge of edges) {
                const neighborId = edge.direction.target;
                if (!visited.has(neighborId)) {
                    if (edge.type === "lift" || (difficulties.length === 0 || (difficulties.includes(edge.difficulty) && edge.type === "slope"))) {
                        this.calculateRoutes(graph, neighborId, endNodeId, difficulties, shortestPath.slice(), new Set(visited), currentPath.slice(), allPaths);
                    }
                }
            }
        }

        const shortestPathRoute = this.routeOptions.selectShortest(allPaths, startNodeId, endNodeId, graph);
        const shortestTimeRoute = this.routeOptions.selectQuickest(allPaths, graph);
        const easiestPath = this.routeOptions.selectEasiest(allPaths, graph, difficulties);
        const minLiftsPath = this.routeOptions.selectMinimalLiftUsage(allPaths, graph);

        const pathsWithDescriptions = this.findAllPathDescriptions(graph, allPaths);

        // Reset visited, and currentPath for next iteration
        visited.delete(startNodeId);
        currentPath.pop();

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