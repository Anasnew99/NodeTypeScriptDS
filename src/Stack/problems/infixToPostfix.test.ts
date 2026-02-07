import { infixToPostfix } from "./infixToPostfix";

describe('infixToPostfix', () => {
  describe('Simple Expressions', () => {
    test('should convert simple addition', () => {
      expect(infixToPostfix("a+b")).toBe("_a__b_+");
    });

    test('should convert simple subtraction', () => {
      expect(infixToPostfix("a-b")).toBe("_a__b_-");
    });

    test('should convert simple multiplication', () => {
      expect(infixToPostfix("a*b")).toBe("_a__b_*");
    });

    test('should convert simple division', () => {
      expect(infixToPostfix("a/b")).toBe("_a__b_/");
    });

    test('should convert simple exponentiation', () => {
      expect(infixToPostfix("a^b")).toBe("_a__b_^");
    });
  });

  describe('Operator Precedence', () => {
    test('should handle multiplication before addition', () => {
      expect(infixToPostfix("a+b*c")).toBe("_a__b__c_*+");
    });

    test('should handle division before addition', () => {
      expect(infixToPostfix("a+b/c")).toBe("_a__b__c_/+");
    });

    test('should handle multiplication before subtraction', () => {
      expect(infixToPostfix("a-b*c")).toBe("_a__b__c_*-");
    });

    test('should handle exponentiation before multiplication', () => {
      expect(infixToPostfix("a*b^c")).toBe("_a__b__c_^*");
    });

    test('should handle multiple operators with different precedence', () => {
      expect(infixToPostfix("a+b*c-d")).toBe("_a__b__c_*+_d_-");
    });
  });

  describe('Parentheses', () => {
    test('should handle simple parentheses', () => {
      expect(infixToPostfix("(a+b)")).toBe("_a__b_+");
    });

    test('should handle parentheses changing precedence', () => {
      expect(infixToPostfix("(a+b)*c")).toBe("_a__b_+_c_*");
    });

    test('should handle nested parentheses', () => {
      expect(infixToPostfix("((a+b))")).toBe("_a__b_+");
    });

    test('should handle multiple parentheses', () => {
      expect(infixToPostfix("(a+b)*(c-d)")).toBe("_a__b_+_c__d_-*");
    });

    test('should handle complex nested parentheses', () => {
      expect(infixToPostfix("((a+b)*c)-d")).toBe("_a__b_+_c_*_d_-");
    });
  });

  describe('Multi-character Operands', () => {
    test('should handle multi-character variable names', () => {
      expect(infixToPostfix("abc+def")).toBe("_abc__def_+");
    });

    test('should handle long variable names', () => {
      expect(infixToPostfix("variable1+variable2")).toBe("_variable1__variable2_+");
    });

    test('should handle mixed single and multi-character operands', () => {
      expect(infixToPostfix("a+bc*d")).toBe("_a__bc__d_*+");
    });
  });

  describe('Operator Associativity', () => {
    test('should handle left-associative operators (addition)', () => {
      expect(infixToPostfix("a+b+c")).toBe("_a__b_+_c_+");
    });

    test('should handle left-associative operators (subtraction)', () => {
      expect(infixToPostfix("a-b-c")).toBe("_a__b_-_c_-");
    });

    test('should handle left-associative operators (multiplication)', () => {
      expect(infixToPostfix("a*b*c")).toBe("_a__b_*_c_*");
    });

    test('should handle right-associative operators (exponentiation)', () => {
      expect(infixToPostfix("a^b^c")).toBe("_a__b__c_^^");
    });
  });

  describe('Complex Expressions', () => {
    test('should handle complex expression with all operators', () => {
      expect(infixToPostfix("a+b*c-d/e")).toBe("_a__b__c_*+_d__e_/-");
    });

    test('should handle expression with exponentiation and other operators', () => {
      expect(infixToPostfix("a^b+c*d")).toBe("_a__b_^_c__d_*+");
    });

    test('should handle deeply nested expression', () => {
      expect(infixToPostfix("((a+b)^c)-d*e")).toBe("_a__b_+_c_^_d__e_*-");
    });

    test('should handle expression from example', () => {
      expect(infixToPostfix("((a+b)^anas)-c*d")).toBe("_a__b_+_anas_^_c__d_*-");
    });
  });

  describe('Edge Cases', () => {
    test('should handle single operand', () => {
      expect(infixToPostfix("a")).toBe("_a_");
    });

    test('should handle expression with only parentheses and operand', () => {
      expect(infixToPostfix("(a)")).toBe("_a_");
    });

    test('should handle multiple consecutive operators with parentheses', () => {
      expect(infixToPostfix("(a+b)*(c+d)")).toBe("_a__b_+_c__d_+*");
    });
  });
});

