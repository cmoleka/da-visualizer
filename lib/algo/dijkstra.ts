import type { Graph } from "@lib/ds/graph";
import type { Queue } from "@lib/ds/queue";

/**
* *pseudo code of the algorithm:
* function Dijkstra(Graph, source):
    dist[source]  := 0                     // Distance from source to source is set to 0
    for each vertex v in Graph:            // Initializations
        if v ≠ source
            dist[v]  := infinity           // Unknown distance function from source to each node set to infinity
        add v to Q                         // All nodes initially in Q

    whilQ is not empty:                  // The main loop
        v := vertex in Q with min dist[v]  // In the first run-through, this vertex is the source node
        remove v from Q

        for each neighbor u of v:           // where neighbor u has not yet been removed from Q.
            alt := dist[v] + length(v, u)
            if alt < dist[u]:               // A shorter path to u has been found
                dist[u]  := alt            // Update distance of u

    return dist[]
  end function
  */
export const Dijkstra = (
  Graph: Graph,
  Queue: Queue<number>,
  source: number,
  target: number
): number[] | null => {
  Array.from(Graph.nodes).forEach(([node]) => {
    node !== source
      ? Graph.setVertexDistance(node, Infinity)
      : Graph.setVertexDistance(node, 0);
    node === source && Graph.setVertexIsSource(node, true);
    Queue.enqueue(node);
  });

  while (!Queue.isEmpty()) {
    let vertex = Array.from(Queue.queue).reduce((min, vertex) => {
      return (Graph.getVertexDistance(vertex) as number) <
        (Graph.getVertexDistance(min) as number)
        ? vertex
        : min;
    });
    if (Graph.getVertexIsVisited(vertex)) continue;
    Graph.setVertexIsVisited(vertex, true);
    Queue.dequeue();

    if (vertex === target) {
      const path: number[] = [vertex];
      while (vertex !== target) {
        path.unshift(Graph.getEdgeValueByNode(vertex) as number);
        vertex = Graph.getEdgeValueByNode(vertex) as number;
      }
      Graph.setVertexIsTarget(vertex, true);
      return path;
    }

    if (Graph.getVertexIsWall(vertex)) {
      continue;
    }

    for (const neighbor of Graph.getVertexValue(vertex) as number[]) {
      const alt = Graph.getVertexIsWall(neighbor)
        ? (Graph.getVertexDistance(vertex) as number) + 5
        : (Graph.getVertexDistance(vertex) as number) + 1;
      // (Graph.getNodeKey(vertex) as number) +
      // ((Graph.edges.get(`${vertex}-${neighbor}`) as number)
      //   ? (Graph.edges.get(`${vertex}-${neighbor}`) as number)
      //   : 1);
      if (alt < (Graph.getVertexDistance(neighbor) as number)) {
        Graph.setVertexDistance(neighbor, alt);
        Graph.setEdgeValueByNode(neighbor, alt);
      }
    }
  }
  return null;
};

/**
* *The graph has the following:
  - vertices, or nodes, denoted in the algorithm by v or u;
  - weighted edges that connect two nodes: (u,v) denotes an edge, and w(u,v) denotes its weight.

* *This is done by initializing three values:

  - dist, an array of distances from the source node s to each node in the graph, initialized the following way: dist(s) = 0; and for all other nodes v, dist(v) = infinity. This is done at the beginning because as the algorithm proceeds, the dist from the source to each node v in the graph will be recalculated and finalized when the shortest distance to v is found

  - Q, a queue  of all nodes in the graph. At the end of the algorithm's progres, Q will be empty.

  - S, an empty set, to indicate which nodes the algorithm has visited. At the end of the algorithm's run, S will contain all the nodes of the graph.

* *The algorithm proceeds as follows:
  - While Q is not empty, pop the node v, that is not already in S, from Q with the smallest dist (v). In the first run, source node s will be chosen because dist(s) was initialized to 0. In the next run, the next node with the smallest dist value is chosen.

  - Add node v to S, to indicate that v has been visited

  - Update dist values of adjacent nodes of the current node v as follows: for each new adjacent node u,

    - if dist (v) + weight(u,v) < dist (u), there is a new minimal distance found for u, so update dist (u) to the new minimal distance value;

    - otherwise, no updates are made to dist (u).

*  * The algorithm has visited all nodes in the graph and found the smallest distance to each node. dist now contains the shortest path tree from source s.

* !Note: The weight of an edge (u,v) is taken from the value asociated with (u,v) on the graph.
*/
