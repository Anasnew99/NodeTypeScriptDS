import { ExpressionEvaluator } from "./ExpressionEvaluator";

describe('ExpressionEvaluator', () => {
  describe('Constructor and Basic Operations', () => {
    test('should create an ExpressionEvaluator with an expression', () => {
      const evaluator = new ExpressionEvaluator("a+b");
      expect(evaluator.getExpression()).toBe("a+b");
      expect(evaluator.getPostfix()).toBeDefined();
    });

    test('should set and get expression', () => {
      const evaluator = new ExpressionEvaluator("a+b");
      evaluator.setExpression("x*y");
      expect(evaluator.getExpression()).toBe("x*y");
    });

    test('should get postfix notation', () => {
      const evaluator = new ExpressionEvaluator("a+b");
      const postfix = evaluator.getPostfix();
      expect(postfix).toBeDefined();
      expect(typeof postfix).toBe('string');
    });
  });

  describe('Expression Evaluation - Simple Operations', () => {
    test('should evaluate simple addition', () => {
      const evaluator = new ExpressionEvaluator("2+3");
      expect(evaluator.evaluateExpression()).toBe(5);
    });

    test('should evaluate simple subtraction', () => {
      const evaluator = new ExpressionEvaluator("5-2");
      expect(evaluator.evaluateExpression()).toBe(3);
    });

    test('should evaluate simple multiplication', () => {
      const evaluator = new ExpressionEvaluator("4*3");
      expect(evaluator.evaluateExpression()).toBe(12);
    });

    test('should evaluate simple division', () => {
      const evaluator = new ExpressionEvaluator("10/2");
      expect(evaluator.evaluateExpression()).toBe(5);
    });

    test('should evaluate exponentiation', () => {
      const evaluator = new ExpressionEvaluator("2^3");
      expect(evaluator.evaluateExpression()).toBe(8);
    });
  });

  describe('Expression Evaluation - Complex Operations', () => {
    test('should evaluate expression with multiple operations', () => {
      const evaluator = new ExpressionEvaluator("2+3*4");
      expect(evaluator.evaluateExpression()).toBe(14);
    });

    test('should evaluate expression with parentheses', () => {
      const evaluator = new ExpressionEvaluator("(2+3)*4");
      expect(evaluator.evaluateExpression()).toBe(20);
    });

    test('should evaluate nested parentheses', () => {
      const evaluator = new ExpressionEvaluator("((2+3)*4)-1");
      expect(evaluator.evaluateExpression()).toBe(19);
    });

    test('should evaluate expression with exponentiation and other operations', () => {
      const evaluator = new ExpressionEvaluator("2^3+1");
      expect(evaluator.evaluateExpression()).toBe(9);
    });
  });

  describe('Expression Evaluation - With Variables', () => {
    test('should evaluate expression with single variable', () => {
      const evaluator = new ExpressionEvaluator("a+5");
      expect(evaluator.evaluateExpression({ a: 3 })).toBe(8);
    });

    test('should evaluate expression with multiple variables', () => {
      const evaluator = new ExpressionEvaluator("a+b");
      expect(evaluator.evaluateExpression({ a: 5, b: 3 })).toBe(8);
    });

    test('should evaluate complex expression with variables', () => {
      const evaluator = new ExpressionEvaluator("a*b+c");
      expect(evaluator.evaluateExpression({ a: 2, b: 3, c: 4 })).toBe(10);
    });

    test('should evaluate expression with variables and parentheses', () => {
      const evaluator = new ExpressionEvaluator("(a+b)*c");
      expect(evaluator.evaluateExpression({ a: 2, b: 3, c: 4 })).toBe(20);
    });

    test('should evaluate expression with exponentiation and variables', () => {
      const evaluator = new ExpressionEvaluator("a^b");
      expect(evaluator.evaluateExpression({ a: 2, b: 3 })).toBe(8);
    });

    test('should evaluate expression with multi-character variable names', () => {
      const evaluator = new ExpressionEvaluator("x+y");
      expect(evaluator.evaluateExpression({ x: 10, y: 5 })).toBe(15);
    });
  });

  describe('Expression Evaluation - Edge Cases', () => {
    test('should handle negative results', () => {
      const evaluator = new ExpressionEvaluator("2-5");
      expect(evaluator.evaluateExpression()).toBe(-3);
    });

    test('should handle division resulting in decimal', () => {
      const evaluator = new ExpressionEvaluator("2/7");
      expect(evaluator.evaluateExpression()).toBeCloseTo(0.2857142857142857);
    });

    test('should handle zero in operations', () => {
      const evaluator = new ExpressionEvaluator("0+5");
      expect(evaluator.evaluateExpression()).toBe(5);
    });

    test('should handle one as exponent', () => {
      const evaluator = new ExpressionEvaluator("5^1");
      expect(evaluator.evaluateExpression()).toBe(5);
    });

    test('should handle zero as exponent', () => {
      const evaluator = new ExpressionEvaluator("5^0");
      expect(evaluator.evaluateExpression()).toBe(1);
    });
  });

  describe('Error Handling', () => {
    test('should throw error when expression is empty', () => {
      const evaluator = new ExpressionEvaluator("a+b");
      evaluator.setExpression("");
      expect(() => evaluator.evaluateExpression()).toThrow("Unable to evaluate expression. Expression is empty");
    });

    test('should throw error when variable is not defined', () => {
      const evaluator = new ExpressionEvaluator("a+b");
      expect(() => evaluator.evaluateExpression({ a: 5 })).toThrow(/No vairable defined for/);
    });

    test('should throw error when multiple variables are not defined', () => {
      const evaluator = new ExpressionEvaluator("a+b+c");
      expect(() => evaluator.evaluateExpression({ a: 5 })).toThrow(/No vairable defined for/);
    });

    test('should throw error for invalid expression format', () => {
      const evaluator = new ExpressionEvaluator("+");
      expect(() => evaluator.evaluateExpression()).toThrow();
    });

    test('should throw error when operands are missing', () => {
      const evaluator = new ExpressionEvaluator("*");
      // The stack throws "Stack is empty" before the missing operands check
      expect(() => evaluator.evaluateExpression()).toThrow("Stack is empty");
    });
  });

  describe('Expression Updates', () => {
    test('should update expression and recalculate postfix', () => {
      const evaluator = new ExpressionEvaluator("a+b");
      const initialPostfix = evaluator.getPostfix();
      
      evaluator.setExpression("x*y");
      const newPostfix = evaluator.getPostfix();
      
      expect(evaluator.getExpression()).toBe("x*y");
      expect(newPostfix).not.toBe(initialPostfix);
    });

    test('should evaluate new expression after update', () => {
      const evaluator = new ExpressionEvaluator("a+b");
      evaluator.setExpression("2*3");
      expect(evaluator.evaluateExpression()).toBe(6);
    });
  });
});

