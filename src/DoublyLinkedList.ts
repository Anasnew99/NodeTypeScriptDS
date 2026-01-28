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
        return `DoublyLinkedList(head=${this.getHead()?.toString()}, tail=${this.getTail()?.toString()}, list=${this.getListString()}, size=${this.size})`;
    }
    public getSize(): number {
        return this.size;
    }
    public getHead(): DoublyLinkNode<T, V> | null {
        return this.head?.getNext() ?? null;
    }
    
    public getTail(): DoublyLinkNode<T, V> | null {
        return this.tail?.getPrev() ?? null;
    }

    public getListString(): string {
        let current = this.head!.getNext();
        let result = '';
        while(current !== this.tail){
            result += current!.toString() + ' -> ';
            current = current!.getNext();
        }
        result += 'null';
        return result;
    }
    
    public reverse(): void {
        if(this.size <= 1) {
            return; // No need to reverse empty or single-node list
        }
        
        // Store references to the original first and last nodes
        const originalFirst = this.head!.getNext();
        const originalLast = this.tail!.getPrev();
        
        // Reverse all nodes by swapping next and prev pointers
        let current = originalFirst;
        while(current !== null && current !== this.tail){
            const temp = current.getNext();
            current.setNext(current.getPrev());
            current.setPrev(temp);
            current = temp;
        }
        
        // Update sentinel connections
        // The old last node is now the first node
        this.head!.setNext(originalLast);
        if(originalLast) {
            originalLast.setPrev(this.head);
        }
        
        // The old first node is now the last node
        this.tail!.setPrev(originalFirst);
        if(originalFirst) {
            originalFirst.setNext(this.tail);
        }
    }

}

export default DoublyLinkedList;