import LinkedList from "../LinkedList/LinkedList";

class Stack<V=any> {
    private list: LinkedList<V>;
    private capacity: number;
    constructor(capacity?: number) {
        this.capacity = capacity??Infinity;
        this.list = new LinkedList<V>([]);
    }
    public getSize() {
        return this.list.getSize();
    }
    public getCapacity() {
        return this.capacity;
    }
    public push(value: V) {
        if(this.getSize() === this.capacity) {
            throw new Error("Stack is full");
        }
        this.list.addToHead(value);
    }
    public pop() {
        if(this.getSize() === 0) {
            throw new Error("Stack is empty");
        }
        const value = this.list.getHeadNode().getValue();
        this.list.removeNode(this.list.getHeadNode());
        return value;
    }
    public peek(index: number = 0) {
        let currentNode = this.list.getHeadNode();
        for(let i = 0; i < index; i++) {
            currentNode = currentNode.getNext()!;
        }
        return currentNode.getValue();
    }
    public isEmpty() {
        return this.getSize() === 0;
    }
    public isFull() {
        return this.getSize() === this.capacity;
    }
    public stackTop() {
        return this.peek(0);
    }
    public stackBottom() {
        return this.peek(this.getSize() - 1);
    }
    
}

export default Stack;