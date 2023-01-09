import { Node } from "@lib/ds/node";

export class LinkedList<T> {
  //     A linked list is a linear data structure where elements are not stored at contiguous
  //     location. Instead the elements are linked using pointers.
  //     In a linked list data is stored in nodes and each node is linked to the next and,
  //     optionally, to the previous.
  //     Each node in a list consists of the following parts:
  //
  //     1) data
  //     2) A pointer (Or reference) to the next node
  //     3) Optionally, a pointer to the previous node

  headNode: Node<T> | null;
  tailNode: Node<T> | null;
  length: number;

  constructor() {
    this.headNode = null;
    this.tailNode = null;
    this.length = 0;
  }

  getHeadNode(): Node<T> | null {
    return this.headNode;
  }
  getTailNode(): Node<T> | null {
    return this.tailNode;
  }

  insertAtBeginning(newValue: T) {
    const newNode = new Node(newValue);
    newNode.nextNode = this.headNode;
    this.headNode = newNode;
    this.length++;
    if (!this.tailNode) this.tailNode = newNode;
  }

  insertAtEnd(newValue: T) {
    const newNode = new Node(newValue);
    if (!this.headNode) {
      this.headNode = newNode;
      this.tailNode = newNode;
    }
    if (this.tailNode) this.tailNode.nextNode = newNode;
    // this.tailNode.nextNode = newNode;
    this.tailNode = newNode;
    this.length++;
  }

  removeNodeAtBeginning() {
    if (!this.headNode) return;
    this.headNode = this.headNode.nextNode;
    this.length--;
    if (!this.headNode) this.tailNode = null;
  }

  removeNodeAtEnd() {
    if (!this.headNode) return;
    if (!this.headNode.nextNode) {
      this.headNode = null;
      this.tailNode = null;
      this.length--;
      return;
    }
    let currentNode = this.headNode;
    let previousNode: Node<T> | null = null;
    while (currentNode.nextNode) {
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    if (previousNode) previousNode.nextNode = null;
    this.tailNode = previousNode;
    this.length--;
  }

  removeNodeWithValue(value: T) {
    if (!this.headNode) return;
    if (this.headNode.value === value) {
      this.headNode = this.headNode.nextNode;
      this.length--;
      if (!this.headNode) this.tailNode = null;

      return;
    }
    let currentNode = this.headNode;
    let previousNode: Node<T> | null = null;
    while (currentNode.value !== value) {
      if (!currentNode.nextNode) return;
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    if (previousNode) previousNode.nextNode = currentNode.nextNode;
    if (!currentNode.nextNode) this.tailNode = previousNode;
    this.length--;
  }

  getAt(index: number) {
    if (!this.headNode || index < 0 || index >= this.length) return null;

    let currentNode = this.headNode;
    let currentIndex = 0;
    while (currentIndex < index) {
      currentNode = currentNode.nextNode as Node<T>;
      currentIndex++;
    }
    return currentNode;
  }

  indexOf(value: T) {
    if (!this.headNode) return -1;

    let currentNode = this.headNode;
    let currentIndex = 0;
    while (currentNode) {
      if (currentNode.value === value) return currentIndex;
      currentNode = currentNode.nextNode as Node<T>;
      currentIndex++;
    }
    return -1;
  }

  isEmpty() {
    return !this.headNode;
  }

  stringifyList(): string {
    let stringList = "";
    let currentNode = this.getHeadNode();
    while (currentNode) {
      if (currentNode.getValue() !== null)
        stringList += `${currentNode.getValue()}\n`;
      currentNode = currentNode.getNextNode() as Node<T>;
    }
    return stringList;
  }
}
