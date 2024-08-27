// Converting infix to postfix
function infixToPostfix(infixExpr) {
    // Removing any whitespace in the infix expression
    const expr = infixExpr.replace(/\s+/g, '');
    
    // Constant for precedence
    const precedence = {
        '^': 3,
        '/': 2,
        '*': 2,
        '+': 1,
        '-': 1
    }

    const isOperator = (char) => ['+', '-', '*', '/', '^'].includes(char);
    const isOperand = (char) => /\d+/.test(char);

    let output = [];
    let operatorStack = [];

    for(let i=0; i < expr.length; i++) {
        let char = expr[i];

        if(isOperand(char)) {
            let num = char; 

            while(i+1 < expr.length && isOperand(expr[i+1])) {
                num += expr[++i];
            }

            output.push(num);
        }
        else if(isOperator(char)) {
            while (
                operatorStack && 
                precedence[char] <= precedence[operatorStack[operatorStack.length - 1]]
            ) {
                output.push(operatorStack.pop());
            }
            operatorStack.push(char);
        } else if(char == '(') {
            operatorStack.push(char);
        } else if(char == ')') {
            while(
                operatorStack.length &&
                operatorStack[operatorStack.length - 1] !== '('
            ) {
                output.push(operatorStack.pop());
            }
            operatorStack.pop();
        }
    }

    while(operatorStack.length) {
        output.push(operatorStack.pop());
    }

    return output;
}

// Function for evaluating postfix and carrying out arithmetic
function evaluatePostfix(postfix) {
    const stack = [];
    let divideByZero = false; 

    for(let char of postfix) {
        if(/[0-9]/.test(char)) {
            stack.push(Number(char));
        } else {
            const b = stack.pop();
            const a = stack.pop();

            switch(char) {
                case '+':
                    stack.push(a+b);
                    break;
                case '-':
                    stack.push(a-b);
                    break;
                case '*':
                    stack.push(a*b);
                    break;
                case '/':
                    if(b==0) {
                        divideByZero = true;
                        break;
                    }
                    else {
                        stack.push(a/b)
                        break;
                    }
                default:
                    break;
            }
        }
    }

    if(divideByZero) {
        return "Math error"
    }
    else {
        return stack.pop().toString();
    }
}   

// Function for evaluating infix
function calcInfix(expr) {
    let postfix = infixToPostfix(expr);
    let result = evaluatePostfix(postfix);

    return result; 
}

// Exporting both these functions
export { infixToPostfix, evaluatePostfix, calcInfix };