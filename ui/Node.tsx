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
      className={`inline-flex h-40 w-40 cursor-pointer  flex-col  items-center justify-center rounded-full border-2 border-gray-400 p-4 hover:bg-gray-50 ${nodeClass}`}
      onClick={() => {
        handleSelected();
      }}
    >
      <header className="mx-auto">
        <span className="text-2xl font-bold uppercase">{value.value.name}</span>
      </header>
      <main className="mx-auto flex flex-row items-center justify-between space-x-4">
        <span className="text-center text-base">
          <strong>Parent</strong>: {previousNode?.value.value.name || "None"}
        </span>
        <span className="text-center text-base">
          <strong>Child:</strong> {nextNode?.value.value.name || "None"}
        </span>
      </main>
    </div>
  );
};
