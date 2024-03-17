class SkiResortModel {
    constructor(_id, nodes, edges) {
        this._id = _id;
        this.nodes = nodes.map(node => new Node(nodes.id, nodes.name));
        this.edges = edges.map(edge => new Edge(edges.source, edges.target));
    }
}

class Node {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Edge {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }
}
