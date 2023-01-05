"use client";

import type { ChangeEvent, FormEventHandler } from "react";
import { useState } from "react";
import type { NextPage } from "next";
import { Node as NodeClass } from "@lib/ds/node";
import { NodeComponent } from "@ui/Node";

interface ValueData {
  [key: string]: any;
}
interface NodeValueType<T extends ValueData> {
  // value: { [key: string]: string };
  // previousNode?: NodeClass<typeof NodeClass>;
  // nextNode?: NodeClass<typeof NodeClass>;
  value: T;
  previousNode?: NodeClass<T> | null;
  nextNode?: NodeClass<T> | null;
}

const NodePage: NextPage = () => {
  const [nodeInstance, setNodeInstance] = useState<NodeClass<
    NodeValueType<ValueData>
  > | null>(null);
  const [nodeValue, setNodeValue] = useState<NodeValueType<ValueData>>({
    value: { name: "" },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();

    if (nodeInstance === null) {
      const newNode = createNode(nodeValue);
      setNodeInstance(newNode);
    } else {
      updateNode(nodeInstance, nodeValue);
    }
  };

  const onNewNodeInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNodeValue({
      value: {
        name: target.value,
      },
    });
  };

  const createNode = (nodeData: NodeValueType<ValueData>) => {
    return new NodeClass(nodeData);
  };

  const updateNode = (
    node: NodeClass<NodeValueType<any>>,
    newData: NodeValueType<ValueData>
  ) => {
    node.setNextNode(createNode(newData));
  };

  return (
    <section className="container mx-auto w-full space-y-4 p-2">
      <header>
        <h1 className="text-2xl font-bold">Node</h1>
        <p className="">
          A Node is a data structure that stores a value that can be of any data
          type and has a pointer to another node.
        </p>
      </header>
      <main className="">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="space-x-4">
            <span className="font-bold">Enter data:</span>
            <input
              type="text"
              value={nodeValue.value.name}
              onChange={onNewNodeInputChange}
              placeholder="Enter name"
              className="rounded-md border border-gray-100 bg-gray-50 p-2"
            />
          </label>
          <button
            value="submit"
            className="w-96 rounded-md border-2 border-blue-600 bg-blue-500 p-2 font-bold capitalize text-white"
          >
            Add new node
          </button>
        </form>
        <p className="text-lg">some text</p>
        <div>
          {nodeInstance ? (
            <NodeComponent data={nodeInstance} />
          ) : (
            <span>Add a new node</span>
          )}
        </div>
      </main>
    </section>
  );
};

export default NodePage;
