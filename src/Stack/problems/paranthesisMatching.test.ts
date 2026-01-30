import { paranthesisMatching } from "./paranthesisMatching";
import { paranthesisMatchingAdvanced } from "./paranthesisMatching";

describe('Paranthesis Matching', () => {
    test('should return true if the paranthesis are matching', () => {
        expect(paranthesisMatching('((()))')).toBe(true);
    });
    test('should return false if the paranthesis are not matching', () => {
        expect(paranthesisMatching('(()')).toBe(false);
    });
    test('should throw an error if the expression contains invalid characters', () => {
        expect(() => paranthesisMatching('(a)')).toThrow('Invalid character: a');
    });
    test('should return true if the expression is empty', () => {
        expect(paranthesisMatching('')).toBe(true);
    });
    test('should return true if the expression has only one paranthesis', () => {
        expect(paranthesisMatching('(')).toBe(false);
    });
    test('should return true if the expression has only one paranthesis', () => {
        expect(paranthesisMatching(')')).toBe(false);
    });
    test('should return true if the expression has multiple paranthesis', () => {
        expect(paranthesisMatching('(())')).toBe(true);
    });
    test('should return true if the expression has multiple paranthesis', () => {
        expect(paranthesisMatching('(()())')).toBe(true);
    });
    test('should return true if the expression has multiple paranthesis', () => {
        expect(paranthesisMatching('((()))')).toBe(true);
    });
    test('should return true if the expression has multiple paranthesis', () => {
        expect(paranthesisMatching('((()))')).toBe(true);
    });
    test('should return true if the expression has multiple paranthesis', () => {
        expect(paranthesisMatching('((()))')).toBe(true);
    });
    test('should return true if the expression has multiple paranthesis', () => {
        expect(paranthesisMatching('((()))')).toBe(true);
    });
    test('should return true if the expression has multiple paranthesis', () => {
        expect(paranthesisMatching('((()))')).toBe(true);
    });
});

describe('Parantehsis Matching Advance', ()=>{
    test('should return true if the paranthesis are matching', () => {
        expect(paranthesisMatchingAdvanced('((()))')).toBe(true);
    });
    test('should return true if the paranthesis are matching', () => {
        expect(paranthesisMatchingAdvanced('[a+b+ (c+d)* {1,2}]')).toBe(true);
    });
    test('should return false if the paranthesis are not matching', () => {
        expect(paranthesisMatchingAdvanced('[a+b+ (c+d* {1,2}]')).toBe(false);
    });
})