const { readFileSync } = require('fs');

const data = readFileSync('./inputs/input-1-1', 'utf8');

var total = 0;

data.split('\n').forEach(line => {
    let firstNumber = -1;
    let secondNumber = -1;
    for (const c of line) {
        if (c >= '0' && c <= '9') {
            if (firstNumber == -1) {
                firstNumber = c;
            } else {
                secondNumber = c
            }
        }
    }
    if (secondNumber == -1) {
        total+=Number(firstNumber+firstNumber);
    } else {
        total = total + Number(firstNumber + secondNumber);
    }
})

console.log("total is:", total);
