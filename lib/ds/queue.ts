export class Queue<T> {
  // A queue is an abstract data type that holds an ordered, linear
  // sequence of items. You can describe it as a first in, first out (FIFO) structure.
  // The first element to be added to the queue will be the first element to be removed
  // from the queue.
  private queue: T[];
  public maxSize: number;
  private front: number;
  private rear: number;

  constructor(maxSize: number) {
    this.queue = [];
    this.maxSize = maxSize;
    this.front = 0;
    this.rear = -1;
  }

  // getQueue: Returns {list} of Queue.
  getQueue(): T[] {
    return this.queue;
  }

  // setMaxSize: Set the maxSize {number} of the queue.
  setMaxSize(value: number): void {
    this.maxSize = value;
  }

  // isFull: Returns {Boolean} if Queue is full or empty.
  isFull(): boolean {
    if (!(this.rear + 1 == this.maxSize)) return false;
    return true;
  }

  // isEmpty: Returns {Boolean} if Queue is empty or not.
  isEmpty(): boolean {
    if (!(this.front > this.rear)) return false;
    return true;
  }

  // enqueue: Inserts {item} inside the queue.
  enqueue(data: T): void {
    if (this.isFull()) return;
    this.rear = this.rear + 1;
    if (!data) throw Error;
    console.log(data);
    this.queue.splice(this.rear, 0, data);
  }

  // dequeuek: Removes {item} from the queue and return it.
  dequeue(): T {
    let dequeuedItem: T | null = null;
    if (this.isEmpty()) throw Error("Queue is empty");
    dequeuedItem = this.queue.shift() as T;
    console.log(dequeuedItem);
    this.front = this.front + 1;
    return dequeuedItem;
  }
}
