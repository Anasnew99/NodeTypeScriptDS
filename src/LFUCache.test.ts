import { LFUCache } from './LFUCache';

describe('LFUCache', () => {
  describe('Basic Operations', () => {
    test('should create cache with specified capacity', () => {
      const cache = new LFUCache<string, number>(3);
      expect(cache.getSize()).toBe(0);
      expect(cache.getCapacity()).toBe(3);
    });

    test('should put and get values', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('key1', 100);
      expect(cache.get('key1')).toBe(100);
      expect(cache.getSize()).toBe(1);
    });

    test('should return null for non-existent key', () => {
      const cache = new LFUCache<string, number>(3);
      expect(cache.get('nonexistent')).toBeNull();
    });

    test('should update existing key value', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('key1', 100);
      cache.put('key1', 200);
      expect(cache.get('key1')).toBe(200);
      expect(cache.getSize()).toBe(1);
    });
  });

  describe('Capacity and Eviction', () => {
    test('should evict least frequently used item when capacity is reached', () => {
      const cache = new LFUCache<string, number>(2);
      cache.put('key1', 100);
      cache.put('key2', 200);
      cache.put('key3', 300); // Should evict key1 (least frequently used)
      
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBe(200);
      expect(cache.get('key3')).toBe(300);
      expect(cache.getSize()).toBe(2);
    });

    test('should evict least recently used when frequencies are equal', () => {
      const cache = new LFUCache<string, number>(2);
      cache.put('key1', 100);
      cache.put('key2', 200);
      // Both have frequency 1
      cache.put('key3', 300); // Should evict key1 (LRU among same frequency)
      
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBe(200);
      expect(cache.get('key3')).toBe(300);
    });

    test('should evict least frequently used item correctly', () => {
      const cache = new LFUCache<string, number>(2);
      cache.put('key1', 100);
      cache.put('key2', 200);
      cache.get('key2'); // key2 now has frequency 2, key1 has frequency 1
      cache.put('key3', 300); // Should evict key1 (frequency 1 < frequency 2)
      
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBe(200);
      expect(cache.get('key3')).toBe(300);
    });
  });

  describe('Frequency Tracking', () => {
    test('should increment frequency on get', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('key1', 100);
      cache.put('key2', 200);
      cache.put('key3', 300);
      
      cache.get('key1'); // key1: frequency 2
      cache.get('key1'); // key1: frequency 3
      cache.get('key2'); // key2: frequency 2
      
      // Evict key3 (frequency 1) when adding key4
      cache.put('key4', 400);
      
      expect(cache.get('key1')).toBe(100);
      expect(cache.get('key2')).toBe(200);
      expect(cache.get('key3')).toBeNull();
      expect(cache.get('key4')).toBe(400);
    });

    test('should increment frequency on put for existing key', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('key1', 100);
      cache.put('key2', 200);
      cache.put('key3', 300);
      
      cache.put('key1', 150); // key1: frequency 2
      cache.put('key2', 250); // key2: frequency 2
      
      // Evict key3 (frequency 1) when adding key4
      cache.put('key4', 400);
      
      expect(cache.get('key1')).toBe(150);
      expect(cache.get('key2')).toBe(250);
      expect(cache.get('key3')).toBeNull();
      expect(cache.get('key4')).toBe(400);
    });

    test('should track frequency correctly across multiple operations', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('a', 1);
      cache.put('b', 2);
      cache.put('c', 3);
      
      cache.get('a'); // a: 2
      cache.get('b'); // b: 2
      cache.get('a'); // a: 3
      
      cache.put('d', 4); // Should evict c (frequency 1)
      
      expect(cache.get('a')).toBe(1);
      expect(cache.get('b')).toBe(2);
      expect(cache.get('c')).toBeNull();
      expect(cache.get('d')).toBe(4);
    });
  });

  describe('Edge Cases', () => {
    test('should handle capacity of 1', () => {
      const cache = new LFUCache<string, number>(1);
      cache.put('key1', 100);
      expect(cache.get('key1')).toBe(100);
      
      cache.put('key2', 200);
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBe(200);
    });

    test('should handle empty cache operations', () => {
      const cache = new LFUCache<string, number>(3);
      expect(cache.get('any')).toBeNull();
      expect(cache.getSize()).toBe(0);
    });

    test('should handle different value types', () => {
      const cache = new LFUCache<string, any>(4);
      cache.put('string', 'hello');
      cache.put('number', 42);
      cache.put('object', { foo: 'bar' });
      cache.put('array', [1, 2, 3]);
      
      expect(cache.get('string')).toBe('hello');
      expect(cache.get('number')).toBe(42);
      expect(cache.get('object')).toEqual({ foo: 'bar' });
      expect(cache.get('array')).toEqual([1, 2, 3]);
    });

    test('should handle different key types', () => {
      const cache = new LFUCache<number, string>(3);
      cache.put(1, 'one');
      cache.put(2, 'two');
      cache.put(3, 'three');
      
      expect(cache.get(1)).toBe('one');
      expect(cache.get(2)).toBe('two');
      expect(cache.get(3)).toBe('three');
    });
  });

  describe('LFU Behavior', () => {
    test('should evict least frequently used when multiple items have different frequencies', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('a', 1);
      cache.put('b', 2);
      cache.put('c', 3);
      
      // a: frequency 1
      cache.get('b'); // b: frequency 2
      cache.get('b'); // b: frequency 3
      cache.get('c'); // c: frequency 2
      
      cache.put('d', 4); // Should evict a (frequency 1)
      
      expect(cache.get('a')).toBeNull();
      expect(cache.get('b')).toBe(2);
      expect(cache.get('c')).toBe(3);
      expect(cache.get('d')).toBe(4);
    });

    test('should evict LRU when frequencies are equal', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('a', 1);
      cache.put('b', 2);
      cache.put('c', 3);
      
      // All have frequency 1
      // Access order: a, b, c
      // When evicting, should remove a (least recently used)
      cache.put('d', 4);
      
      expect(cache.get('a')).toBeNull();
      expect(cache.get('b')).toBe(2);
      expect(cache.get('c')).toBe(3);
      expect(cache.get('d')).toBe(4);
    });

    test('should handle complex LFU scenario', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('a', 1);
      cache.put('b', 2);
      cache.put('c', 3);
      
      cache.get('a'); // a: 2
      cache.get('b'); // b: 2
      cache.put('c', 33); // c: 2
      
      // All have frequency 2 now
      // Original order: a, b, c
      // After updates: a accessed, b accessed, c updated
      // When adding d, should evict a (LRU among frequency 2)
      cache.put('d', 4);
      
      expect(cache.get('a')).toBeNull();
      expect(cache.get('b')).toBe(2);
      expect(cache.get('c')).toBe(33);
      expect(cache.get('d')).toBe(4);
    });
  });

  describe('Size Management', () => {
    test('should correctly track size', () => {
      const cache = new LFUCache<string, number>(3);
      expect(cache.getSize()).toBe(0);
      
      cache.put('key1', 100);
      expect(cache.getSize()).toBe(1);
      
      cache.put('key2', 200);
      expect(cache.getSize()).toBe(2);
      
      cache.put('key3', 300);
      expect(cache.getSize()).toBe(3);
      
      cache.put('key4', 400); // Evicts one
      expect(cache.getSize()).toBe(3);
    });

    test('should not increase size when updating existing key', () => {
      const cache = new LFUCache<string, number>(3);
      cache.put('key1', 100);
      expect(cache.getSize()).toBe(1);
      
      cache.put('key1', 200);
      expect(cache.getSize()).toBe(1);
    });
  });
});

