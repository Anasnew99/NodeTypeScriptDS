import { infixToPostfix } from "../Stack/problems/infixToPostfix";
import Stack from "../Stack/Stack";

export class ExpressionEvaluator {
    private expression: string = '';
    private postfix: string = '';

    constructor(expression: string) {
        this.setExpression(expression);
    }

    private getOperandFromPostfix(expression: string, pos: number) {
        if (expression[pos].startsWith('_')) {
            for (let i = pos + 1; i < expression.length; i++) {
                if (expression[i] === "_")
                    return ({
                        operand: expression.slice(pos + 1, i),
                        newpos: i + 1
                    });
            }
        } else {
            return null;
        }
    }
    private evaluate(op1: number, op2: number, operator: string){
        switch(operator){
            case "*": return op1*op2;
            case "-": return op2 - op1;
            case "^": return Math.pow(op2, op1);
            case "+": return op1+op2;
            case "/": return op2/op1;
            default: throw new Error(`Invalid operator: ${operator}`);
        }
    }
    private isAVariable(v: string){
        return !/^[0-9]/.test(v);
    }
    private evaluatePostfix(string: string, variables: Record<string, number>) {
        const stack:Stack<string> = new Stack();
        for (let i = 0; i < this.postfix.length; i++) {
            const operand = this.getOperandFromPostfix(string, i)
            if(operand){
                i = operand.newpos - 1;
                stack.push(operand.operand);
            }else{
                const a = stack.pop();
                const b = stack.pop();
                if(!a || !b){
                    throw new Error(`Missing operands for ${string[i]}`);
                }
                if(this.isAVariable(a) && !(a in variables)){
                    throw new Error(`No vairable defined for "${a}"`);
                }else if(Number.isNaN(a)){
                    throw new Error(`Not a numeric value: "${a}"`);
                }
                if(this.isAVariable(b) && !(b in variables)){
                    throw new Error(`No vairable defined for "${b}"`);
                }else if(Number.isNaN(b)) {
                    throw new Error(`Not a numeric value: "${b}"`);
                }
                const numa = this.isAVariable(a) ? Number(variables[a]) : Number(a);
                const numb = this.isAVariable(b) ? Number(variables[b]) : Number(b);
                stack.push(String(this.evaluate(numa, numb, string[i])));
            }
        }
        if(stack.getSize() === 1){
            return Number(stack.pop());
        }else{
            throw new Error("Invalid expression");
        }
    }

    public setExpression(expression: string) {
        this.expression = expression;
        this.postfix = infixToPostfix(expression);
    }

    public getExpression() {
        return this.expression;
    }

    public getPostfix() {
        return this.postfix;
    }

    public evaluateExpression(variables: Record<string, number> = {}) {
        if (!this.expression) {
            throw new Error("Unable to evaluate expression. Expression is empty");
        }
        return this.evaluatePostfix(this.postfix, variables);
    }
}
