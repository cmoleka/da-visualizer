"use client";

import type { ChangeEvent, FormEventHandler } from "react";
import { useState } from "react";
// import type { NextPage } from "next";
import type { FC } from "react";
import { LinkedList } from "@lib/ds/linkedlist";
import { Node as NodeClass } from "@lib/ds/node";
import { NodeComponent } from "@ui/Node";
import classNames from 'classnames';


const LinkedListPage: FC = () => {

  const [linkedList, setLinkedList] = useState<LinkedList<string> | null>(null);
  const [nodeInstance, setNodeInstance] = useState<string>('');
  const [allowNewList, setAllowNewList] = useState<boolean>(true);
  const [headNode, setHeadNode] = useState<NodeClass<string> | null>(null);
  const [tailNode, setTailNode] = useState<NodeClass<string> | null>(null);

  const onNewNodeInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNodeInstance(
      target.value
    );
  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    if (!allowNewList) return;
    if (linkedList === null) {
      setLinkedList(new LinkedList());
      setAllowNewList(false);
    }
  };

  const handleInsertAtBeginning = (): void => {
    linkedList?.insertAtBeginning(nodeInstance);
    setLinkedList(linkedList);
    setNodeInstance('');
  }
  const handleInsertAtEnd = (): void => {
    linkedList?.insertAtEnd(nodeInstance);
    setLinkedList(linkedList);
    setNodeInstance('');
  }
  const handleRemoveAtBeginning = (): void => {
    linkedList?.removeNodeAtBeginning();
    setLinkedList(linkedList);
  }
  const handleRemoveAtEnd = (): void => {
    linkedList?.removeNodeAtEnd();
    setLinkedList(linkedList);
  }
  const handleRemoveWithValue = (): void => {
    linkedList?.removeNodeWithValue(nodeInstance);
    setLinkedList(linkedList);
    setNodeInstance('');
  }

  const handleGetHead = (): void => {
    if (!linkedList) return;
    const currentHead = linkedList?.getHeadNode();
    setHeadNode(currentHead);
  }
  const handleGetTail = (): void => {
    if (!linkedList) return;
    const currentTail = linkedList?.getTailNode();
    setTailNode(currentTail);
  }

  const newLinkedListButtonClass = classNames({
    'bg-gray-100 text-gray-600 cursor-not-allowed': !allowNewList,
    'bg-blue-500 text-white cursor-pointer': allowNewList
  })

  return (
    <>
      <header className="space-y-4">
        <h1 className="mb-4  text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Linked List</h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          A linked list is a linear data structure in which each element is a separate object, linked together using pointers. Each element (node) in a linked list contains a value and a reference to the next element in the list. The last element in the list has a reference to null, indicating the end of the list. Linked lists are often used to implement stacks, queues, and other data structures that require constant insertion and deletion of elements. One advantage of linked lists over arrays is that elements can be inserted or removed from the list without the need for reallocation of memory, which can be time-consuming. However, linked lists require more memory overhead than arrays, as each element requires an additional reference to the next element in the list.
        </p>
      </header>
      <main className="flex w-full flex-col justify-between gap-4 space-y-6 divide-y-2">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col space-y-4"
        >
          <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">Mutations</h2>
          <input
            type="text"
            value={nodeInstance}
            onChange={onNewNodeInputChange}
            placeholder="Enter name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="flex flex-row flex-wrap justify-between space-y-2 divide-x-2 space-x-4">
            <button
              value="submit"
              className={`${newLinkedListButtonClass} rounded-md border-2 py-2 px-4 font-bold capitalize`}
              disabled={!allowNewList}
            >
              {
                allowNewList ? 'Create Linked List' : 'Linked List created'
              }
            </button>
            <button
              value={nodeInstance}
              className={`rounded-md bg-green-500 text-white border-2 py-2 px-4 font-bold capitalize`}
              onClick={() => handleInsertAtBeginning()}
            >
              Insert at Beginning
            </button>
            <button
              value={nodeInstance}
              className={`rounded-md bg-orange-500 text-white border-2 py-2 px-4 font-bold capitalize`}
              onClick={() => handleInsertAtEnd()}
            >
              Insert at End
            </button>
            <button
              className={`rounded-md bg-red-500 text-white border-2 py-2 px-4 font-bold capitalize`}
              onClick={() => handleRemoveAtBeginning()}
            >
              Remove at Beginning
            </button>
            <button
              className={`rounded-md bg-red-700 text-white border-2 py-2 px-4 font-bold capitalize`}
              onClick={() => handleRemoveAtEnd()}
            >
              Remove at End
            </button>
            <button
              className={`rounded-md bg-red-900 text-white border-2 py-2 px-4 font-bold capitalize`}
              onClick={() => handleRemoveWithValue()}
            >
              {`Remove Node with value (${nodeInstance})`}
            </button>
          </div>
          <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">Actions</h2>
          <div className="flex flex-row flex-wrap justify-between space-y-2 divide-x-2 space-x-4">
            <button
              className={`rounded-md bg-green-500 text-white border-2 py-2 px-4 font-bold capitalize`}
              onClick={() => handleGetHead()}
            >
              Get Head
            </button>
            <button
              className={`rounded-md bg-green-700 text-white border-2 py-2 px-4 font-bold capitalize`}
              onClick={() => handleGetTail()}
            >
              Get Tail
            </button>
          </div>
        </form>
        <section className="w-full space-y-4 py-6">
          <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Visual</h2>
        </section>
      </main>
    </>
  );
};

export default LinkedListPage;
