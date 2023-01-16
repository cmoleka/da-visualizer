"use client";

import type { FC } from "react";
import { useState } from "react";
import ClassNames from "classnames";

type BoardProps = {
  boardSize: number;
  nodes: Map<number, number[]>;
  edges: Map<string, number>;
};
export const BoardComponent: FC<BoardProps> = ({ boardSize, nodes, edges }) => {
  return (
    <figure className="flex max-h-0 w-full flex-wrap border-2 border-gray-900">
      {[...Array.from(nodes).values()].map(([node, nodeEdges], nodeIdx) => (
        <NodeItem key={nodeIdx} node={node} edges={nodeEdges} />
      ))}
    </figure>
  );
};

type NodeProps = {
  node: number;
  edges: number[];
};
const NodeItem: FC<NodeProps> = ({ node, edges }) => {
  const [isVisited, setVisited] = useState<boolean>(false);
  const SquareClasses = ClassNames({
    "bg-green-500": isVisited,
    "bg-white": !isVisited,
  });
  return (
    <div
      id={`node${node}-${edges.join("-")}`}
      className={`${SquareClasses} h-10 w-10 border-2 border-gray-900`}
    />
  );
};
