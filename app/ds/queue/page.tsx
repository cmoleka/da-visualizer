"use client";

import type { FC, ChangeEvent, FormEvent, MutableRefObject } from "react";
// import { Node as NodeClass } from "@lib/ds/node";
import { Queue } from "@lib/ds/queue";
import { useRef, useState } from "react";

interface QueueData {
  name: string;
  value?: string;
}

interface QueueForm {
  maxSize: number;
  buttonId: string;
  visitor?: QueueData;
}

const QueuePage: FC = () => {
  const queueForm = useRef<HTMLFormElement>(null) as MutableRefObject<
    HTMLFormElement & QueueForm
  >;

  const [queueInstance, setQueueInstance] = useState<Queue<QueueData>>(
    new Queue({ maxSize: 0 })
  );
  const [selectedVisitor, setSelectedVisitor] = useState<QueueData>({
    name: "",
  });
  const [returnedSelectedVisitor, setReturnedSelectedVisitor] =
    useState<QueueData>({
      name: "",
    });
  const [addedVisitors, setAddedVisitors] = useState<QueueData[]>([]);

  const VISITORS = ["Safi", "Carlo", "John", "Eric"] as const;
  const MAX_SIZE = [5, 10, 15, 20] as const;

  const getQueue = (): QueueData[] => {
    return queueInstance.getQueue();
  };

  const handleOnChangeMaxSize = ({
    target,
  }: ChangeEvent<HTMLSelectElement>): void => {
    const maxSize = target.value;
    if (!maxSize) throw Error("MaxSize is empty");
    if (!queueInstance) throw Error("The Queue is null");
    queueInstance.setMaxSize(parseInt(maxSize));
    // setQueueInstance((prevState) => {
    //   const updatedQueueInstance = new Queue({
    //     ...prevState,
    //     maxSize: parseInt(maxSize),
    //   }) as Queue<QueueData>;
    //   return updatedQueueInstance;
    // });
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
    if (!selectedVisitor) throw Error("Visitor is null");
    if (
      !addedVisitors.find((visitor) => visitor.name === selectedVisitor.name)
    ) {
      queueInstance.enqueue(selectedVisitor);
      setAddedVisitors([...addedVisitors, selectedVisitor]);
      setSelectedVisitor({ name: '' });
    }
  };

  const handleOnDequeue = (): void => {
    if (!queueInstance) return;
    const dequeuedVisitor = queueInstance?.dequeue();
    if (!dequeuedVisitor) return;
    addedVisitors.shift();
    setReturnedSelectedVisitor(dequeuedVisitor);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as QueueForm & HTMLFormElement;
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
        <div className="mx-auto w-full flex flex-col md:flex-row space-y-4 space-x-4 divide-x-2">
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col space-y-4 w-full md:w-1/2"
            ref={queueForm}
          >
            <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Form
            </h2>
            <div className="flex w-full flex-col space-y-4  md:space-y-0">
              <label
                htmlFor="maxsize"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Queue size
              </label>
              <select
                name="maxSize"
                id="countries"
                defaultValue="Choose Here"
                onChange={(e) => handleOnChangeMaxSize(e)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                {MAX_SIZE.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <label
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Predefined data
            </label>
            {VISITORS.map((visitor, index) => (
              <div className="flex flex-row space-x-4" key={index}>
                <input
                  onChange={(e) => handleOnValueChange(e)}
                  type="radio"
                  name="visitor"
                  value={visitor}
                  id={visitor}
                />
                <label
                  htmlFor={visitor}
                  className="text-gray-900 dark:text-white"
                >
                  {visitor}
                </label>
              </div>
            ))}
            <label
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Custom data (Name)
            </label>
            <div className="flex flex-row space-x-4">
              <input
                onChange={(e) => handleOnValueChange(e)}
                type="text"
                name="visitor"
                placeholder="Enter custom name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <button
              id="enqueue"
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
          <section className="pl-4 flex-col w-full md:w-1/2">
            <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Visual
            </h2>
            <div className="flex flex-row flex-wrap justify-center space-y-2 space-x-4 divide-x-2">
              {queueInstance.queue.length > 0 ? queueInstance.queue.map((visitor, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {visitor.name}
                  </span>
                </div>
              )) :
                (
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
                      Queue Visualizer
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a Max Size to initialize the queue.
                    </p>
                  </div>
                )
              }
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default QueuePage;
