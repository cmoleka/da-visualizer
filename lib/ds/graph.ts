type NodeProps = {
  distance: number;
  edges: number[];
  isVisited: boolean;
  isWall: boolean;
  isSource: boolean;
  isTarget: boolean;
};

export class Graph {
  nodes: Map<number, NodeProps> = new Map();
  edges: Map<string, number> = new Map();

  // !The basic operations provided by a graph data structure G usually include:
  // * add_vertex(G, x): adds the vertex x, if it is not there;
  addVertex(vertexX: number): void {
    this.nodes.set(vertexX, {
      distance: 0,
      edges: [],
      isVisited: false,
      isWall: false,
      isSource: false,
      isTarget: false,
    });
  }

  // * add_edge(G, x, y, z): adds the edge z from the vertex x to the vertex y, if it is not there;
  addEdge(vertexX: number, vertexY: number): void {
    this.nodes.get(vertexX)?.edges?.push(vertexY);
    this.nodes.get(vertexY)?.edges?.push(vertexX);
  }

  showConnections(): string {
    const result: string[] = [];
    for (const [nodeId, nodeValue] of this.nodes.entries()) {
      const connections: number[] = [];
      nodeValue.edges?.map((edge) => connections.push(edge));
      result.push(`${nodeId} --> ${connections.join(",")}`);
    }
    return result.join("|>");
  }

  // * adjacent(G, x, y): tests whether there is an edge from the vertex x to the vertex y;
  adjacent(vertexX: number, vertexY: number): boolean {
    return this.nodes.get(vertexX)?.edges?.includes(vertexY) as boolean;
  }

  // * neighbors(G, x): lists all vertices y such that there is an edge from the vertex x to the vertex y;
  neighbors(vertexX: number): number[] {
    return this.nodes.get(vertexX)?.edges || [];
  }

  // * remove_vertex(G, x): removes the vertex x, if it is there;
  removeVertex(vertexX: number): void {
    if (this.nodes.get(vertexX)) this.nodes.delete(vertexX);
  }

  // * remove_edge(G, x, y): removes the edge from the vertex x to the vertex y, if it is there;
  removeEdge(vertexX: number, vertexY: number): void {
    if (!(this.nodes.has(vertexX) && this.adjacent(vertexX, vertexY))) return;
    this.nodes.set(vertexX, {
      edges: this.nodes.get(vertexX)?.edges?.filter((edge) => edge !== vertexY),
    } as NodeProps);
  }

  // * get_vertex_value(G, x): returns the value associated with the vertex x;
  getVertexValue(vertexX: number): number[] | undefined {
    if (!this.nodes.get(vertexX)) return undefined;
    return this.nodes.get(vertexX)?.edges as number[];
  }

  // * set_vertex_value(G, x, v): sets the value associated with the vertex x to v.
  setVertexValue(vertexX: number, value: Partial<NodeProps>): void {
    if (!this.nodes.get(vertexX)) return;
    const vertex = this.nodes.get(vertexX) as NodeProps;
    Object.assign(vertex, value);
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

  getNodeKey(vertex: number): number | void {
    for (const [node] of this.nodes.entries()) {
      if (node === vertex) {
        return node;
      }
    }
  }
  getEdgeValueByNode(vertex: number): number | void {
    for (const [, value] of this.edges.entries()) {
      if (value === vertex) {
        return value;
      }
    }
  }
  setEdgeValueByNode(vertex: number, value: number): void {
    for (const [edgeKey, edgevalue] of this.edges.entries()) {
      if (edgevalue === vertex) {
        this.edges.set(edgeKey, value);
      }
    }
  }
  getVertexDistance(vertex: number): number | undefined {
    for (const [node, data] of this.nodes.entries()) {
      if (node === vertex) {
        return data.distance;
      }
    }
  }
  setVertexDistance(vertexX: number, value: number): void {
    if (!this.nodes.get(vertexX)) return;
    const vertex = this.nodes.get(vertexX) as NodeProps;
    Object.assign(vertex, { distance: value });
  }
  getVertexIsWall(vertex: number): boolean | undefined {
    for (const [node, data] of this.nodes.entries()) {
      if (node === vertex) {
        return data.isWall;
      }
    }
  }
  setVertexIsWall(vertexX: number, value: boolean): void {
    if (!this.nodes.get(vertexX)) return;
    const vertex = this.nodes.get(vertexX) as NodeProps;
    Object.assign(vertex, { isWall: value });
  }
  getVertexIsVisited(vertex: number): boolean | undefined {
    for (const [node, data] of this.nodes.entries()) {
      if (node === vertex) {
        return data.isVisited;
      }
    }
  }
  setVertexIsVisited(vertexX: number, value: boolean): void {
    if (!this.nodes.get(vertexX)) return;
    const vertex = this.nodes.get(vertexX) as NodeProps;
    Object.assign(vertex, { isVisited: value });
  }
  setVertexIsSource(vertexX: number, value: boolean): void {
    if (!this.nodes.get(vertexX)) return;
    const vertex = this.nodes.get(vertexX) as NodeProps;
    Object.assign(vertex, { isSource: value });
  }
  setVertexIsTarget(vertexX: number, value: boolean): void {
    if (!this.nodes.get(vertexX)) return;
    const vertex = this.nodes.get(vertexX) as NodeProps;
    Object.assign(vertex, { isTarget: value });
  }
}

