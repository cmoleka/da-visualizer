import type { FC } from "react";
import type { Node as NodeClass } from "@lib/ds/node";

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
  return (
    <div className="inline-flex h-40 w-40  flex-col  items-center justify-center rounded-full border-2 border-gray-400 p-4">
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
