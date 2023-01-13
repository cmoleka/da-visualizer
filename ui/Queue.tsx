import type { FC } from "react";

type NodeProps = {
  name: string;
  value?: string;
};

interface QueueProps {
  queue: Array<NodeProps>;
  dequeuedNode: NodeProps | null;
}

const QueueComponent = ({ queue, dequeuedNode }: QueueProps) => {
  return (
    <>
      <div className="flex flex-col flex-wrap items-center space-y-4 border-4 border-gray-900 bg-gray-500 p-4 dark:border-white dark:bg-white">
        {queue.length > 0 ? (
          queue.map((node, index) => (
            <QueueItem key={index} name={node.name} index={index + 1} />
          ))
        ) : (
          <p className="font-semibold text-white dark:text-gray-400">
            The Queue is empty.
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
          Returned Node
        </h3>
        {dequeuedNode ? (
          <QueueItem name={dequeuedNode.name} />
        ) : (
          <span className="text-gray-900 dark:text-white">Empty</span>
        )}
      </div>
    </>
  );
};

interface QueueItemProps {
  name: string;
  value?: string;
  index?: number;
}

const QueueItem: FC<QueueItemProps> = ({ name, index }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row border-4 border-gray-700 bg-white dark:bg-gray-500 ">
        {index && (
          <div className="flex w-1/3 flex-col space-y-2 border-2 border-gray-900 bg-gray-700 p-2 dark:border-white dark:bg-white">
            <span className="text-center  text-base text-white dark:text-gray-500">
              {index}
            </span>
          </div>
        )}
        <div className="flex w-full flex-col space-y-2 p-2">
          <span className="text-center  text-base text-gray-500 dark:text-white">
            {name || "Null"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueueComponent;
