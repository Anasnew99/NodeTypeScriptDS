import CircularQueue from './CircularQueue';

describe('CircularQueue', () => {
  describe('Constructor', () => {
    test('should create an empty circular queue with specified size', () => {
      const queue = new CircularQueue<number>(5);
      expect(queue.isEmpty()).toBe(true);
      expect(queue.isFull()).toBe(false);
    });

    test('should throw error if size is less than or equal to 0', () => {
      expect(() => new CircularQueue<number>(0)).toThrow('Queue size must be greater than 0');
      expect(() => new CircularQueue<number>(-1)).toThrow('Queue size must be greater than 0');
    });
  });

  describe('Basic Operations', () => {
    test('should enqueue a value to the queue', () => {
      const queue = new CircularQueue<number>(5);
      const result = queue.enqueue(1);
      expect(result).toBe(1);
      expect(queue.isEmpty()).toBe(false);
    });

    test('should dequeue a value from the queue', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      const result = queue.dequeue();
      expect(result).toBe(1);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should enqueue multiple values', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.getFront()).toBe(1);
      expect(queue.getRear()).toBe(3);
    });

    test('should dequeue values in FIFO order', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('isEmpty', () => {
    test('should return true for empty queue', () => {
      const queue = new CircularQueue<number>(5);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should return false when queue has elements', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);
    });

    test('should return true after all elements are dequeued', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.dequeue();
      queue.dequeue();
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('isFull', () => {
    test('should return false when queue is not full', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.isFull()).toBe(false);
    });

    test('should return true when queue reaches capacity', () => {
      const queue = new CircularQueue<number>(3);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.isFull()).toBe(true);
    });

    test('should return false after dequeuing from full queue', () => {
      const queue = new CircularQueue<number>(3);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.dequeue();
      expect(queue.isFull()).toBe(false);
    });
  });

  describe('getFront', () => {
    test('should return null for empty queue', () => {
      const queue = new CircularQueue<number>(5);
      expect(queue.getFront()).toBe(null);
    });

    test('should return front element without removing it', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.getFront()).toBe(1);
      expect(queue.getFront()).toBe(1); // Should still be 1
      expect(queue.dequeue()).toBe(1); // Verify it's still there
    });

    test('should update front after dequeue', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.dequeue();
      expect(queue.getFront()).toBe(2);
    });
  });

  describe('getRear', () => {
    test('should return null for empty queue', () => {
      const queue = new CircularQueue<number>(5);
      expect(queue.getRear()).toBe(null);
    });

    test('should return rear element without removing it', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.getRear()).toBe(3);
      expect(queue.getRear()).toBe(3); // Should still be 3
    });

    test('should update rear after enqueue', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      expect(queue.getRear()).toBe(1);
      queue.enqueue(2);
      expect(queue.getRear()).toBe(2);
      queue.enqueue(3);
      expect(queue.getRear()).toBe(3);
    });
  });

  describe('Circular Behavior', () => {
    test('should wrap around when reaching end of array', () => {
      const queue = new CircularQueue<number>(3);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.dequeue(); // Remove 1, front moves to index 1
      queue.enqueue(4); // Should wrap to index 0
      expect(queue.getFront()).toBe(2);
      expect(queue.getRear()).toBe(4);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
    });

    test('should handle multiple wrap-around cycles', () => {
      const queue = new CircularQueue<number>(3);
      // Fill queue
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      // Empty queue
      queue.dequeue();
      queue.dequeue();
      queue.dequeue();
      // Fill again (should wrap around)
      queue.enqueue(4);
      queue.enqueue(5);
      queue.enqueue(6);
      expect(queue.getFront()).toBe(4);
      expect(queue.getRear()).toBe(6);
    });

    test('should maintain correct order with wrap-around', () => {
      const queue = new CircularQueue<number>(3);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.dequeue(); // Remove 1
      queue.enqueue(4); // Add 4 at position 0
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('should return null when enqueueing to full queue', () => {
      const queue = new CircularQueue<number>(2);
      queue.enqueue(1);
      queue.enqueue(2);
      const result = queue.enqueue(3);
      expect(result).toBe(null);
      expect(queue.isFull()).toBe(true);
    });

    test('should return null when dequeuing from empty queue', () => {
      const queue = new CircularQueue<number>(5);
      const result = queue.dequeue();
      expect(result).toBe(null);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should handle single element queue', () => {
      const queue = new CircularQueue<number>(1);
      queue.enqueue(1);
      expect(queue.isFull()).toBe(true);
      expect(queue.getFront()).toBe(1);
      expect(queue.getRear()).toBe(1);
      expect(queue.dequeue()).toBe(1);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should work with string type', () => {
      const queue = new CircularQueue<string>(3);
      queue.enqueue('a');
      queue.enqueue('b');
      queue.enqueue('c');
      expect(queue.getFront()).toBe('a');
      expect(queue.getRear()).toBe('c');
      expect(queue.dequeue()).toBe('a');
    });

    test('should work with object type', () => {
      const queue = new CircularQueue<{ id: number; name: string }>(3);
      queue.enqueue({ id: 1, name: 'Alice' });
      queue.enqueue({ id: 2, name: 'Bob' });
      expect(queue.getFront()?.name).toBe('Alice');
      expect(queue.getRear()?.name).toBe('Bob');
    });
  });

  describe('Complex Scenarios', () => {
    test('should handle alternating enqueue and dequeue operations', () => {
      const queue = new CircularQueue<number>(5);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.dequeue();
      queue.enqueue(3);
      queue.enqueue(4);
      queue.dequeue();
      queue.enqueue(5);
      expect(queue.getFront()).toBe(3);
      expect(queue.getRear()).toBe(5);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
      expect(queue.dequeue()).toBe(5);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should handle rapid enqueue and dequeue', () => {
      const queue = new CircularQueue<number>(4);
      // Fill queue to capacity
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      
      // Now alternate: dequeue one, enqueue one (this tests wrap-around)
      queue.dequeue(); // Remove 1
      queue.enqueue(5); // Add 5 at position 0 (wrap-around)
      queue.dequeue(); // Remove 2
      queue.enqueue(6); // Add 6 at position 1
      
      // Queue should now have: 3, 4, 5, 6
      expect(queue.getFront()).toBe(3);
      expect(queue.getRear()).toBe(6);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
      expect(queue.dequeue()).toBe(5);
      expect(queue.dequeue()).toBe(6);
      expect(queue.isEmpty()).toBe(true);
    });
  });
});

