'use client';

import { useState, ChangeEvent, FormEventHandler } from 'react';
import { NextPage } from 'next';
import { Node as NodeClass } from "@lib/ds/node";
import { NodeComponent } from '@ui/Node';

interface NodeValueType {
  name: string;
  previousNode?: any;
  nextNode?: any;
};

const NodePage: NextPage = () => {
  const [nodeInstance, setNodeInstance] = useState<NodeClass<NodeValueType> | null>(null);
  const [nodeValue, setNodeValue] = useState<NodeValueType>({ name: '' });


  const handleSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    if (nodeInstance == null) {
      setNodeInstance(new NodeClass(nodeValue));
    }
    const nextNode = new NodeClass(nodeValue);
    nodeInstance?.setNextNode(nextNode);
  };

  const onNewNodeInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNodeValue({
      name: target.value
    });
  };


  return (
    <section className="w-full p-2 container mx-auto space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Node</h1>
        <p className="">A Node is a data structure that stores a value that can be of any data type and has a pointer to another node.</p>
      </header>
      <main className="">
        <form onSubmit={handleSubmit} className="flex-col flex space-y-4">
          <label className="space-x-4"><span className="font-bold">Enter data:</span><input type="text" value={nodeValue.name} onChange={onNewNodeInputChange} placeholder="Enter name" className="border border-gray-100 bg-gray-50 p-2 rounded-md" /></label>
          <button
            value="submit"
            className="capitalize border-2 border-blue-600 bg-blue-500 text-white font-bold rounded-md p-2 w-96">Add new node</button>
        </form>
        <p className="text-lg">some text</p>
        <div>
          {nodeInstance
            ? (
              <NodeComponent
                payload={nodeInstance.showPreview()}
              />)
            : (<span>Add a new node</span>)
          }
        </div>
      </main>
    </section>
  );
};

export default NodePage;
