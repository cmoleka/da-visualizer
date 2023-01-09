"use client";

import type { ChangeEvent, FormEventHandler } from "react";
import { useState } from "react";
// import type { NextPage } from "next";
import type { FC } from "react";
import { LinkedList } from "@lib/ds/linkedlist";
import type { Node as NodeClass } from "@lib/ds/node";
import LinkedListVisualizer from "@ui/LinkedList";
import classNames from "classnames";

const LinkedListPage: FC = () => {
  const [linkedList, setLinkedList] = useState<LinkedList<string> | null>(null);
  const [nodeInstance, setNodeInstance] = useState<string>("");
  const [allowNewList, setAllowNewList] = useState<boolean>(true);
  const [headNode, setHeadNode] = useState<NodeClass<string> | null>(null);
  const [tailNode, setTailNode] = useState<NodeClass<string> | null>(null);
  const [retrievedNode, setRetrievedNode] = useState<NodeClass<string> | null>(
    null
  );
  const [retrievedIndex, setRetrievedIndex] = useState<number | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean | null>(null);
  const [stringifiedList, setStringifiedList] = useState<string | null>(null);

  const onNewNodeInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNodeInstance(target.value);
  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    if (!allowNewList) return;
    if (linkedList === null) {
      setLinkedList(new LinkedList());
      setAllowNewList(false);
      console.log("its null");
      return;
    }
    if (linkedList.headNode !== null) setLinkedList(linkedList);
    console.log("its not null");
  };

  const handleInsertAtBeginning = (): void => {
    linkedList?.insertAtBeginning(nodeInstance);
    setLinkedList(linkedList);
    setNodeInstance("");
  };
  const handleInsertAtEnd = (): void => {
    linkedList?.insertAtEnd(nodeInstance);
    setLinkedList(linkedList);
    setNodeInstance("");
  };
  const handleRemoveAtBeginning = (): void => {
    linkedList?.removeNodeAtBeginning();
    setLinkedList(linkedList);
  };
  const handleRemoveAtEnd = (): void => {
    linkedList?.removeNodeAtEnd();
    setLinkedList(linkedList);
  };
  const handleRemoveWithValue = (): void => {
    linkedList?.removeNodeWithValue(nodeInstance);
    setNodeInstance("");
    setLinkedList(linkedList);
  };

  const handleGetHead = (): void => {
    if (!linkedList) return;
    const currentHead = linkedList?.getHeadNode();
    setHeadNode(currentHead);
  };
  const handleGetTail = (): void => {
    if (!linkedList) return;
    const currentTail = linkedList?.getTailNode();
    setTailNode(currentTail);
  };
  const handleGetAt = (inputString: string): void => {
    const index = parseInt(inputString);
    const nodeAtIndex = linkedList?.getAt(index);
    if (!nodeAtIndex) return;
    setRetrievedNode(nodeAtIndex);
  };

  const handleGetIndexOf = (value: string): void => {
    const indexOfNode = linkedList?.indexOf(value);
    if (!indexOfNode) return;
    setRetrievedIndex(indexOfNode);
  };

  const handleIsEmpty = (): void => {
    if (!linkedList) return;
    const isEmpty = linkedList.isEmpty();
    setIsEmpty(isEmpty);
  };

  const handleStringifyList = (): void => {
    if (!linkedList) return;
    const stringifiedList = linkedList.stringifyList();
    setStringifiedList(stringifiedList);
  };

  const newLinkedListButtonClass = classNames({
    "bg-gray-100 text-gray-600 cursor-not-allowed": !allowNewList,
    "bg-blue-500 text-white cursor-pointer": allowNewList,
  });

  return (
    <>
      <header className="space-y-4">
        <h1 className="mb-4  text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Linked List
        </h1>
        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
          A linked list is a linear data structure in which each element is a
          separate object, linked together using pointers. Each element (node)
          in a linked list contains a value and a reference to the next element
          in the list. The last element in the list has a reference to null,
          indicating the end of the list. Linked lists are often used to
          implement stacks, queues, and other data structures that require
          constant insertion and deletion of elements. One advantage of linked
          lists over arrays is that elements can be inserted or removed from the
          list without the need for reallocation of memory, which can be
          time-consuming. However, linked lists require more memory overhead
          than arrays, as each element requires an additional reference to the
          next element in the list.
        </p>
      </header>
      <main className="flex w-full flex-col justify-between gap-4 space-y-6 divide-y-2">
        <form onSubmit={handleOnSubmit} className="flex flex-col space-y-4">
          <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
            Mutations
          </h2>
          <input
            type="text"
            value={nodeInstance}
            onChange={onNewNodeInputChange}
            placeholder="Enter data"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
          <div className="flex flex-row flex-wrap justify-center space-y-2 space-x-4 divide-x-2">
            <button
              value="submit"
              className={`${newLinkedListButtonClass} ml-4 mt-2 rounded-md py-2 px-4 font-bold capitalize`}
              disabled={!allowNewList}
            >
              {allowNewList ? "Create Linked List" : "Linked List created"}
            </button>
            <button
              value={nodeInstance}
              className={`rounded-md bg-green-500 py-2  px-4 font-bold capitalize text-white`}
              onClick={() => handleInsertAtBeginning()}
            >
              Insert at Beginning
            </button>
            <button
              value={nodeInstance}
              className={`rounded-md bg-orange-500 py-2  px-4 font-bold capitalize text-white`}
              onClick={() => handleInsertAtEnd()}
            >
              Insert at End
            </button>
            <button
              className={`rounded-md bg-red-500 py-2  px-4 font-bold capitalize text-white`}
              onClick={() => handleRemoveAtBeginning()}
            >
              Remove at Beginning
            </button>
            <button
              className={`rounded-md bg-red-700 py-2  px-4 font-bold capitalize text-white`}
              onClick={() => handleRemoveAtEnd()}
            >
              Remove at End
            </button>
            <button
              className={`rounded-md bg-red-900 py-2  px-4 font-bold capitalize text-white`}
              onClick={() => handleRemoveWithValue()}
            >
              {`Remove Node with value (${nodeInstance})`}
            </button>
          </div>
          {/* <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
            Actions
          </h2>
          <div className="flex flex-row flex-wrap justify-center space-y-2 space-x-4 divide-x-2">
            <button
              className={`ml-4 mt-2 rounded-md bg-blue-600 py-2 px-4  text-sm font-bold capitalize text-white`}
              onClick={() => handleGetHead()}
            >
              Get Head
            </button>
            <button
              className={`rounded-md bg-blue-600 py-2 px-4  text-sm font-bold capitalize text-white`}
              onClick={() => handleGetTail()}
            >
              Get Tail
            </button>
            <button
              className={`rounded-md bg-blue-600 py-2 px-4  text-sm font-bold capitalize text-white`}
              onClick={() => handleGetAt(nodeInstance)}
            >
              {`Get Node at index (${nodeInstance})`}
            </button>
            <button
              className={`rounded-md bg-blue-600 py-2 px-4  text-sm font-bold capitalize text-white`}
              onClick={() => handleGetIndexOf(nodeInstance)}
            >
              {`Get index of (${nodeInstance})`}
            </button>
            <button
              className={`rounded-md bg-blue-600 py-2 px-4  text-sm font-bold capitalize text-white`}
              onClick={() => handleIsEmpty()}
            >
              Check if empty
            </button>
            <button
              className={`rounded-md bg-blue-600 py-2 px-4  text-sm font-bold capitalize text-white`}
              onClick={() => handleStringifyList()}
            >
              Stringify List
            </button>
          </div> */}
        </form>
        <section className="w-full space-y-4 py-6">
          <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Visual
          </h2>
          <div className="">
            {linkedList ? (
              <LinkedListVisualizer linkedList={linkedList} />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                  Linked List Visualizer
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Create a Linked List to visualize it here
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default LinkedListPage;
