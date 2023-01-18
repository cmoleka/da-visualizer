"use client";

import type { Dispatch, FC, SetStateAction } from "react";
import { useState, useEffect } from "react";
import ClassNames from "classnames";

type NodeProps = {
  distance: number;
  edges: number[];
  isVisited: boolean;
  isWall: boolean;
  isSource: boolean;
  isTarget: boolean;
};

type BoardProps = {
  boardSize: number;
  nodes: Map<number, NodeProps>;
  edges: Map<string, number>;
  handleGetSource: Dispatch<SetStateAction<number>>;
  handleGetTarget: Dispatch<SetStateAction<number>>;
};

export const BoardComponent: FC<BoardProps> = ({
  boardSize,
  nodes,
  edges,
  handleGetSource,
  handleGetTarget,
}) => {
  const [board, setBoard] = useState<[number, NodeProps][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState<boolean>(false);
  const MAXSSIZE = boardSize;
  useEffect(() => {
    const newBoard = [...Array.from(nodes).values()];
    setBoard([...newBoard]);
  }, [nodes, MAXSSIZE]);

  const handleMouseDown = (nodeId: number) => {
    if (!nodes.get(nodeId)) return;
    const vertex = nodes.get(nodeId) as NodeProps;
    // if (e.detail >= 1) {
    //   Object.assign(vertex, { isTarget: !nodes.get(nodeId)?.isTarget });
    //   handleGetTarget(nodeId);
    // } else {
    //   Object.assign(vertex, { isSource: !nodes.get(nodeId)?.isSource });
    //   handleGetSource(nodeId);
    // }
    Object.assign(vertex, { isWall: !nodes.get(nodeId)?.isWall });
    setMouseIsPressed(true);
  };

  const handleMouseEnter = () => {
    if (!mouseIsPressed) return;
    setBoard([...Array.from(nodes)]);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <figure className="mx-auto flex max-h-0 w-full flex-wrap border-2 border-gray-900">
      {board?.map(([node, nodeData], nodeIdx) => (
        <NodeItem
          key={nodeIdx}
          nodeId={node}
          nodeData={nodeData}
          MouseDown={handleMouseDown}
          MouseEnter={handleMouseEnter}
          MouseUp={handleMouseUp}
          setSource={handleGetSource}
          setTarget={handleGetTarget}
        />
      ))}
    </figure>
  );
};

interface NodeItemProps {
  nodeId: number;
  nodeData: NodeProps;
  MouseDown: (id: number) => void;
  MouseEnter: () => void;
  MouseUp: () => void;
  setSource: (id: number) => void;
  setTarget: (id: number) => void;
}

const NodeItem: FC<NodeItemProps> = ({
  nodeId,
  nodeData: { distance, edges, isVisited, isWall, isSource, isTarget },
  MouseDown,
  MouseEnter,
  MouseUp,
  setSource,
  setTarget,
}) => {
  const SquareClasses = ClassNames({
    "bg-green-500": isVisited && !isWall && !isTarget && !isSource,
    "bg-white": !isVisited && !isWall && !isSource && !isTarget,
    "bg-gray-900": isWall,
    "bg-orange-500": isSource,
    "bg-purple-500": isTarget,
  });

  return (
    <div
      id={`node${nodeId}-${edges.join("-")}`}
      className={`${SquareClasses} h-10 w-10 cursor-pointer border-2 border-gray-900`}
      onMouseEnter={MouseEnter}
      onMouseDown={() => MouseDown(nodeId)}
      onMouseUp={MouseUp}
      onClick={() => setSource(nodeId)}
      onDoubleClick={() => setTarget(nodeId)}
    />
  );
};
