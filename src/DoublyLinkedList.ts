import DoublyLinkNode from "./DoublyLinkNode";

class DoublyLinkedList<T = string, V=any> {
    private head: DoublyLinkNode<T, V> | null = null;
    private tail: DoublyLinkNode<T, V> | null = null;
    private size: number = 0;
    constructor() {
        this.head =  new DoublyLinkNode<T, V>('' as T, null as unknown as V);
        this.tail = new DoublyLinkNode<T, V>('' as T, null as unknown as V);
        this.tail.setPrev(this.head);
        this.head.setNext(this.tail);
        this.size = 0;
    }
    public addToHead(node: DoublyLinkNode<T, V>) {
        const currentHead = this.head?.getNext();
        currentHead!.setPrev(node);
        this.head!.setNext(node);
        node.setPrev(this.head);
        node.setNext(currentHead!);
        this.size++;
    }
    public addToTail(node: DoublyLinkNode<T, V>) {
        const currentTail = this.tail?.getPrev();
        currentTail!.setNext(node);
        this.tail!.setPrev(node);
        node.setPrev(currentTail!);
        node.setNext(this.tail!);
        this.size++;
    }
    public removeNode(node: DoublyLinkNode<T, V>) {
        node.getPrev()!.setNext(node.getNext());
        node.getNext()!.setPrev(node.getPrev());
        this.size--;
    }
    public toString(): string {
        return `DoublyLinkedList(head=${this.head?.toString()}, tail=${this.tail?.toString()}, size=${this.size})`;
    }
    public getSize(): number {
        return this.size;
    }
    public getHead(): DoublyLinkNode<T, V> | null {
        return this.head!.getNext();
    }
    public getTail(): DoublyLinkNode<T, V> | null {
        return this.tail!.getPrev();
    }
}

export default DoublyLinkedList;