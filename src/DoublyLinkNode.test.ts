import DoublyLinkNode from './DoublyLinkNode';
describe('DoublyLinkNode', () => {
  describe('Basic Operations', () => {
    test('should create a doubly link node', () => {
      const node = new DoublyLinkNode<string, number>('key1', 100);
      expect(node.getKey()).toBe('key1');
      expect(node.getValue()).toBe(100);
    });
    test('should set the next node', () => {
      const node = new DoublyLinkNode<string, number>('key1', 100);
      const nextNode = new DoublyLinkNode<string, number>('key2', 200);
      node.setNext(nextNode);
      expect(node.getNext()).toBe(nextNode);
    });
    test('should set the previous node', () => {
      const node = new DoublyLinkNode<string, number>('key1', 100);
      const prevNode = new DoublyLinkNode<string, number>('key2', 200);
      node.setPrev(prevNode);
      expect(node.getPrev()).toBe(prevNode);
    });
    test('should set the value', () => {
      const node = new DoublyLinkNode<string, number>('key1', 100);
      node.setValue(200);
      expect(node.getValue()).toBe(200);
    });
    test('should get the key', () => {
      const node = new DoublyLinkNode<string, number>('key1', 100);
      expect(node.getKey()).toBe('key1');
    });
    test('should get the next node', () => {
      const node = new DoublyLinkNode<string, number>('key1', 100);
      const nextNode = new DoublyLinkNode<string, number>('key2', 200);
      node.setNext(nextNode);
      expect(node.getNext()).toBe(nextNode);
    });
    test('should get the previous node', () => {
      const node = new DoublyLinkNode<string, number>('key1', 100);
      const prevNode = new DoublyLinkNode<string, number>('key2', 200);
      node.setPrev(prevNode);
      expect(node.getPrev()).toBe(prevNode);
    });
    test('should get the value', () => {
      const node = new DoublyLinkNode<string, number>('key1', 100);
      expect(node.getValue()).toBe(100);
    });
  });
});