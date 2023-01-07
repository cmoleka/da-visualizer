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

const LinkedListPage: FC = () => {

  return (
    <>
      <header className="space-y-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Linked List</h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          A linked list is a linear data structure in which each element is a separate object, linked together using pointers. Each element (node) in a linked list contains a value and a reference to the next element in the list. The last element in the list has a reference to null, indicating the end of the list. Linked lists are often used to implement stacks, queues, and other data structures that require constant insertion and deletion of elements. One advantage of linked lists over arrays is that elements can be inserted or removed from the list without the need for reallocation of memory, which can be time-consuming. However, linked lists require more memory overhead than arrays, as each element requires an additional reference to the next element in the list.
        </p>
      </header>
      <main className="flex flex-row justify-between gap-4 space-x-6 divide-x-2">
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          In-progress
        </p>
      </main>
    </>
  );
};

export default LinkedListPage;
