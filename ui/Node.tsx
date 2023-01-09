import type { FC } from "react";
import { useState } from "react";
import type { Node as NodeClass } from "@lib/ds/node";
import classNames from "classnames";

interface ValueData {
  [key: string]: any;
}
interface nodeInformation<T extends ValueData> {
  data: {
    value: T;
    previousNode: NodeClass<T> | null;
    nextNode: NodeClass<T> | null;
  };
}

export const NodeComponent: FC<nodeInformation<ValueData>> = ({ data }) => {
  const { value, previousNode, nextNode } = data;
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleSelected = () => {
    setIsSelected((prev: boolean) => !prev);
  };

  const nodeClass = classNames({
    "bg-white": !isSelected,
    "bg-gray-200": isSelected,
  });

  return (
    <div
      id={value.value.name}
      className={` inline-flex h-40 w-40  max-w-sm  cursor-pointer flex-col items-center justify-center rounded-full  border-2 border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 ${nodeClass}`}
      onClick={() => {
        handleSelected();
      }}
    >
      <header className="mx-auto">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {value.value.name}
        </h5>
      </header>
      <main className=" flex flex-row items-center justify-between space-x-4">
        <span className="mb-2 text-center text-base font-bold tracking-tight text-gray-900 dark:text-white">
          <strong>Parent</strong>: {previousNode?.value.value.name || "None"}
        </span>
        <span className="mb-2 text-center text-base font-bold tracking-tight text-gray-900 dark:text-white">
          <strong>Child:</strong> {nextNode?.value.value.name || "None"}
        </span>
      </main>
    </div>
  );
};
