import Stack from "../Stack";

/**
 * Check if the paranthesis in the expression are matching
 * @param expression string - The expression to check, only () are allowed (on other characters, the function will throw an error)
 * @returns boolean - true if the paranthesis are matching, false otherwise
 */
export const paranthesisMatching = (expression: string) => {
    const stack = new Stack<string>();
    for(let i=0;i<expression.length;i++){
        const char = expression[i];
        if(char ==='('){
            stack.push(char);
        }else if(char ===')'){
            if(stack.isEmpty()){
                return false;
            }
            stack.pop();
        }else{
            throw new Error(`Invalid character: ${char}`);
        }
    }
    return stack.isEmpty();
}

export const paranthesisMatchingAdvanced = (expression: string) => {
    const stack = new Stack<string>();
    for(let i=0;i<expression.length;i++){
        const char = expression[i];
        if(char ==='(' || char==='{' || char === '['){
            stack.push(char);
        }else if(char ===')' || char==='}' || char ===']'){
            if(stack.isEmpty()){
                return false;
            }
            const poppedChar = stack.pop();
            const diff = char.charCodeAt(0)-poppedChar.charCodeAt(0);

            if( !(diff <= 2 && diff>=1)){
                return false;
            }
        }
    }
    return stack.isEmpty();
}