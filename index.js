class Calculator {
    add(number1, number2) {
        return parseInt(number1) + parseInt(number2);
    }

    subtract(number1, number2) {
        return number1 - number2;
    }

    multiply(number1, number2) {
        return number1 * number2;
    }

    divide(number1, number2) {
        return number1 / number2;
    }

    operate(operator, number1, number2) {
        if (operator === '+') {
            return this.add(number1, number2);
        } else if (operator === '-') {
            return this.subtract(number1, number2);
        } else if (operator === '*') {
            return this.multiply(number1, number2);
        } else if (operator === '/') {
            return this.divide(number1, number2);
        }
    }
}

const calc = new Calculator();

const buttons = document.querySelectorAll('button');
const inputDisplay = document.querySelector('#input');
const outputDisplay = document.querySelector('#output');

let number1 = 0;
let number2 = 0;
const inputArray = [];
let output;

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const text = button.innerText;
        inputArray.push(getTextFromButton(text));

        if (getTextFromButton(text) === 'C') {
            reset();
        } else {
            if (getTextFromButton(text) === '=') {
                output = calc.operate(getOperator(inputArray), number1, number2);
            } else {
                if (checkNumber(text)) {
                    if (operandAfter(inputArray)) {
                        number2 = createNumber(number2, getTextFromButton(text));
                    } else {
                        number1 = createNumber(number1, getTextFromButton(text));
                    }
                }
            }
        }

        displayOnScreen();
    });
});

function displayOnScreen() {
    let inputToBeDisplayed = '';
    inputToBeDisplayed = number1;

    if (!(getOperator(inputArray) === '')) {
        inputToBeDisplayed = `${number1} ${getOperator(inputArray)}`;
    }

    if (number2 !== 0) {
        inputToBeDisplayed = `${number1} ${getOperator(inputArray)} ${number2}`;
    }
    inputDisplay.innerText = inputToBeDisplayed;

    if (typeof output === 'undefined') {
        outputDisplay.innerText = 0;
    } else {
        outputDisplay.innerText = output;
    }
}

function createNumber(original, addedNumber) {
    return original * 10 + addedNumber;
}

function checkNumber(text) {
    if (isNaN(parseInt(text))) return false;
    return true;
}

function getTextFromButton(text) {
    if (checkNumber(text)) return parseInt(text);
    return text;
}

function reset() {
    number1 = 0;
    number2 = 0;
    output = 0;
    inputArray.splice(0, inputArray.length);
    inputDisplay.innerText = '';
    outputDisplay.innerText = '';
}

function operandAfter(array) {
    if (
        array.includes('/') ||
        array.includes('*') ||
        array.includes('-') ||
        array.includes('+') ||
        array.includes('=')
    ) {
        return true;
    }
    return false;
}

function getOperator(array) {
    if (array.includes('/')) return '/';
    else if (array.includes('*')) return '*';
    else if (array.includes('-')) return '-';
    else if (array.includes('+')) return '+';
    return '';
}