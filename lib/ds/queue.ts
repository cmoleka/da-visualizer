export class Queue<T> {
  // A queue is an abstract data type that holds an ordered, linear
  // sequence of items. You can describe it as a first in, first out (FIFO) structure.
  // The first element to be added to the queue will be the first element to be removed
  // from the queue.
  public queue: Set<T> = new Set();
  public maxSize: number;

  constructor({ maxSize }: { maxSize: number }) {
    this.maxSize = maxSize;
  }

  // getQueue: Returns {list} of Queue.
  getQueue(): T[] {
    return Array.from(this.queue);
  }

  // setMaxSize: Set the maxSize {number} of the queue.
  setMaxSize(value: number): void {
    this.maxSize = value;
  }

  // isFull: Returns {Boolean} if Queue is full or empty.
  isFull(): boolean {
    return this.queue.size == this.maxSize;
  }

  // isEmpty: Returns {Boolean} if Queue is empty or not.
  isEmpty(): boolean {
    // return this.front > this.rear;
    return this.queue.size == 0;
  }

  // enqueue: Inserts {item} inside the queue.
  enqueue(data: T): void {
    if (!data) return;
    if (this.isFull()) return;
    this.queue.add(data);
  }

  // dequeuek: Removes {item} from the queue and return it.
  dequeue(): T | null {
    if (this.isEmpty()) return null;
    const dequeuedItem = Array.from(this.queue).filter(
      (item) => item == Array.from(this.queue)[0]
    )[0] as T;
    this.queue.delete(dequeuedItem);
    return dequeuedItem as T;
  }
}
