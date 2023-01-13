export class Queue<T> {
  // A queue is an abstract data type that holds an ordered, linear
  // sequence of items. You can describe it as a first in, first out (FIFO) structure.
  // The first element to be added to the queue will be the first element to be removed
  // from the queue.
  public queue: T[];
  public maxSize: number;
  private front: number;
  private rear: number;

  constructor({ maxSize }: { maxSize: number }) {
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
    return this.rear + 1 == this.maxSize;
  }

  // isEmpty: Returns {Boolean} if Queue is empty or not.
  isEmpty(): boolean {
    return this.front > this.rear;
  }

  // enqueue: Inserts {item} inside the queue.
  enqueue(data: T): void {
    if (!data) throw Error("Data is either null or undefined.");
    if (this.isFull()) throw Error("The queue is full.");
    this.rear += 1;
    this.queue.splice(this.rear, 0, data);
  }

  // dequeuek: Removes {item} from the queue and return it.
  dequeue(): T | null {
    if (this.isEmpty()) {
      this.front = 0;
      this.rear = -1;
      return null;
    }
    const dequeuedItem = this.queue.shift() as T;
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    }
    this.front += 1;
    return dequeuedItem;
  }
}
