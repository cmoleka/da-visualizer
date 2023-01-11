"use client";

import type { FC, ChangeEvent } from 'react';
// import { Node as NodeClass } from "@lib/ds/node";
import { Queue } from "@lib/ds/queue";
import { useState } from 'react';
import classNames from 'classnames';

const QueuePage: FC = () => {
  const [queueInstance, setQueueInstance] = useState<Queue | null>(null);
  const [value, setValue] = useState<number>(0);
  const [maxSize, setMaxSize] = useState<string>('');
  const [allowNewQueue, setAllowNewQueue] = useState<boolean>(true);
  const _queueInstance: Queue = new Queue(parseInt(maxSize));

  const VISITORS = ['Safi', 'Carlo', 'John', 'Eric'] as const;
  const handleCreateQueue = (): void => {
    if (!maxSize) throw Error;
    setQueueInstance(new Queue(parseInt(maxSize)));
    setAllowNewQueue(false);
  };

  const handleChangeMaxSize = ({ target }: ChangeEvent<HTMLSelectElement>): void => {
    setMaxSize(target.value);
    if (!maxSize) throw Error("MaxSize is empty");
    if (!queueInstance) throw Error("The Queue is null");
    _queueInstance.maxSize = parseInt(maxSize);
    setQueueInstance((prevState) => {
      if (!prevState?.maxSize) throw Error("Maxsize is null");
      return Object.assign({}, prevState, { maxSize: _queueInstance.maxSize });
    });
    console.log(_queueInstance.maxSize)
  };

  const handleValueChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setValue(parseInt(target.value));
  };

  const handleOnEnqueue = (): void => {
    queueInstance?.enqueue(VISITORS[value] as string);
    setValue(value + 1);
  }

  const createQueueButtonClass = classNames({
    'bg-gray-50 text-gray-900': !allowNewQueue,
    'bg-blue-600 text-white': allowNewQueue
  });

  return (
    <>
      <header className="space-y-4">
        <h1 className="mb-4  text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Queue
        </h1>
        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
          A queue is an abstract data type that holds an ordered, linear
          sequence of items. You can describe it as a first in, first out (FIFO) structure.
          The first element to be added to the queue will be the first element to be removed
          from the queue.
        </p>
      </header>
      <main className="flex w-full flex-col justify-between gap-4 space-y-6 divide-y-2">
        <div className="flex flex-col space-y-4">
          <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
            Mutations
          </h2>
          <div className='flex flex-col md:flex-row w-full space-y-4 md:space-y-0'>
            <label htmlFor="maxsize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
            <select name="maxSize" id="countries" defaultValue="Choose Here" onChange={(e) => handleChangeMaxSize(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
            <button
              value="submit"
              className={`${createQueueButtonClass}  text-base w-full  rounded-md py-2 px-4 font-bold capitalize`}
              onClick={() => handleCreateQueue()}
            >
              {allowNewQueue ? "Create new Queue" : "Queue created"}
            </button>
          </div>
          <input
            type="text"
            onChange={handleValueChange}
            placeholder="Enter data"
            className="block w-full rounded-lg border border-gray-300 bg-blue-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
          <div className="flex flex-row flex-wrap justify-center space-y-2 space-x-4 divide-x-2">
          </div>
        </div>
      </main>
    </>
  )
}

export default QueuePage;
