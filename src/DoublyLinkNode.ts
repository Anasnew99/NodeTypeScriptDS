class DoublyLinkNode<T = string, V=any> {
    private key: T;
    private value: V;
    private next: DoublyLinkNode<T, V> | null = null;
    private prev: DoublyLinkNode<T, V> | null = null;

    constructor(key: T, value: V) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
    public getKey(): T {
        return this.key;
    }
    public getValue(): V {
        return this.value;
    }
    public setValue(value: V) {
        this.value = value;
    }
    public getNext(): DoublyLinkNode<T, V> | null {
        return this.next;
    }
    public getPrev(): DoublyLinkNode<T, V> | null {
        return this.prev;
    }
    public setNext(next: DoublyLinkNode<T, V> | null) {
        this.next = next;
    }
    public setPrev(prev: DoublyLinkNode<T, V> | null) {
        this.prev = prev;
    }
    public toString(): string {
        return `Node(key=${this.key}, value=${this.value})`;
    }
}

export default DoublyLinkNode;