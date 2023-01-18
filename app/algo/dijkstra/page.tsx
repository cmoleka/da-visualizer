"use client";

import type { FC, FormEvent, MutableRefObject } from "react";
import { useRef, useState } from "react";
import { Dijkstra } from "@lib/algo/dijkstra";
import { Graph } from "@lib/ds/graph";
import { Queue } from "@lib/ds/queue";
import { BoardComponent } from "@ui/Board";

type FormType = {
  maxSize: number;
  sourceNode: number;
  targetNode: number;
  buttonId: string;
};

type NodeProps = {
  distance: number;
  edges: number[];
  isVisited: boolean;
  isWall: boolean;
  isSource: boolean;
  isTarget: boolean;
};


const DijkstraPage: FC = () => {
  const Form = useRef<HTMLFormElement>(null) as MutableRefObject<
    HTMLFormElement & FormType
  >;
  const MAX_SIZE = [50, 100, 200] as const;
  const [boardSize, setBoardSize] = useState<50 | 100 | 200 | 0>(0);
  const [graphInstance, setGraphInstance] = useState<Graph>(new Graph());

  const [queueInstance] = useState<Queue<number>>(
    new Queue({
      maxSize: boardSize,
    })
  );
  const [sourceNode, setSourceNode] = useState<number>(0);
  const [targetNode, setTargetNode] = useState<number>(0);

  const [isDone, setIsDone] = useState<boolean>(false);

  const [result, setResult] = useState<number[]>([]);
  const [isReset, setIsReset] = useState<boolean>(false);

  const handleOnMaxSizeChange = () => {
    const maxSize = Form.current.maxSize as 50 | 100 | 200;
    if (!maxSize) return;
    setBoardSize(maxSize);
    queueInstance.setMaxSize(maxSize);
  };

  const handleOnPopulate = () => {
    handleOnReset()
    const maxSize = Form.current.maxSize as 50 | 100 | 200;
    const newGraph = new Graph(graphInstance);
    for (let i = 1; i <= maxSize; i++) {
      newGraph.addVertex(i);
    }
    for (const vertex of newGraph.nodes.keys()) {
      if (vertex < maxSize) {
        newGraph.addEdge(vertex, vertex + 1);
        newGraph.setEdgeValue(vertex, vertex + 1, vertex);
      }
    }
    setGraphInstance(newGraph)
  };

  const handleOnReset = () => {
    // for (const node of graphInstance.nodes.keys()) {
    //   graphInstance.nodes.delete(node);
    // }
    // for (const edge of graphInstance.edges.keys()) {
    //   graphInstance.edges.delete(edge);
    // }
    // for (const item of queueInstance.queue.keys()) {
    //   queueInstance.queue.delete(item);
    // }
    setBoardSize(0);
    // graphInstance.nodes = new Map<number, NodeProps>();
    // graphInstance.edges = new Map<string, number>();
    queueInstance.queue = new Set<number>();
    const newGraph = new Graph()
    // const newQueue = new Queue({maxSize: 0})
    setGraphInstance(newGraph)
  };

  const handleAlgorithmRun = () => {
    if (!isDone) {
      const algoResult = Dijkstra(
        graphInstance,
        queueInstance,
        sourceNode,
        targetNode
      );
      // console.log(algoInstance);
      if (algoResult === null) {
        console.log("failed", algoResult);
        setResult([...result]);
        setIsDone(true);
        return;
      }
      console.log("Good?", algoResult);
      setResult([...result, algoResult] as number[]);
      setIsDone(true);
      // if (algoInstance !== null) setResult([...algoInstance]);
      // if (algoInstance !== null) setIsDone(true);
    }
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (Form.current.buttonId === "reset") handleOnReset();
    if (Form.current.buttonId === "populate") handleOnPopulate();
    if (Form.current.buttonId === "submit") handleAlgorithmRun();
  };

  return (
    <>
      <header className="space-y-4">
        <h1 className="mb-4  text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Dijkstra&#39;s Shortest Path Algorithm
        </h1>
        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
          Dijkstra&#39;s algorithm is an algorithm for finding the shortest
          paths between nodes in a graph, which may represent, for example, road
          networks. It was conceived by computer scientist Edsger W. Dijkstra in
          1956 and published three years later
        </p>
      </header>
      <main className="flex w-full flex-col justify-between gap-4 space-y-6 md:divide-y-2 ">
        <form
          onSubmit={handleOnSubmit}
          ref={Form}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex w-full flex-col space-y-4 md:w-1/2  md:space-y-0">
            <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Form
            </h2>
            <label
              htmlFor="maxsize"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Board size
            </label>
            <select
              name="boardSize"
              id="boardSize"
              defaultValue="Choose Here"
              itemType="number"
              onChange={(e) => {
                Form.current.maxSize = parseInt(e.target.value);
                handleOnMaxSizeChange();
              }}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="Choose Here" disabled>
                Select a size
              </option>
              {MAX_SIZE.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <button
              id="populate"
              name="populate"
              className="w-full rounded-md  bg-green-600 py-2  px-4 text-base font-bold capitalize text-white"
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                Form.current.buttonId = target.name;
              }}
            >
              Populate Board
            </button>
            <button
              id="reset"
              name="reset"
              className="w-full rounded-md  bg-red-600 py-2  px-4 text-base font-bold capitalize text-white"
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                Form.current.buttonId = target.name;
              }}
            >
              Reset Board
            </button>
            <button
              id="submit"
              name="submit"
              type="submit"
              className="w-full rounded-md  bg-blue-600 py-2  px-4 text-base font-bold capitalize text-white"
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                Form.current.buttonId = target.name;
              }}
            >
              Run Algorithm
            </button>
          </div>
          <section className="flex w-full flex-col justify-center md:w-7/12">
            <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Board
            </h2>
            <BoardComponent
              boardSize={boardSize}
              nodes={graphInstance.nodes}
              edges={graphInstance.edges}
              handleGetSource={setSourceNode}
              handleGetTarget={setTargetNode}
            />
          </section>
        </form>
      </main>
    </>
  );
};

export default DijkstraPage;
