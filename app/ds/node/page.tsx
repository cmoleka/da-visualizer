"use client";

import type { ChangeEvent, FormEventHandler } from "react";
import { useState } from "react";
// import type { NextPage } from "next";
import type { FC } from "react";
import { Node as NodeClass } from "@lib/ds/node";
import { NodeComponent } from "@ui/Node";

interface ValueData {
  [key: string]: string;
}

interface NodeValueType<T extends ValueData> {
  value: T;
  previousNode?: NodeClass<T> | null;
  nextNode?: NodeClass<T> | null;
}

const NodePage: FC = () => {
  const [nodeInstances, setNodeInstances] = useState<
    NodeClass<NodeValueType<ValueData>>[]
  >([]);
  const [nodeInstance, setNodeInstance] = useState<
    NodeClass<NodeValueType<ValueData>>
  >(
    new NodeClass({
      value: {
        name: "",
      },
    })
  );
  const [nodeIndex, setNodeIndex] = useState<number | null>(0);
  const [allowNewNode, setAllowNewNode] = useState<string>("parent");

  const handleAddParentNode: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setNodeInstances((prev) => [...prev, nodeInstance]);
      setNodeInstance(
        new NodeClass({
          value: {
            name: "",
          },
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddChildNode: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    const updatedNodeInstance = [...nodeInstances];
    const parentNode = updatedNodeInstance[nodeIndex as number];
    parentNode?.setNextNode(nodeInstance);
    const newChildNode = parentNode?.getNextNode();
    newChildNode?.setPreviousNode(
      parentNode as NodeClass<NodeValueType<ValueData>>
    );
    setNodeInstances([
      ...nodeInstances,
      newChildNode as NodeClass<NodeValueType<ValueData>>,
    ]);
    setNodeInstance(
      new NodeClass({
        value: {
          name: "",
        },
      })
    );
  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    if (allowNewNode === "parent") {
      handleAddParentNode(e);
    } else {
      handleAddChildNode(e);
    }
  };

  const onNewNodeInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNodeInstance(
      (prev) =>
        new NodeClass({
          ...prev.value,
          value: {
            name: target.value,
          },
        })
    );
  };

  const handleSelectedNode = (index: number) => {
    setNodeIndex(index);
  };

  return (
    <section className="w-full space-y-4 p-2">
      <header className="space-y-4">
        <h1 className="text-6xl font-bold">Node</h1>
        <p className="text-lg">
          A node is a basic unit of data storage in a computer system. It is
          often used as a building block for more complex data structures such
          as linked lists, trees, and graphs.
        </p>
      </header>
      <main className="flex flex-row justify-between gap-4 space-x-6 divide-x-2">
        <form
          onSubmit={handleOnSubmit}
          className="flex w-2/5 flex-col space-y-4"
        >
          <h2 className="text-3xl font-bold">Form</h2>
          <label className="space-x-4">
            <span className="font-bold">Enter data:</span>
            <input
              type="text"
              value={nodeInstance.value.value.name}
              onChange={onNewNodeInputChange}
              placeholder="Enter name"
              className="rounded-md border border-gray-100 bg-gray-50 p-2"
            />
          </label>
          <button
            value="submit"
            className={`w-96 rounded-md border-2 bg-red-500 p-2 font-bold capitalize text-white`}
            onClick={() => setAllowNewNode("parent")}
            // disabled={!allowNewNode}
          >
            Add new Parent node
          </button>
          {nodeInstances.length > 0 && (
            <button
              value="submit"
              className={`w-96 rounded-md border-2 bg-blue-500 p-2 font-bold capitalize text-white`}
              onClick={() => setAllowNewNode("child")}
            >
              Add new Child node
            </button>
          )}
          <h3 className="text-xl font-bold">How does it work?</h3>
          <p className="text-base">
            A node typically consists of two main parts:
          </p>
          <ol className="list-decimal space-y-4 pl-4">
            <li>
              Data: This is the information stored within the node. The data can
              be of any type, such as a number, string, or object.
            </li>
            <li>
              Pointers: These are references to other nodes in the data
              structure. A node may have one or more pointers, depending on the
              type of data structure it is being used in. For example, a node in
              a linked list may have a single pointer to the next node in the
              list, while a node in a tree may have multiple pointers to its
              children.
            </li>
          </ol>
          <p>
            Nodes are typically connected to each other in some way, forming a
            chain or a tree-like structure. This allows data to be stored and
            accessed in a logical and organized manner, enabling efficient
            searching and retrieval of information.{" "}
          </p>

          <p>
            There are many different types of nodes and data structures that
            make use of nodes, each with its own specific characteristics and
            uses. Some common examples include singly linked lists, doubly
            linked lists, binary trees, and graphs.
          </p>
          <ul>
            <h3 className="text-xl font-bold">Implementation (Github repo)</h3>
            <li className="font-bold text-blue-500">
              <a
                href="https://github.com/cmoleka/da-visualizer/blob/dev/lib/ds/node.ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                (TypeScript) Node - Implementation
              </a>
            </li>
            <li className="font-bold text-blue-500">
              <a
                href="https://github.com/cmoleka/datastructures-algorithms/blob/master/datastructures/Nodes.py"
                target="_blank"
                rel="noopener noreferrer"
              >
                (Python) Node - Implementation
              </a>
            </li>
          </ul>
        </form>
        <section className="w-full space-y-4 px-4">
          <h2 className="inline-flex text-3xl font-bold">Visual</h2>
          <div className="">
            {nodeInstances.length > 0 ? (
              <>
                {nodeInstances.map((parendNode, parentIndex) => {
                  if (parendNode.previousNode === null) {
                    return (
                      <div key={parentIndex}>
                        <p className="tree">Head</p>
                        <ul className="tree">
                          <li onClick={() => handleSelectedNode(parentIndex)}>
                            <NodeComponent
                              data={parendNode}
                              key={parentIndex}
                            />
                          </li>
                          <ul>
                            {nodeInstances.map((childNode, childIndex) => {
                              if (
                                childNode.previousNode !== null &&
                                childNode.previousNode.value.value.name ===
                                  parendNode.value.value.name
                              ) {
                                return (
                                  <li
                                    key={childIndex}
                                    onClick={() =>
                                      handleSelectedNode(childIndex)
                                    }
                                  >
                                    <NodeComponent
                                      key={childIndex}
                                      data={childNode}
                                    />
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </ul>
                      </div>
                    );
                  }
                })}
              </>
            ) : (
              <span>Add a new node</span>
            )}
          </div>
        </section>
      </main>
    </section>
  );
};

export default NodePage;
