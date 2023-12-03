import { readFileSync } from 'fs';

const data = readFileSync('./inputs/input-1-1', 'utf8');

var total = 0;

data.split('\n').forEach((line: string) => {
    let firstNumber: number = -1;
    let secondNumber: number = -1;
    for (const c of line) {
        if (c >= '0' && c <= '9') {
            if (firstNumber == -1) {
                firstNumber = Number(c);
            } else {
                secondNumber = Number(c);
            }
        }
    }
    if (line.length == 0) {
        console.log('suck it empty line');
        return;
    }
    if (secondNumber == -1) {
        total+=Number(String(firstNumber).concat(String(firstNumber)));
    } else {
        total = total + Number(String(firstNumber).concat(String(secondNumber)));
    }
})

console.log("total is:", total);
