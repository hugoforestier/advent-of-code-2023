import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day4/input-2-2', 'utf8').split('\n').filter(x => x.length > 0);

var total = 0;

var cardsToCopy: [number] = [0];

// please don't judge me
for (let i = 0; i != 1000000; i++) {
    cardsToCopy[i] = 0;
}

var cardBeingPlayed = 0;

for (const card of data) {
    const winningNumbers = card.split(':')[1].split('|')[0].split(' ').filter(x => x.length > 0);
    const numbersToCheck = card.split(':')[1].split('|')[1].split(' ').filter(x => x.length > 0);

    const totalFound = winningNumbers.reduce((acc, curr) => {
        return (numbersToCheck.includes(curr)) ? acc + 1: acc;
    }, 0)
    for (let i = cardBeingPlayed + 1; i <= cardBeingPlayed + totalFound; i++) {
        cardsToCopy[i] = cardsToCopy[i] + (cardsToCopy[cardBeingPlayed] + 1);
    }
    total = total + cardsToCopy[cardBeingPlayed] + 1;
    cardBeingPlayed++;
}

console.log("total is:", total);
