import LinkedList from "./LinkedList";

describe('LinkedList', () => {
  describe('Basic Operations', () => {
    test('should create a linked list', () => {
      const list = new LinkedList<number>([1, 2, 3, 4, 5]);
      expect(list.getHeadNode().getValue()).toBe(1);
    });
    test('should add a node to the head', () => {
      const list = new LinkedList<number>([1, 2, 3, 4, 5]);
      list.addToHead(0);
      expect(list.getHeadNode().getValue()).toBe(0);
    });
    test('should add a node to the tail', () => {
      const list = new LinkedList<number>([1, 2, 3, 4, 5]);
      list.addToTail(6);
      expect(list.getHeadNode().getValue()).toBe(1);
    });
    test('should add multiple nodes to the tail', () => {
      const list = new LinkedList<number>([1, 2, 3, 4, 5]);
      list.addToTail(6);
      list.addToTail(7);
      list.addToTail(8);
      expect(list.getHeadNode().getValue()).toBe(1);
      expect(list.getHeadNode().getNext()?.getValue()).toBe(2);
      expect(list.getHeadNode().getNext()?.getNext()?.getValue()).toBe(3);
      expect(list.getHeadNode().getNext()?.getNext()?.getNext()?.getValue()).toBe(4);
      expect(list.getHeadNode().getNext()?.getNext()?.getNext()?.getNext()?.getValue()).toBe(5);
      expect(list.getHeadNode().getNext()?.getNext()?.getNext()?.getNext()?.getNext()?.getValue()).toBe(6);
      expect(list.getHeadNode().getNext()?.getNext()?.getNext()?.getNext()?.getNext()?.getNext()?.getValue()).toBe(7);
      expect(list.getHeadNode().getNext()?.getNext()?.getNext()?.getNext()?.getNext()?.getNext()?.getNext()?.getValue()).toBe(8);
    });
  });
  describe('Middle Node', () => {
    test('should get the middle node if the list is odd', () => {
      const list = new LinkedList<number>([1, 2, 3, 4, 5]);
      expect(list.getMiddleNode().getValue()).toBe(3);
    });
    test('should get the middle node if the list is even', () => {
      const list = new LinkedList<number>([1, 2, 3, 4, 5, 6]);
      // For even-length lists, can return either 3 or 4 (both are valid middle nodes)
      const middleValue = list.getMiddleNode().getValue();
      expect([3,4]).toContain(middleValue);
    });
    test('should get the middle node if the list is empty', () => {
      const list = new LinkedList<number>([]);
      expect(list.getMiddleNode()).toBeNull();
    });
    test('should get the middle node if the list has one node', () => {
      const list = new LinkedList<number>([1]);
      expect(list.getMiddleNode().getValue()).toBe(1);
    });
    test('should get the middle node if the list has two nodes', () => {
      const list = new LinkedList<number>([1, 2]);
      expect(list.getMiddleNode().getValue()).toBe(1);
    });
    test('should get the middle node if new nodes are added to the list', () => {
      const list = new LinkedList<number>([1, 2, 3, 4, 5]);
      list.addToHead(0);
      const value = list.getMiddleNode().getValue();
      expect([2,3]).toContain(value);
    });
    
  });
});