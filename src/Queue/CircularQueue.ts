/**
 * A circular queue implementation using an array.
 * In a circular queue, the last element is connected back to the first element,
 * making efficient use of memory by reusing space when elements are dequeued.
 * 
 * @template T The type of elements stored in the queue
 * 
 * @example
 * ```typescript
 * const queue = new CircularQueue<number>(5);
 * queue.enqueue(1);
 * queue.enqueue(2);
 * queue.enqueue(3);
 * console.log(queue.getFront()); // 1
 * console.log(queue.dequeue()); // 1
 * ```
 */
export default class CircularQueue<T> {
    /** Maximum capacity of the queue */
    private size: number;
    /** Index pointing to the front element (where dequeue happens) */
    private front: number;
    /** Index pointing to the rear element (where enqueue happens) */
    private rear: number;
    /** Array storing the queue elements */
    private data: T[];

    /**
     * Creates a new circular queue with the specified capacity.
     * 
     * @param size - The maximum number of elements the queue can hold
     * @throws {Error} If size is less than or equal to 0
     */
    constructor(size: number) {
        if (size <= 0) {
            throw new Error('Queue size must be greater than 0');
        }
        this.size = size;
        this.front = -1;
        this.rear = -1;
        this.data = new Array(size);
    }

    /**
     * Calculates the circular index for a given index value.
     * This ensures indices wrap around when they exceed the queue size.
     * 
     * @param index - The index to convert to a circular index
     * @returns The circular index (0 to size-1)
     * 
     * @example
     * ```typescript
     * // If size is 5, getIndex(5) returns 0, getIndex(6) returns 1
     * ```
     */
    private getIndex(index: number): number {
        return index % this.size;
    }

    /**
     * Checks if the queue is full.
     * A queue is full when the next position after rear equals the front position,
     * indicating all available slots are occupied.
     * 
     * @returns `true` if the queue is full, `false` otherwise
     * 
     * @example
     * ```typescript
     * const queue = new CircularQueue<number>(3);
     * queue.enqueue(1);
     * queue.enqueue(2);
     * queue.enqueue(3);
     * console.log(queue.isFull()); // true
     * ```
     */
    public isFull(): boolean {
        return (this.rear + 1) % this.size === this.front;
    }

    /**
     * Checks if the queue is empty.
     * A queue is empty when front equals rear, which happens initially
     * when both are -1, or after all elements have been dequeued.
     * 
     * @returns `true` if the queue is empty, `false` otherwise
     * 
     * @example
     * ```typescript
     * const queue = new CircularQueue<number>(5);
     * console.log(queue.isEmpty()); // true
     * queue.enqueue(1);
     * console.log(queue.isEmpty()); // false
     * ```
     */
    public isEmpty(): boolean {
        return this.front === -1 && this.rear === -1;
    }

    /**
     * Adds an element to the rear of the queue.
     * If the queue is full, the operation fails and returns null.
     * 
     * @param value - The value to add to the queue
     * @returns The added value if successful, `null` if the queue is full
     * 
     * @example
     * ```typescript
     * const queue = new CircularQueue<number>(3);
     * queue.enqueue(1); // returns 1
     * queue.enqueue(2); // returns 2
     * queue.enqueue(3); // returns 3
     * queue.enqueue(4); // returns null (queue is full)
     * ```
     */
    public enqueue(value: T): T | null {
        if (this.isFull()) {
            return null;
        }
        
        // If queue is empty, initialize front to 0
        if (this.isEmpty()) {
            this.front = 0;
        }
        
        this.rear = (this.rear + 1) % this.size;
        this.data[this.rear] = value;
        return value;
    }

    /**
     * Removes and returns the element from the front of the queue.
     * If the queue is empty, the operation fails and returns null.
     * 
     * @returns The front element if successful, `null` if the queue is empty
     * 
     * @example
     * ```typescript
     * const queue = new CircularQueue<number>(5);
     * queue.enqueue(1);
     * queue.enqueue(2);
     * console.log(queue.dequeue()); // 1
     * console.log(queue.dequeue()); // 2
     * console.log(queue.dequeue()); // null (queue is empty)
     * ```
     */
    public dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        
        const value = this.data[this.front];
        
        // If only one element exists, reset the queue
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = this.getIndex(this.front+1);
        }
        
        return value;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * This is a peek operation that does not modify the queue.
     * 
     * @returns The front element if the queue is not empty, `null` otherwise
     * 
     * @example
     * ```typescript
     * const queue = new CircularQueue<number>(5);
     * queue.enqueue(1);
     * queue.enqueue(2);
     * console.log(queue.getFront()); // 1
     * queue.dequeue();
     * console.log(queue.getFront()); // 2
     * ```
     */
    public getFront(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.data[this.front];
    }

    /**
     * Returns the element at the rear of the queue without removing it.
     * This is a peek operation that does not modify the queue.
     * 
     * @returns The rear element if the queue is not empty, `null` otherwise
     * 
     * @example
     * ```typescript
     * const queue = new CircularQueue<number>(5);
     * queue.enqueue(1);
     * queue.enqueue(2);
     * queue.enqueue(3);
     * console.log(queue.getRear()); // 3
     * ```
     */
    public getRear(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.data[this.rear];
    }
}