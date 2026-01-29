import LinkedListNode from "./LinkedListNode";

class LinkedList<V=any> {
    private head: LinkedListNode<V> = new LinkedListNode<V>(null as unknown as V);
    private size: number = 0;
    constructor(values: V[]) {
        values.reverse().forEach(value => {
            this.addToHead(value);
        });

    }
    public getSize() {
        return this.size;
    }
    public addToHead(value: V) {
        const newNode = new LinkedListNode<V>(value);
        newNode.setNext(this.head.getNext()!);
        this.head.setNext(newNode);
        this.size++;
    }
    public addToTail(value: V) {
        let currentNode = this.getHeadNode();
        while(currentNode.getNext() !== null) {
            currentNode = currentNode.getNext()!;
        }
        currentNode.setNext(new LinkedListNode<V>(value));
        this.size++;
    }
    public addToTailUsingNode(node: LinkedListNode<V>) {
        let currentNode = this.getHeadNode();
        while(currentNode.getNext() !== null) {
            currentNode = currentNode.getNext()!;
        }
        currentNode.setNext(node);
        this.size++;
    }
    public getHeadNode() {
        return this.head.getNext()!;
    }
    public getMiddleNode() {
        let slow = this.getHeadNode();
        let fast = this.getHeadNode()?.getNext() ?? null;
        while(fast !== null && fast.getNext() !== null) {
            slow = slow!.getNext()!;
            fast = fast.getNext()!.getNext()!;
        }
        return slow!;
    }
    public removeNode(node: LinkedListNode<V>) {
        let currentNode = this.head;
        while(currentNode.getNext() !== null) {
            if(currentNode.getNext() === node) {
                currentNode.setNext(currentNode.getNext()!.getNext());
                this.size--;
                return;
            }
            currentNode = currentNode.getNext()!;
        }
        throw new Error("Node not found");
    }
    
}

export default LinkedList;