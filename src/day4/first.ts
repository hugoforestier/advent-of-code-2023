import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day4/input-1-1', 'utf8').split('\n').filter(x => x.length > 0);

var total = 0;

for (const card of data) {
    const winningNumbers = card.split(':')[1].split('|')[0].split(' ').filter(x => x.length > 0);
    const numbersToCheck = card.split(':')[1].split('|')[1].split(' ').filter(x => x.length > 0);

    const totalFound = winningNumbers.reduce((acc, curr) => {
        return (numbersToCheck.includes(curr)) ? acc + 1: acc;
    }, 0)
    let totalToAdd = 0;
    for (let i = 0; i != totalFound; i++) {
        if (totalToAdd == 0) {
            totalToAdd++;
        } else {
            totalToAdd = totalToAdd * 2;
        }
    }
    total = total + totalToAdd;
}

console.log("total is:", total);
