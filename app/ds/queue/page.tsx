"use client";

import type { FC, ChangeEvent } from "react";
// import { Node as NodeClass } from "@lib/ds/node";
import { Queue } from "@lib/ds/queue";
import { useRef, useState } from "react";

interface QueueData {
  name: string;
}

const QueuePage: FC = () => {
  const queueForm = useRef<HTMLFormElement>(null);
  const [queueInstance, setQueueInstance] = useState<Queue<QueueData>>(
    new Queue(0)
  );
  const [selectedVisitor, setSelectedVisitor] = useState<{ name: string }>({
    name: "",
  });
  const [returnedSelectedVisitor, setReturnedSelectedVisitor] = useState<{
    name: string;
  }>({
    name: "",
  });

  const VISITORS = ["Safi", "Carlo", "John", "Eric"] as const;
  const MAX_SIZE = [5, 10, 15, 20] as const;

  const handleChangeMaxSize = ({
    target,
  }: ChangeEvent<HTMLSelectElement>): void => {
    const maxSize = target.value;
    if (!maxSize) throw Error("MaxSize is empty");
    if (!queueInstance) throw Error("The Queue is null");
    const _queueInstance = queueInstance;
    _queueInstance.setMaxSize.bind(_queueInstance, parseInt(maxSize));
    setQueueInstance((prevState) => Object.assign(prevState, _queueInstance));
  };

  const handleOnValueChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;
    if (!name) throw Error("Name is empty");
    if (!value) throw Error("Value is empty");
    setSelectedVisitor({ name: value });
  };

  const handleOnEnqueue = () => {
    if (!queueInstance) throw Error("The Queue is null");
    queueInstance.enqueue.bind(queueInstance, selectedVisitor);
  };

  const handleOnDequeue = (): void => {
    if (!queueInstance) throw Error("The Queue is null");
    const dequeuedVisitor = queueInstance?.dequeue.bind(queueInstance);
    console.log(dequeuedVisitor);
    if (!dequeuedVisitor) throw Error("Dequeued visitor is null");
    setReturnedSelectedVisitor(dequeuedVisitor);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    if (target.buttonId == "enqueue") handleOnEnqueue();
    if (target.buttonId == "dequeue") handleOnDequeue();
  };

  return (
    <>
      <header className="space-y-4">
        <h1 className="mb-4  text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Queue
        </h1>
        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
          A queue is an abstract data type that holds an ordered, linear
          sequence of items. You can describe it as a first in, first out (FIFO)
          structure. The first element to be added to the queue will be the
          first element to be removed from the queue.
        </p>
      </header>
      <main className="flex w-full flex-col justify-between gap-4 space-y-6 divide-y-2">
        <div className="flex flex-col space-y-4">
          <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
            Mutations
          </h2>
          <div className="flex w-full flex-col space-y-4 md:flex-row md:space-y-0">
            <label
              htmlFor="maxsize"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select your country
            </label>
            <select
              name="maxSize"
              id="countries"
              defaultValue="Choose Here"
              onChange={(e) => handleChangeMaxSize(e)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              {MAX_SIZE.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col space-y-4"
            ref={queueForm}
          >
            {VISITORS.map((visitor, index) => (
              <div className="flex flex-row space-x-4" key={index}>
                <input
                  onChange={(e) => handleOnValueChange(e)}
                  type="radio"
                  name="visitor"
                  value={visitor}
                  id={visitor}
                />
                <label htmlFor={visitor}>{visitor}</label>
              </div>
            ))}
            <button
              id="enqueue"
              type="submit"
              name="enqueue"
              className="w-full rounded-md  bg-blue-600 py-2  px-4 text-base font-bold capitalize text-white"
              onClick={(e) => {
                if (!queueForm.current) throw Error("QueueForm is null");
                const target = e.target as HTMLButtonElement;
                queueForm.current.buttonId = target.name;
              }}
            >
              Add to Queue
            </button>
            <button
              id="dequeue"
              type="submit"
              name="dequeue"
              className="w-full rounded-md  bg-red-600 py-2  px-4 text-base font-bold capitalize text-white"
              onClick={(e) => {
                if (!queueForm.current) throw Error("QueueForm is null");
                const target = e.target as HTMLButtonElement;
                queueForm.current.buttonId = target.name;
              }}
            >
              Remove from Queue
            </button>
          </form>
          <div className="flex flex-row flex-wrap justify-center space-y-2 space-x-4 divide-x-2">
            {queueInstance?.getQueue().map((visitor, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {visitor.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default QueuePage;
