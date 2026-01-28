import LRUCache from './LRUCache';
describe('LRUCache', () => {
  describe('Basic Operations', () => {
    test('should create cache with specified capacity', () => {
      const cache = new LRUCache<string, number>(3);
      expect(cache.getSize()).toBe(0);
      expect(cache.getCapacity()).toBe(3);
    });
    test('should put and get values', () => {
      const cache = new LRUCache<string, number>(3);
      cache.put('key1', 100);
      expect(cache.get('key1')).toBe(100);
      expect(cache.getSize()).toBe(1);
    });
    test('should return null for non-existent key', () => {
      const cache = new LRUCache<string, number>(3);
      expect(cache.get('nonexistent')).toBeNull();
    });
    test('should update existing key value', () => {
      const cache = new LRUCache<string, number>(3);
      cache.put('key1', 100);
      cache.put('key1', 200);
      expect(cache.get('key1')).toBe(200);
      expect(cache.getSize()).toBe(1);
    });
    describe('Capacity and Eviction', () => {
      test('should evict least recently used item when capacity is reached', () => {
        const cache = new LRUCache<string, number>(2);
        cache.put('key1', 100);
        cache.put('key2', 200);
        cache.put('key3', 300);
        expect(cache.get('key1')).toBeNull(); // Should evict key1 (least recently used)
        expect(cache.get('key2')).toBe(200);
        expect(cache.get('key3')).toBe(300);
        expect(cache.getSize()).toBe(2);
      });
      test('should evict least recently used item when capacity is reached', () => {
        const cache = new LRUCache<string, number>(2);
        cache.put('key1', 100);
        cache.put('key2', 200);
        cache.get('key1');
        cache.put('key3', 300);
        expect(cache.get('key1')).toBe(100); // Should evict key1 (least recently used)
        expect(cache.get('key2')).toBeNull();
        expect(cache.get('key3')).toBe(300);
        expect(cache.getSize()).toBe(2);
      });
      
    });
  });
});