let runningTotal = 0; // tracks the current total value
let buffer = "0"; //stores the current input value as a string
let previousOperator; //stores the previous math operator pressed by the user
let bufferHasDecimal = false;

const screen = document.querySelector(".screen");

//This function takes a value argument and checks if it is a number or a symbol
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}
// this unction takes a symbol argument and performs different actions based on the symbol pressed by the user
function handleSymbol(symbol){
    switch(symbol){
        case "C":
            buffer = "0";
            runningTotal = 0;
            bufferHasDecimal = false;
            break;
        case "=":
            if(previousOperator === null){
                return
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            bufferHasDecimal = false;
            break;
        case "←":
            if(buffer.length === 1){
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            if (buffer.indexOf(".") === -1) {
                bufferHasDecimal = false;
            }
            break;
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;
        case ",":
            if (bufferHasDecimal === false) {
                buffer += ".";
                bufferHasDecimal = true;
            }
            break;
    }
}
//function takes a symbol argument and performs different actions based on the operator pressed by the user
function handleMath(symbol){
    if(buffer === "0"){
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if(runningTotal === 0){
        runningTotal = floatBuffer;
    } else{
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
    bufferHasDecimal = false;
}

//this function takes an intBuffer argument and performs a mathematical operation on runningTotal and intBuffer based on the previous operator stored in previousOperator. It then updates runningTotal with the result of the operation.
function flushOperation(floatBuffer){
    if (previousOperator === "+"){
        runningTotal += floatBuffer;
    } else if(previousOperator === "−"){
        runningTotal -= floatBuffer;
    } else if(previousOperator === "×"){
        runningTotal *= floatBuffer
    } else if(previousOperator === "÷"){
        runningTotal /= floatBuffer;
    }
    runningTotal = parseFloat(runningTotal.toFixed(10)); // Round to 10 decimal places
}
//this function takes a numberString argument and updates the buffer variable with the input number. If buffer is already "0", it replaces it with numberString
function handleNumber (numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}
//This function adds an event listener to the calculator buttons and calls the buttonClick function with the button's inner text whenever a button is clicked
function init(){
    document.querySelector(".calc-buttons").addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    })
}

init();