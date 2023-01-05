interface WildArgs {
  [key: string]: any;
};

export class Node<T extends WildArgs> {
  //
  // Nodes are the fundamental building blocks of many computer science data structures.
  // They form the basis for linked lists, stacks, queues, trees, and more.
  // An individual node contains data and links to other nodes.
  // Each data structure adds additional constraints or behavior to these features
  // to create the desired structure.
  //
  value: T;
  previousNode: Node<T> | null = null;
  nextNode: Node<T> | null = null;

  constructor(value: T, previousNode = null, nextNode = null) {
    this.value = value;
    this.previousNode = previousNode;
    this.nextNode = nextNode;
  };

  setPreviousNode(previousNode: Node<T>): void {
    this.previousNode = previousNode;
  };

  setNextNode(nextNode: Node<T>): void {
    this.nextNode = nextNode;
  };

  setNodeValue(value: T): void {
    this.value = value;
  }

  getPreviousNode(): Node<T> | null {
    return this.previousNode;
  };

  getNextNode(): Node<T> | null {
    return this.nextNode;
  };

  getValue(): T {
    return this.value;
  };

  showPreview(): { data: T, previousNode: Node<T> | null, nextNode: Node<T> | null } {
    let nodeInformation = {
      data: this.value,
      previousNode: this.previousNode,
      nextNode: this.nextNode
    };

    return nodeInformation;
  }
}
