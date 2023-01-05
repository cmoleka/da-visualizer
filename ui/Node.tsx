import { FC } from 'react';

export const NodeComponent: FC<{ payload: any }> = ({ payload }) => {
  const { data, previousNode, nextNode } = payload;
  return (
    <div className="flex flex-col rounded-lg border-2 border-gray-400 p-2 w-96 h-96">
      <header><span className="font-bold text-lg">{data.name}</span></header>
      <main className="flex flex-row items-center justify-between">
        <span className="text-base">{previousNode ? previousNode.showPreview().data.name : 'None'}</span>
        <span className="text-base">{nextNode ? nextNode.showPreview().data.name : 'None'}</span>
      </main>
    </div>
  );
};
