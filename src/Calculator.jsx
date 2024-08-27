import { useState } from 'react';
import { calcInfix } from './infixToPostfix';
import './App.css'

function Button({ val, onClick, status = 'num'}) {
    if(status == 'C') {
        return (
            <button className="square-red" onClick={()=>onClick(val)}> 
                {val}
            </button>
        )
    }
    else {
        return (
            <button className="square" onClick={()=>onClick(val)}> 
                {val}
            </button>
        )
    }
}


export default function Calculator() {
    const [numScreenVal, setNumScreen] = useState('');

    const onClickSetValue = (value) => {
        const isOperator = (char) => ['+', '-', '*', '/'].includes(char);   // Checks if operator is present
        const hasOperator = (expr) => /[+\-*/]/.test(expr);
        
        if(value == 'C') {
            setNumScreen('');
        } 
        else if(value == '=') { 
            // Carries out the calculation if and only if the expression has operator in it
            if(hasOperator(numScreenVal)) {
                let result = calcInfix(numScreenVal);
                setNumScreen(result);
            }
            else {
                setNumScreen(numScreenVal);
            }
        }
        else if(numScreenVal == '' && isOperator(value)) {
            // If operator pressed in empty screen
            setNumScreen('');
        }
        else if(isOperator(value) && isOperator(numScreenVal[numScreenVal.length - 1]) ) {
            // If two operators pressed at the same time
            setNumScreen(numScreenVal);
        }
        else {
            setNumScreen(numScreenVal+value);
        }
    }

    return(
        <> 
            <div className="board-row">
                <div className="num-screen">
                    {numScreenVal}
                </div>
            </div>
            <div className="board-row">
                <Button val="1" onClick={onClickSetValue} />
                <Button val="2" onClick={onClickSetValue} />
                <Button val="3" onClick={onClickSetValue} />
                <Button val="/" onClick={onClickSetValue} />
            </div>
            <div className="board-row">
                <Button val="4" onClick={onClickSetValue} />
                <Button val="5" onClick={onClickSetValue} />
                <Button val="6" onClick={onClickSetValue} />
                <Button val="*" onClick={onClickSetValue}/>
            </div>
            <div className="board-row">
                <Button val="7" onClick={onClickSetValue} />
                <Button val="8" onClick={onClickSetValue} />
                <Button val="9" onClick={onClickSetValue} />
                <Button val="+" onClick={onClickSetValue} />
            </div>
            <div className="board-row">
                <Button val="C" onClick={onClickSetValue} status='C'/>
                <Button val="0" onClick={onClickSetValue} />
                <Button val="=" onClick={onClickSetValue} />
                <Button val="-" onClick={onClickSetValue} />
            </div>

        </>
    )
}