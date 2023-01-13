import type { FC, ReactNode } from "react";
import type { LinkedList } from "@lib/ds/linkedlist";
import type { Node as NodeClass } from "@lib/ds/node";

type LinkedListType<T> = {
  linkedList: LinkedList<T>;
};

const LinkedListComponent: FC<LinkedListType<string>> = ({ linkedList }) => {
  const { headNode, tailNode, length } = linkedList;

  const renderList = (list: LinkedList<string>) => {
    let node = list.headNode;
    const items: ReactNode[] = [];
    while (node) {
      items.push(
        <LinkedListItem
          key={node.value}
          node={node}
          headNode={headNode}
          tailNode={tailNode}
        />
      );
      node = node.nextNode;
    }
    return <>{items}</>;
  };

  return (
    <div className="flex flex-row flex-wrap items-center space-x-4">
      {renderList(linkedList)}
    </div>
  );
};

const LinkedListItem: FC<{
  node: NodeClass<string>;
  headNode: NodeClass<string> | null;
  tailNode: NodeClass<string> | null;
}> = ({ node, headNode, tailNode }) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-fit flex-row">
        <span className="text-base font-bold text-gray-600 dark:text-white">
          {node?.value === headNode?.value
            ? "Head"
            : node.value === tailNode?.value
            ? "Tail"
            : "->"}
        </span>
      </div>
      <div className="flex w-fit flex-row border-2 border-gray-700 ">
        <div className="flex flex-col items-center space-y-2 p-2">
          <span className="text-sm text-gray-500 dark:text-white">
            {node?.value || "Null"}
          </span>
        </div>
        <div className="flex flex-col space-y-2 bg-gray-500 p-2 dark:bg-gray-200">
          <span className="text-sm text-gray-200 dark:text-gray-800">
            {node?.nextNode?.value || "Null"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LinkedListComponent;
