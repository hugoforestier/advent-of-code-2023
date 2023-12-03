import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day3/input-1', 'utf8').split('\n').map(x => x.split('')).filter(x => x.length > 0);

var total = 0;

function isCharNumber(char: string | undefined) {
    if (char === undefined)
        return false;
    return !isNaN(parseInt(char));
}

function isDot(char: string | undefined) {
    return char == '.';
}

const dirs = [
    [-1, 0], [-1, -1], [0, -1],
    [1, -1], [1, 0], [1, 1],
    [0, 1], [-1, 1]
]

function get(y: number, x: number, [dx, dy]: any) {
    const blob = data[y + dx];
    if (blob == undefined) {
        return undefined;
    }
    return blob[x + dy];
}

let validated: boolean = false;
let isNumber = false;
let digitToAdd = '';
for(let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        isNumber = isCharNumber(get(y, x, [0, 0]));
        if (isNumber) {
            digitToAdd += get(y, x, [0, 0]);
        }
        if (isNumber && !validated) {
            const toAdd = dirs.reduce((acc, [dy, dx]) => {
               return acc || !isCharNumber(get(y, x, [dy, dx])) && !isDot(get(y, x, [dy, dx])) && get(y, x, [dy, dx]) !== undefined;
            }, false);
            if (toAdd) {
                validated = true;
            }
        }
        if (!isNumber && validated == true) {
            console.log(digitToAdd)
            total = total + parseInt(digitToAdd);
            validated = false;
        }
        if (!isNumber) {
            digitToAdd = '';
        }
    }
}

console.log("total is:", total);
