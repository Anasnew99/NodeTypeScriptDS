import Queue from "./Queue";

describe('Queue', () => {
  describe('Constructor', () => {
    test('should create an empty queue', () => {
      const q = new Queue<number>();
      expect(q.getSize()).toBe(0);
      expect(q.isEmpty()).toBe(true);
      expect(q.getFront()).toBe(null);
      expect(q.getRear()).toBe(null);
    });
  });

  describe('Basic Operations', () => {
    test('should enqueue a value to the queue', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      expect(q.getSize()).toBe(1);
      expect(q.isEmpty()).toBe(false);
      expect(q.getFront()).toBe(1);
      expect(q.getRear()).toBe(1);
    });

    test('should enqueue multiple values', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(3);
      q.enqueue(4);
      expect(q.getSize()).toBe(3);
      expect(q.getFront()).toBe(1);
      expect(q.getRear()).toBe(4);
    });

    test('should dequeue a value from the queue', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      const result = q.dequeue();
      expect(result).toBe(1);
      expect(q.getSize()).toBe(0);
      expect(q.isEmpty()).toBe(true);
    });

    test('should dequeue values in FIFO order', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      expect(q.dequeue()).toBe(1);
      expect(q.dequeue()).toBe(2);
      expect(q.dequeue()).toBe(3);
      expect(q.isEmpty()).toBe(true);
    });

    test('should maintain correct order after multiple enqueue and dequeue operations', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.dequeue();
      q.enqueue(3);
      q.enqueue(4);
      expect(q.getFront()).toBe(2);
      expect(q.getRear()).toBe(4);
      expect(q.dequeue()).toBe(2);
      expect(q.dequeue()).toBe(3);
      expect(q.dequeue()).toBe(4);
      expect(q.isEmpty()).toBe(true);
    });
  });

  describe('isEmpty', () => {
    test('should return true for empty queue', () => {
      const q = new Queue<number>();
      expect(q.isEmpty()).toBe(true);
    });

    test('should return false when queue has elements', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      expect(q.isEmpty()).toBe(false);
    });

    test('should return true after all elements are dequeued', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.dequeue();
      q.dequeue();
      expect(q.isEmpty()).toBe(true);
    });
  });

  describe('getFront', () => {
    test('should return null for empty queue', () => {
      const q = new Queue<number>();
      expect(q.getFront()).toBe(null);
    });

    test('should return front element without removing it', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      expect(q.getFront()).toBe(1);
      expect(q.getFront()).toBe(1); // Should still be 1
      expect(q.getSize()).toBe(2); // Size should not change
      expect(q.dequeue()).toBe(1); // Verify it's still there
    });

    test('should update front after dequeue', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      q.dequeue();
      expect(q.getFront()).toBe(2);
    });
  });

  describe('getRear', () => {
    test('should return null for empty queue', () => {
      const q = new Queue<number>();
      expect(q.getRear()).toBe(null);
    });

    test('should return rear element without removing it', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      expect(q.getRear()).toBe(3);
      expect(q.getRear()).toBe(3); // Should still be 3
      expect(q.getSize()).toBe(3); // Size should not change
    });

    test('should update rear after enqueue', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      expect(q.getRear()).toBe(1);
      q.enqueue(2);
      expect(q.getRear()).toBe(2);
      q.enqueue(3);
      expect(q.getRear()).toBe(3);
    });

    test('should maintain correct rear after dequeue', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      q.dequeue();
      expect(q.getRear()).toBe(3); // Rear should remain the same
      q.dequeue();
      expect(q.getRear()).toBe(3); // Rear should remain the same
    });
  });

  describe('getSize', () => {
    test('should return 0 for empty queue', () => {
      const q = new Queue<number>();
      expect(q.getSize()).toBe(0);
    });

    test('should increment size after enqueue', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      expect(q.getSize()).toBe(1);
      q.enqueue(2);
      expect(q.getSize()).toBe(2);
      q.enqueue(3);
      expect(q.getSize()).toBe(3);
    });

    test('should decrement size after dequeue', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      q.dequeue();
      expect(q.getSize()).toBe(2);
      q.dequeue();
      expect(q.getSize()).toBe(1);
      q.dequeue();
      expect(q.getSize()).toBe(0);
    });

    test('should maintain correct size with mixed operations', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.dequeue();
      q.enqueue(3);
      expect(q.getSize()).toBe(2);
    });
  });

  describe('Edge Cases', () => {
    test('should return null when dequeuing from empty queue', () => {
      const q = new Queue<number>();
      const result = q.dequeue();
      expect(result).toBe(null);
      expect(q.isEmpty()).toBe(true);
      expect(q.getSize()).toBe(0);
    });

    test('should handle single element queue', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      expect(q.getFront()).toBe(1);
      expect(q.getRear()).toBe(1);
      expect(q.getSize()).toBe(1);
      expect(q.dequeue()).toBe(1);
      expect(q.isEmpty()).toBe(true);
      expect(q.getFront()).toBe(null);
      expect(q.getRear()).toBe(null);
    });

    test('should work with string type', () => {
      const q = new Queue<string>();
      q.enqueue('a');
      q.enqueue('b');
      q.enqueue('c');
      expect(q.getFront()).toBe('a');
      expect(q.getRear()).toBe('c');
      expect(q.dequeue()).toBe('a');
      expect(q.dequeue()).toBe('b');
      expect(q.dequeue()).toBe('c');
    });

    test('should work with object type', () => {
      const q = new Queue<{ id: number; name: string }>();
      q.enqueue({ id: 1, name: 'Alice' });
      q.enqueue({ id: 2, name: 'Bob' });
      expect(q.getFront()?.name).toBe('Alice');
      expect(q.getRear()?.name).toBe('Bob');
      expect(q.dequeue()?.id).toBe(1);
      expect(q.dequeue()?.id).toBe(2);
    });

    test('should handle null values', () => {
      const q = new Queue<number | null>();
      q.enqueue(null);
      q.enqueue(1);
      expect(q.getFront()).toBe(null);
      expect(q.dequeue()).toBe(null);
      expect(q.getFront()).toBe(1);
    });
  });

  describe('Complex Scenarios', () => {
    test('should handle alternating enqueue and dequeue operations', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.dequeue();
      q.enqueue(3);
      q.enqueue(4);
      q.dequeue();
      q.enqueue(5);
      expect(q.getFront()).toBe(3);
      expect(q.getRear()).toBe(5);
      expect(q.getSize()).toBe(3);
      expect(q.dequeue()).toBe(3);
      expect(q.dequeue()).toBe(4);
      expect(q.dequeue()).toBe(5);
      expect(q.isEmpty()).toBe(true);
    });

    test('should handle large number of operations', () => {
      const q = new Queue<number>();
      for (let i = 1; i <= 100; i++) {
        q.enqueue(i);
      }
      expect(q.getSize()).toBe(100);
      expect(q.getFront()).toBe(1);
      expect(q.getRear()).toBe(100);
      
      for (let i = 1; i <= 50; i++) {
        expect(q.dequeue()).toBe(i);
      }
      expect(q.getSize()).toBe(50);
      expect(q.getFront()).toBe(51);
      
      for (let i = 51; i <= 100; i++) {
        expect(q.dequeue()).toBe(i);
      }
      expect(q.isEmpty()).toBe(true);
    });

    test('should maintain FIFO order with complex operations', () => {
      const q = new Queue<number>();
      // Enqueue initial elements
      q.enqueue(1);
      q.enqueue(2);
      q.enqueue(3);
      
      // Dequeue one
      expect(q.dequeue()).toBe(1);
      
      // Enqueue more
      q.enqueue(4);
      q.enqueue(5);
      
      // Verify order
      expect(q.dequeue()).toBe(2);
      expect(q.dequeue()).toBe(3);
      expect(q.dequeue()).toBe(4);
      expect(q.dequeue()).toBe(5);
      expect(q.isEmpty()).toBe(true);
    });
  });
});