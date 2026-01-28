import DoublyLinkedList from './DoublyLinkedList';
import DoublyLinkNode from './DoublyLinkNode';
describe('DoublyLinkedList', () => {
  describe('Basic Operations', () => {
    test('should create a doubly linked list', () => {
      const list = new DoublyLinkedList<string, number>();
      expect(list.getSize()).toBe(0);
      expect(list.getListString()).toBe('null');
    });
    test('should add a node to the head', () => {
      const list = new DoublyLinkedList<string, number>();
      list.addToHead(new DoublyLinkNode<string, number>('key1', 100));
      expect(list.getSize()).toBe(1);
      expect(list.getListString()).toBe('Node(key=key1, value=100) -> null');
    });
    test('should add a node to the tail', () => {
      const list = new DoublyLinkedList<string, number>();
      list.addToHead(new DoublyLinkNode<string, number>('key2', 200));
      list.addToHead(new DoublyLinkNode<string, number>('key3', 300));      
      list.addToTail(new DoublyLinkNode<string, number>('key1', 100));
      list.addToTail(new DoublyLinkNode<string, number>('key4', 400));
      expect(list.getSize()).toBe(4);
      expect(list.getListString()).toBe('Node(key=key3, value=300) -> Node(key=key2, value=200) -> Node(key=key1, value=100) -> Node(key=key4, value=400) -> null');
    });
    test('should reverse the list', () => {
      const list = new DoublyLinkedList<string, number>();
      list.addToHead(new DoublyLinkNode<string, number>('key2', 200));
      list.addToHead(new DoublyLinkNode<string, number>('key3', 300));      
      list.addToTail(new DoublyLinkNode<string, number>('key1', 100));
      list.addToTail(new DoublyLinkNode<string, number>('key4', 400));
      list.reverse();
      
      expect(list.getListString()).toBe('Node(key=key4, value=400) -> Node(key=key1, value=100) -> Node(key=key2, value=200) -> Node(key=key3, value=300) -> null');
    });
  });
});