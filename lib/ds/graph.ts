export class Graph {
  // nodes: { [key: number]: number[] } = {};
  nodes: Map<number, number[]> = new Map();
  edges: Map<string, number> = new Map();

  // !The basic operations provided by a graph data structure G usually include:
  // * add_vertex(G, x): adds the vertex x, if it is not there;
  addVertex(vertexX: number): void {
    this.nodes.set(vertexX, []);
  }

  // * add_edge(G, x, y, z): adds the edge z from the vertex x to the vertex y, if it is not there;
  addEdge(vertexX: number, vertexY: number): void {
    this.nodes.get(vertexX)?.push(vertexY);
    this.nodes.get(vertexY)?.push(vertexX);
  }

  showConnections(): string {
    const result: string[] = [];
    for (const [node, edges] of this.nodes.entries()) {
      const connections: number[] = [];
      edges.map((edge) => connections.push(edge));
      result.push(`${node} --> ${connections.join(",")}`);
    }
    return result.join("|>");
  }

  // * adjacent(G, x, y): tests whether there is an edge from the vertex x to the vertex y;
  adjacent(vertexX: number, vertexY: number): boolean {
    return this.nodes.get(vertexX)?.includes(vertexY) as boolean;
  }

  // * neighbors(G, x): lists all vertices y such that there is an edge from the vertex x to the vertex y;
  neighbors(vertexX: number): number[] {
    return this.nodes.get(vertexX) || [];
  }

  // * remove_vertex(G, x): removes the vertex x, if it is there;
  removeVertex(vertexX: number): void {
    if (this.nodes.get(vertexX)) this.nodes.delete(vertexX);
  }

  // * remove_edge(G, x, y): removes the edge from the vertex x to the vertex y, if it is there;
  removeEdge(vertexX: number, vertexY: number): void {
    if (!(this.nodes.has(vertexX) && this.adjacent(vertexX, vertexY))) return;
    this.nodes.set(
      vertexX,
      this.nodes.get(vertexX)?.filter((edge) => edge !== vertexY) as number[]
    );
  }

  // * get_vertex_value(G, x): returns the value associated with the vertex x;
  getVertexValue(vertexX: number): number[] | undefined {
    if (!this.nodes.get(vertexX)) return undefined;
    return this.nodes.get(vertexX) as number[];
  }

  // * set_vertex_value(G, x, v): sets the value associated with the vertex x to v.
  setVertexValue(vertexX: number, value: number[]): void {
    if (!this.nodes.get(vertexX)) return;
    this.nodes.set(vertexX, value);
  }

  // !Structures that associate values to the edges usually also provide:
  // * get_edge_value(G, x, y): returns the value associated with the edge (x, y);
  getEdgeValue(vertexX: number, vertexY: number): number | void {
    if (!this.adjacent(vertexX, vertexY)) return;
    return this.edges.get(`${vertexX}-${vertexY}`);
  }
  // * set_edge_value(g, x, y, v): sets the value associated with the edge (x, y) to v.
  setEdgeValue(vertexX: number, vertexY: number, value: number): void {
    if (!this.adjacent(vertexX, vertexY)) return;
    this.edges.set(`${vertexX}-${vertexY}`, value);
  }
}

// const G = new Graph();
// G.addVertex(1);
// G.addVertex(2);
// G.addVertex(3);
// G.addEdge(1, 2);
// G.addEdge(1, 3);

// console.log(G);
// console.log(G.neighbors(2));
// console.log(G.nodes);
// // console.log(G.removeEdge(1, 2));
// // console.log(G.removeVertex(2));
// console.log(G.nodes);
// console.log(G.showConnections());
