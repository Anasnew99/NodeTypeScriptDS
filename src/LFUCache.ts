import DoublyLinkedList from "./DoublyLinkedList";
import DoublyLinkNode from "./DoublyLinkNode";

export class LFUCache <T = string, V=any> {
    private capacity: number;
    private map: Map<T, {node: DoublyLinkNode<T, V>, frequency: number | 0}> = new Map();
    private frequencyMap: Map<number, DoublyLinkedList<T, V>> = new Map();
    private minFrequency: number = 0;
    private size: number = 0;
    constructor(capacity: number) {
        this.capacity = capacity;
    }
    public getSize(): number {
        return this.size;
    }
    public getCapacity(): number {
        return this.capacity;
    }
    private updateFrequency(key: T, frequency: number) {
        const {node, frequency: oldFrequency} = this.map.get(key)!;
        if(oldFrequency !== 0){
            this.frequencyMap.get(oldFrequency)!.removeNode(node);
            if(this.frequencyMap.get(oldFrequency)!.getSize() === 0){
                if(oldFrequency === this.minFrequency){
                    this.minFrequency++;
                }
            }
        }
        const frequencyList = this.frequencyMap.get(frequency) ?? new DoublyLinkedList<T, V>();
        frequencyList.addToHead(node);
        this.frequencyMap.set(frequency, frequencyList);
        this.map.set(key, {node, frequency});
    }
    public get(key: T): V | null {
        const entry = this.map.get(key);
        if(!entry){
            return null;
        }
        const {node, frequency} = entry;
        this.updateFrequency(key, frequency+1);
        return node.getValue();
    }
    public put(key: T, value: V) {
        const entry = this.map.get(key);
        if(entry){
            const {node, frequency} = entry;
            this.updateFrequency(key, frequency+1);
            node.setValue(value);
            return node.getValue();
        }else{
            if(this.size === this.capacity){
                // Remove the least frequently used node (LRU within same frequency)
                const minFreqList = this.frequencyMap.get(this.minFrequency);
                if(minFreqList){
                    const leastFrequentNode = minFreqList.getTail();
                    if(leastFrequentNode){
                        minFreqList.removeNode(leastFrequentNode);
                        this.map.delete(leastFrequentNode.getKey());
                        this.size--;
                    }
                }
            }
            const newNode = new DoublyLinkNode<T, V>(key, value);
            this.map.set(key, {node: newNode, frequency: 0});
            this.minFrequency = 1; // New items always start at frequency 1
            this.updateFrequency(key, 1);
            this.size++;
        }
        return null;
    }
}