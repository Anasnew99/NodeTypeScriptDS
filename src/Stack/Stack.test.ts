import Stack from "./Stack";

describe('Stack', () => {
  describe('Basic Operations', () => {
    test('should create a stack', () => {
      const stack = new Stack<number>();
      expect(stack.getSize()).toBe(0);
    });
    test('should push a value to the stack', () => {
      const stack = new Stack<number>();
      stack.push(1);
      expect(stack.getSize()).toBe(1);
      expect(stack.peek(0)).toBe(1);
    });
    test('should pop a value from the stack', () => {
      const stack = new Stack<number>();
      stack.push(1);
      expect(stack.pop()).toBe(1);
    });
    test('should peek a value from the stack', () => {
      const stack = new Stack<number>();
      stack.push(1);
      stack.push(2);
      expect(stack.peek(0)).toBe(2);
      expect(stack.peek(1)).toBe(1);
    });
    test('should check if the stack is empty', () => {
      const stack = new Stack<number>();
      expect(stack.isEmpty()).toBe(true);
    });
    test('should check if the stack is full', () => {
      const stack = new Stack<number>(1);
      stack.push(1);
      expect(stack.isFull()).toBe(true);
    });
    test('should get the stack top', () => {
      const stack = new Stack<number>();
      stack.push(1);
      expect(stack.stackTop()).toBe(1);
    }),
    test('should get the stack bottom', () => {
      const stack = new Stack<number>();
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.push(4);
      stack.push(5);
      stack.push(6);
      stack.push(7);
      stack.push(8);
      stack.push(9);
      stack.push(10);
      expect(stack.getSize()).toBe(10);
      expect(stack.stackBottom()).toBe(1);
    });
  });
  describe('Edge Cases', () => {
    test('should throw an error if the stack is full', () => {
      const stack = new Stack<number>(1);
      stack.push(1);
      expect(stack.isFull()).toBe(true);
      expect(() => stack.push(2)).toThrow('Stack is full');
    }),
    test('should throw an error if the stack is empty', () => {
      const stack = new Stack<number>();
      expect(() => stack.pop()).toThrow('Stack is empty');
    })
   
  });
});