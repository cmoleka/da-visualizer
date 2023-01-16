"use client";

import type { ChangeEvent, FC, FormEvent, MutableRefObject } from "react";
import { useRef, useState } from "react";
import { Dijkstra } from "@lib/algo/dijkstra";
import { Graph } from "@lib/ds/graph";
import { Queue } from "@lib/ds/queue";
import { BoardComponent } from "@ui/Board";

type FormType = {
  maxSize: number;
  sourceNode: number;
  targetNode: number;
};

const DijkstraPage: FC = () => {
  const Form = useRef<HTMLFormElement>(null) as MutableRefObject<
    HTMLFormElement & FormType
  >;
  const MAX_SIZE = [50, 100, 200] as const;
  const [boardSize, setBoardSize] = useState<50 | 100 | 200 | 0>(0);
  const [graphInstance] = useState<Graph>(new Graph());

  const [queueInstance] = useState<Queue<number>>(
    new Queue({
      maxSize: boardSize,
    })
  );

  const [isDone, setIsDone] = useState<boolean>(false);

  const [result, setResult] = useState<number[]>([]);

  const handleOnMaxSizeChange = (): void => {
    const maxSize = Form.current.maxSize as 50 | 100 | 200;
    if (!maxSize) return;
    setBoardSize(maxSize);
    queueInstance.setMaxSize(maxSize);
    for (let i = 1; i <= maxSize; i++) {
      graphInstance.addVertex(i);
    }
    for (const vertex of graphInstance.nodes.keys()) {
      if (vertex < maxSize) {
        graphInstance.addEdge(vertex, vertex + 1);
        graphInstance.setEdgeValue(vertex, vertex + 1, vertex);
      }
    }
  };

  const handleAlgorithmRun = () => {
    if (!isDone) {
      const algoResult = Dijkstra(graphInstance, queueInstance, 1, 46);
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
    handleAlgorithmRun();
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
              id="submit"
              name="submit"
              type="submit"
              className="w-full rounded-md  bg-blue-600 py-2  px-4 text-base font-bold capitalize text-white"
            >
              Run Algo
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
            />
          </section>
        </form>
      </main>
    </>
  );
};

export default DijkstraPage;
