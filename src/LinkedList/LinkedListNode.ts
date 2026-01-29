class LinkedListNode<V=any> {
    private value: V;
    private next: LinkedListNode<V> | null = null;
    constructor(value: V) {
        this.value = value;
        this.next = null;
    }
    public getValue(): V {
        return this.value;
    }
    public getNext(): LinkedListNode<V> | null {
        return this.next;
    }
    public setNext(next: LinkedListNode<V> | null) {
        this.next = next;
    }
    public toString(): string {
        return `LinkedListNode(value=${this.value})`;
    }
}

export default LinkedListNode;