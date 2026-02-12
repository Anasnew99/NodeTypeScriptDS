import LinkedListNode from "../LinkedList/LinkedListNode";

/**
 * A queue implementation using a linked list.
 * A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle,
 * where elements are added at the rear and removed from the front.
 * 
 * @template T The type of elements stored in the queue
 * 
 * @example
 * ```typescript
 * const queue = new Queue<number>();
 * queue.enqueue(1);
 * queue.enqueue(2);
 * queue.enqueue(3);
 * console.log(queue.getFront()); // 1
 * console.log(queue.dequeue()); // 1
 * console.log(queue.dequeue()); // 2
 * ```
 */
export default class Queue<T>{
    /** Pointer to the front node of the queue (where dequeue happens) */
    private front: LinkedListNode<T>|null = null;
    /** Pointer to the rear node of the queue (where enqueue happens) */
    private rear: LinkedListNode<T>|null = null;
    /** Current number of elements in the queue */
    private size: number = 0;

    /**
     * Creates a new empty queue.
     * Initializes front and rear pointers to null and size to 0.
     * 
     * @example
     * ```typescript
     * const queue = new Queue<string>();
     * console.log(queue.isEmpty()); // true
     * ```
     */
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    /**
     * Checks if the queue is empty.
     * A queue is empty when the front pointer is null, indicating no elements are present.
     * 
     * @returns `true` if the queue is empty, `false` otherwise
     * 
     * @example
     * ```typescript
     * const queue = new Queue<number>();
     * console.log(queue.isEmpty()); // true
     * queue.enqueue(1);
     * console.log(queue.isEmpty()); // false
     * ```
     */
    public isEmpty(): boolean {
        return this.front === null;
    }

    /**
     * Adds an element to the rear of the queue.
     * Creates a new node with the given value and appends it to the end of the queue.
     * If the queue is empty, the new node becomes both front and rear.
     * 
     * @param v - The value to add to the queue
     * 
     * @example
     * ```typescript
     * const queue = new Queue<number>();
     * queue.enqueue(1);
     * queue.enqueue(2);
     * queue.enqueue(3);
     * console.log(queue.getSize()); // 3
     * ```
     */
    public enqueue(v: T): void {
        const node = new LinkedListNode<T>(v);
        if(this.isEmpty()){
            this.front = node;
            this.rear = node;
        }else{
            this.rear!.setNext(node);
            this.rear = node;
        }
        this.size++;
    }

    /**
     * Removes and returns the element from the front of the queue.
     * Follows FIFO principle - the element that was enqueued first is dequeued first.
     * 
     * @returns The front element if the queue is not empty, `null` if the queue is empty
     * 
     * @example
     * ```typescript
     * const queue = new Queue<number>();
     * queue.enqueue(1);
     * queue.enqueue(2);
     * queue.enqueue(3);
     * console.log(queue.dequeue()); // 1
     * console.log(queue.dequeue()); // 2
     * console.log(queue.dequeue()); // 3
     * console.log(queue.dequeue()); // null (queue is empty)
     * ```
     */
    public dequeue(): T | null {
        if(this.isEmpty()){
            return null;
        }
        const v = this.front!.getValue();
        this.front = this.front!.getNext();
        this.size--;
        
        // If queue becomes empty after dequeue, reset rear pointer
        if(this.front === null){
            this.rear = null;
        }
        
        return v;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * This is a peek operation that does not modify the queue structure.
     * 
     * @returns The front element if the queue is not empty, `null` otherwise
     * 
     * @example
     * ```typescript
     * const queue = new Queue<number>();
     * queue.enqueue(1);
     * queue.enqueue(2);
     * console.log(queue.getFront()); // 1
     * queue.dequeue();
     * console.log(queue.getFront()); // 2
     * ```
     */
    public getFront(): T | null {
        if(this.isEmpty()){
            return null;
        }
        return this.front!.getValue();
    }

    /**
     * Returns the element at the rear of the queue without removing it.
     * This is a peek operation that does not modify the queue structure.
     * 
     * @returns The rear element if the queue is not empty, `null` otherwise
     * 
     * @example
     * ```typescript
     * const queue = new Queue<number>();
     * queue.enqueue(1);
     * queue.enqueue(2);
     * queue.enqueue(3);
     * console.log(queue.getRear()); // 3
     * ```
     */
    public getRear(): T | null {
        if(this.isEmpty()){
            return null;
        }
        return this.rear!.getValue();
    }

    /**
     * Returns the current number of elements in the queue.
     * 
     * @returns The size of the queue (number of elements)
     * 
     * @example
     * ```typescript
     * const queue = new Queue<number>();
     * console.log(queue.getSize()); // 0
     * queue.enqueue(1);
     * queue.enqueue(2);
     * console.log(queue.getSize()); // 2
     * queue.dequeue();
     * console.log(queue.getSize()); // 1
     * ```
     */
    public getSize(): number {
        return this.size;
    }
}