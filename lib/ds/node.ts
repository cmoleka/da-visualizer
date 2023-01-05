export class Node<T> {
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
  }

  setPreviousNode(previousNode: Node<T>) {
    this.previousNode = previousNode;
  }

  setNextNode(nextNode: Node<T>) {
    this.nextNode = nextNode;
  }

  setNodeValue(value: T) {
    this.value = value;
  }

  getPreviousNode(): Node<T> | null {
    return this.previousNode;
  }

  getNextNode(): Node<T> | null {
    return this.nextNode;
  }

  getValue(): T {
    return this.value;
  }

  public showPreview(): {
    value: T;
    previousNode: Node<T> | null;
    nextNode: Node<T> | null;
  } {
    const nodeInformation = {
      value: this.value,
      previousNode: this.previousNode,
      nextNode: this.nextNode,
    };

    return nodeInformation;
  }
}
