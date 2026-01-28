import LRUCache from './LRUCache';
const lruCache = new LRUCache<string, number>(2);

lruCache.put('1', 1);
lruCache.put('2', 2);
console.log(lruCache.get('1'));
lruCache.put('3', 3);
console.log(lruCache.get('2'));
lruCache.put('4', 4);
console.log(lruCache.get('1'));
console.log(lruCache.get('3'));
console.log(lruCache.get('4'));
console.log(lruCache.toString());

