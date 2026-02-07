import { Associativity, PRECEDENCE_ASSOCIATIVE } from "../../constants";
import Stack from "../Stack";
const precedenceMap = new Map<string, { in: number, out: number }>();
PRECEDENCE_ASSOCIATIVE.forEach((value, key) => {
    precedenceMap.set(
        key,
        {
            out: value.precedence,
            in: value.associativity === Associativity.RIGHT_LEFT ? value.precedence - .5 : value.precedence + .5
        }
    )
})
precedenceMap.set('(', { in: 0, out: 9999 });
precedenceMap.set(')', { in: -1, out: 0 }); // -1 indicates not applicable
function extractOperand(expression: string, pos: number) {
    if (precedenceMap.get(expression[pos]) != undefined) {
        return null;
    } else {
        let operandName = '';
        let j = pos;
        for (; j < expression.length; j++) {
            if (precedenceMap.get(expression[j])) {
                break;
            } else {
                operandName += expression[j];
            }
        }
        return (
            {
                operandName: `_${operandName}_`,
                newpos: j
            }
        )
    }
}

export const infixToPostfix = (expression: string) => {
    const stack = new Stack<string>();
    let result = "";

    for (let i = 0; i < expression.length;i++) {
        const operand = extractOperand(expression, i);
        if (operand) {
            result += operand.operandName;
            i = operand.newpos-1;
        } else {
            while (
                !stack.isEmpty() && 
                precedenceMap.get(stack.stackTop()) && 
                precedenceMap.get(expression[i]) &&
                precedenceMap.get(stack.stackTop())!.in >= precedenceMap.get(expression[i])!.out
            ) {
                if(precedenceMap.get(stack.stackTop())!.in == precedenceMap.get(expression[i])!.out){
                    stack.pop();
                    break;
                }
                result+=stack.pop();
                
            }
            if(expression[i] !== ")"){
                stack.push(expression[i]);
            }
        }
    }
    while(!stack.isEmpty()){
        result+=stack.pop();
    }

    return result;
}