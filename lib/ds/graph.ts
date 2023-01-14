type NodesInterface = {
  [key: number]: number[];
};

export class Graph {
  private nodes: NodesInterface = {};

  addNode(value: number): void {
    this.nodes[value] = [];
  }

  addEdge(valueOne: number, valueTwo: number): void {
    this.nodes[valueOne]?.push(valueTwo);
    this.nodes[valueTwo]?.push(valueOne);
  }

  showConnections(): string {
    return Object.entries(this.nodes)
      .map((node) => {
        const connections: number[] = [];
        node[1].map((connection) => connections.push(connection));
        return `${node[0]} --> ${connections.join(",")}`;
      })
      .join("|>");
  }

  adjacent(vertexX: number, vertexY: number): boolean {
    return this.nodes[vertexX]?.includes(vertexY) as boolean;
  }

  neighbors(vertexX: number): number[] {
    return this.nodes[vertexX] || [];
  }

  removeVertex(vertexX: number): void {
    if (this.nodes[vertexX]) delete this.nodes[vertexX];
    return;
  }

  removeEdge(vertexX: number, vertexY: number): void {
    if (!(this.nodes[vertexX] && this.adjacent(vertexX, vertexY))) return;
    this.nodes[vertexX] = this.nodes[vertexX]?.filter(
      (edge) => edge !== vertexY
    ) as number[];
  }

  getVertexValue(vertexX: number): number[] | undefined {
    if (!this.nodes[vertexX]) return undefined;
    return this.nodes[vertexX] as number[];
  }

  // !The basic operations provided by a graph data structure G usually include:
  // * adjacent(G, x, y): tests whether there is an edge from the vertex x to the vertex y;
  // * neighbors(G, x): lists all vertices y such that there is an edge from the vertex x to the vertex y;
  // * add_vertex(G, x): adds the vertex x, if it is not there;
  // * add_edge(G, x, y, z): adds the edge z from the vertex x to the vertex y, if it is not there;
  // * remove_vertex(G, x): removes the vertex x, if it is there;
  // * remove_edge(G, x, y): removes the edge from the vertex x to the vertex y, if it is there;
  // * get_vertex_value(G, x): returns the value associated with the vertex x;
  // set_vertex_value(G, x, v): sets the value associated with the vertex x to v.

  // !Structures that associate values to the edges usually also provide:
  // get_edge_value(G, x, y): returns the value associated with the edge (x, y);
  // set_edge_value(G, x, y, v): sets the value associated with the edge (x, y) to v.
}

const graphInstance = new Graph();
graphInstance.addNode(1);
graphInstance.addNode(2);
graphInstance.addNode(3);
graphInstance.addNode(4);
graphInstance.addEdge(1, 2);
graphInstance.addEdge(1, 3);
graphInstance.addEdge(3, 4);
console.log(graphInstance.adjacent(2, 1));
console.log(graphInstance.neighbors(1));
console.log(graphInstance.nodes);
// console.log(graphInstance.removeVertex(1));
// console.log(graphInstance.removeEdge(3, 1));
console.log(graphInstance.nodes);
console.log(graphInstance.getVertexValue(1));
