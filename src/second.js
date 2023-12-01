const { readFileSync } = require('fs');

const data = readFileSync('./inputs/input-1-1', 'utf8');

var total = 0;

numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

data.split('\n').forEach(line => {
    let firstNumber = -1;
    let secondNumber = -1;
    line = numbers.reduce(function(prev, current, index) {
        return prev.replaceAll(current, current[0] + (1 + index) + current[current.length - 1]);
    }, line)
    line = numbers.reduce(function(prev, current, index) {
        return prev.replaceAll(current, 1 + index);
    }, line)
    for (const c of line) {
        if (c >= '0' && c <= '9') {
            if (firstNumber == -1) {
                firstNumber = c;
            } else {
                secondNumber = c
            }
        }
    }
    if (firstNumber == -1)
        console.log('suck it empty line');
    else if (secondNumber == -1) {
        total += Number(firstNumber + firstNumber);
    } else {
        total = total + Number(firstNumber + secondNumber);
    }
})

console.log("total is:", total);
