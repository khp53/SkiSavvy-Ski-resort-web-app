const PriorityQueue = require("../model/priorityQueue");
class RouteOptions {
    constructor() {
        this.shortestPathLength = Infinity;
        this.shortestPathRoute = [];
        this.shortestTime = Infinity;
        this.shortestTimeRoute = [];
        this.easiestPathScore = Infinity;
        this.easiestPath = [];
        this.minLiftsCount = Infinity;
        this.minLiftsPath = [];
    }

    selectShortest(allPaths, startNodeId, endNodeId, graph) {
        const distances = {};
        const previous = {};
        const visited = new Set();
        const queue = new PriorityQueue();

        // Initialize distances
        graph.nodes.forEach(node => {
            distances[node.id] = Infinity;
            previous[node.id] = null;
        });
        distances[startNodeId] = 0;

        queue.enqueue(startNodeId, 0);

        while (!queue.isEmpty()) {
            const currentId = queue.dequeue().element;
            visited.add(currentId);

            if (currentId === endNodeId) {
                break; // Found the shortest path
            }

            const neighbors = this.findNeighbors(currentId, allPaths);
            for (const neighborId of neighbors) {
                if (!visited.has(neighborId)) {
                    const edge = this.findEdge(currentId, neighborId, allPaths);
                    const weight = edge.type === "slope" ? edge.popup["additional-info"].length : 1;
                    const distanceToNeighbor = distances[currentId] + weight;

                    if (distanceToNeighbor < distances[neighborId]) {
                        distances[neighborId] = distanceToNeighbor;
                        previous[neighborId] = currentId;
                        queue.enqueue(neighborId, distanceToNeighbor);
                    }
                }
            }
        }

        // Reconstruct the shortest path
        const shortestPath = [];
        let currentNode = endNodeId;
        while (currentNode !== null) {
            shortestPath.unshift(currentNode);
            currentNode = previous[currentNode];
        }

        // Convert shortest path node IDs to node objects
        const shortestPathRoute = shortestPath.map(nodeId => {
            const node = graph.nodes.find(n => n.id === nodeId);
            if (node) {
                return {
                    _id: node._id,
                    id: node.id,
                    title: node.title,
                    latLng: node.latLng
                };
            } else {
                return null;
            }
        }).filter(node => node !== null);

        // Shortest path description
        const shortestPathDescription = this.findOptionalPathDescription(graph, shortestPathRoute, false, 0, false, 0);
        return { shortestPath: shortestPathRoute, shortestPathDescription };
    }

    findNeighbors(nodeId, allPaths) {
        const neighbors = new Set();
        allPaths.forEach(path => {
            const index = path.findIndex(node => node.id === nodeId);
            if (index !== -1) {
                if (index > 0) {
                    neighbors.add(path[index - 1].id);
                }
                if (index < path.length - 1) {
                    neighbors.add(path[index + 1].id);
                }
            }
        });
        return Array.from(neighbors);
    }

    findEdge(sourceId, targetId, allPaths) {
        return allPaths.find(path => {
            for (let i = 0; i < path.length - 1; i++) {
                if ((path[i].id === sourceId && path[i + 1].id === targetId) ||
                    (path[i].id === targetId && path[i + 1].id === sourceId)) {
                    return true;
                }
            }
            return false;
        });
    }

    selectQuickest(allPaths, graph) {
        let shortestTime = Infinity;
        let shortestTimeRoute = null;

        for (const path of allPaths) {
            let pathTime = 0;

            for (let i = 0; i < path.length - 1; i++) {
                const currentNode = path[i];
                const nextNode = path[i + 1];
                const edge = graph.edges.find(edge =>
                    edge.direction &&
                    edge.direction.source === currentNode.id &&
                    edge.direction.target === nextNode.id
                );

                if (edge) {
                    if (edge.type === "lift") {
                        pathTime += edge.time;
                    } else {
                        const speed = edge.speed;
                        const length = edge.popup["additional-info"].length;
                        pathTime += length / speed;
                    }
                }
            }

            if (pathTime < shortestTime) {
                shortestTime = pathTime;
                shortestTimeRoute = path;
            }
        }

        // Quickest path description
        const quickestPathDescription = this.findOptionalPathDescription(graph, shortestTimeRoute, true, shortestTime, false, 0);
        return { quickestPath: shortestTimeRoute, quickestPathDescription };
    }

    selectEasiest(allPaths, graph, difficulties) {
        let easiestPath = null;
        let easiestPathScore = Infinity;

        for (const path of allPaths) {
            let pathScore = 0;
            let containsSlope = false;

            for (let i = 0; i < path.length - 1; i++) {
                const currentNode = path[i];
                const nextNode = path[i + 1];

                const edge = graph.edges.find(edge =>
                    edge.direction &&
                    edge.direction.source === currentNode.id &&
                    edge.direction.target === nextNode.id
                );

                if (edge && edge.type !== "lift") { // Consider only slope edges
                    containsSlope = true;
                    let multiplier = 1; // Default multiplier for easy difficulty
                    if (difficulties.includes(edge.difficulty)) {
                        if (edge.difficulty === "medium") {
                            multiplier = 1.5; // Multiplier for medium difficulty
                        } else if (edge.difficulty === "difficult") {
                            multiplier = 2; // Multiplier for difficult difficulty
                        }
                    }
                    const length = edge.popup["additional-info"].length;
                    pathScore += length * multiplier;
                }
            }

            if (containsSlope && pathScore < easiestPathScore) {
                easiestPathScore = pathScore;
                easiestPath = path;
            }
        }

        // Easiest path description
        const easiestPathDescription = this.findOptionalPathDescription(graph, easiestPath, false, 0, true, easiestPathScore);
        return { easiestPath, easiestPathDescription };
    }

    selectMinimalLiftUsage(allPaths, graph) {
        let minLiftsCount = Infinity;
        let minLiftsPath = null;

        for (const path of allPaths) {
            let liftCount = 0;

            for (let i = 0; i < path.length - 1; i++) {
                const currentNode = path[i];
                const nextNode = path[i + 1];
                const edge = graph.edges.find(edge =>
                    edge.direction &&
                    edge.direction.source === currentNode.id &&
                    edge.direction.target === nextNode.id
                );

                if (edge && edge.type === "lift") {
                    liftCount++;
                }
            }

            if (liftCount < minLiftsCount) {
                minLiftsCount = liftCount;
                minLiftsPath = path;
            }
        }

        // Minimal lift usage path description
        const minLiftsPathDescription = this.findOptionalPathDescription(graph, minLiftsPath, false, 0, false, 0);
        return { minLiftsPath, minLiftsPathDescription };
    }

    // Get the shortest path description
    findOptionalPathDescription(graph, routes, isTime = false, time = 0, isEasiest = false, score = 0) {
        const route = routes ? routes.map(node => node.title).join(" -> ") : "";
        const textDescription = routes ? routes.map((node, index) => {
            if (index === 0) return `From Node ${node.title}`;
            const prevNode = routes[index - 1];
            const edge = graph.edges.find(edge => edge.direction.source === prevNode.id && edge.direction.target === node.id);
            if (edge) {
                if (edge.type === "lift") {
                    return `take the ${edge.popup.title} lift to Node ${node.title}`;
                } else {
                    return `take the ${edge.popup.title} slope to Node ${node.title}`;
                }
            }
        }).filter(description => description !== undefined).join(", ") : "";
        if (isTime) {
            return { route, textDescription, time };
        } else if (isEasiest) {
            return { route, textDescription, score };
        }
        else {
            return { route, textDescription };
        }
    }
}

module.exports = RouteOptions;