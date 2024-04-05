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

    selectShortest(allPaths, shortestPath, graph) {
        for (const path of allPaths) {
            const pathIds = path.map(node => node.id);
            const pathLength = shortestPath.reduce((totalLength, edge) => {
                if (pathIds.includes(edge.id)) {
                    return totalLength + edge.length;
                }
                return totalLength;
            }, 0);
            if (pathLength <= this.shortestPathLength) {
                this.shortestPathLength = pathLength;
                this.shortestPathRoute = path;
            }
        }
        // Shortest path description
        const shortestPathDescription = this.findOptionalPathDescription(graph, this.shortestPathRoute, false, 0, false, 0);
        return { shortestPath: this.shortestPathRoute, shortestPathDescription };
    }

    selectQuickest(allPaths, graph) {
        for (const path of allPaths) {
            let pathTime = 0;
            for (let i = 0; i < path.length - 1; i++) {
                const currentNode = path[i];
                const nextNode = path[i + 1];
                const edge = graph.edges.find(edge => edge.direction && edge.direction.source === currentNode.id && edge.direction.target === nextNode.id);
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
            if (pathTime < this.shortestTime) {
                this.shortestTime = pathTime;
                this.shortestTimeRoute = path;
            }
        }
        // Quickest path description
        const quickestPathDescription = this.findOptionalPathDescription(graph, this.shortestTimeRoute, true, this.shortestTime, false, 0);
        return { quickestPath: this.shortestTimeRoute, quickestPathDescription };
    }

    selectEasiest(allPaths, graph, difficulties) {
        for (const path of allPaths) {
            let pathScore = 0;
            let containsSlope = false;
            for (let i = 0; i < path.length - 1; i++) {
                const currentNode = path[i];
                const nextNode = path[i + 1];
                const edge = graph.edges.find(edge => edge.direction && edge.direction.source === currentNode.id && edge.direction.target === nextNode.id);
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
            if (containsSlope && pathScore < this.easiestPathScore) {
                this.easiestPathScore = pathScore;
                this.easiestPath = path;
            }
        }
        // Easiest path description
        const easiestPathDescription = this.findOptionalPathDescription(graph, this.easiestPath, false, 0, true, this.easiestPathScore);
        return { easiestPath: this.easiestPath, easiestPathDescription };
    }

    selectMinimalLiftUsage(allPaths, graph) {
        for (const path of allPaths) {
            let liftCount = 0;
            for (let i = 0; i < path.length - 1; i++) {
                const currentNode = path[i];
                const nextNode = path[i + 1];
                const edge = graph.edges.find(edge => edge.direction && edge.direction.source === currentNode.id && edge.direction.target === nextNode.id);
                if (edge && edge.type === "lift") {
                    liftCount++;
                }
            }
            if (liftCount < this.minLiftsCount) {
                this.minLiftsCount = liftCount;
                this.minLiftsPath = path;
            }
        }
        // Minimal lift usage path description
        const minLiftsPathDescription = this.findOptionalPathDescription(graph, this.minLiftsPath, false, 0, false, 0);
        return { minLiftsPath: this.minLiftsPath, minLiftsPathDescription };
    }

    // Get the shortest path description
    findOptionalPathDescription(graph, routes, isTime = false, time = 0, isEasiest = false, score = 0) {
        const route = routes.map(node => node.title).join(" -> ");
        const textDescription = routes.map((node, index) => {
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
        }).filter(description => description !== undefined).join(", ");
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