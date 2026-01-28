import DoublyLinkNode from "./DoublyLinkNode";
import DoublyLinkedList from "./DoublyLinkedList";

class LRUCache<T extends string, V=any> {
    private map: Map<T, DoublyLinkNode<T, V>> = new Map();
    private doublyLinkedList: DoublyLinkedList<T, V> = new DoublyLinkedList<T, V>();
    private capacity: number;
    constructor(capacity: number) {
        this.capacity = capacity;

    }
    
    public getSize(): number {
        return this.doublyLinkedList.getSize();
    }
    public getCapacity(): number {
        return this.capacity;
    }
    public get(key: T): V | null {
        const node = this.map.get(key);
        if (node) {
            this.doublyLinkedList.removeNode(node);
            this.doublyLinkedList.addToHead(node);
            return node.getValue();
        }
        return null;
    }
    public put(key: T, value: V) {
        const node = this.map.get(key);
        if(node){
            this.doublyLinkedList.removeNode(node);
            this.doublyLinkedList.addToHead(node);
            node.setValue(value);
            return null;
        }else{
            if(this.doublyLinkedList.getSize() === this.capacity){
                const leastRecentNode = this.doublyLinkedList.getTail();
                if(leastRecentNode){
                    this.doublyLinkedList.removeNode(leastRecentNode);
                    this.map.delete(leastRecentNode.getKey());
                }
                const newNode = new DoublyLinkNode<T, V>(key, value);
                this.map.set(key, newNode);
                this.doublyLinkedList.addToHead(newNode);
            }else{
                const newNode = new DoublyLinkNode<T, V>(key, value);
                this.map.set(key, newNode);
                this.doublyLinkedList.addToHead(newNode);
            }
            return null;
            
        }
        

    }
    public toString(): string {
        return `LRUCache(capacity=${this.capacity}, size=${this.getSize()}, map=${Array.from(this.map.entries()).map(([key, value]) => `${key}: ${value.toString()}`).join(', ')}, doublyLinkedList=${this.doublyLinkedList.toString()})`;
    }
 
}

export default LRUCache;