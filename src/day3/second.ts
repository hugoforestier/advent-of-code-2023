import { access, readFileSync } from 'fs';

const data = readFileSync('./inputs/day3/input-2', 'utf8').split('\n').map(x => x.split('')).filter(x => x.length > 0);

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

function getAsterixPos(char: string | undefined, [y, x]: any) {
    if (char == '*') {
        return [y, x]
    } else {
        [0, 0];
    }
}

function isAsterix(char: string | undefined) {
    return char == '*';
}

let validated: boolean = false;
let isNumber = false;
let digitToAdd = '';
let asterixPos: any[] = [];
let toBeVerified: any[] = [];
for (let y = 0; y < data.length; y++) {
    digitToAdd = '';
    for (let x = 0; x < data[y].length; x++) {
        isNumber = isCharNumber(get(y, x, [0, 0]));
        if (isNumber) {
            digitToAdd += get(y, x, [0, 0]);
        }
        if (isNumber && !validated) {
            const toAdd = dirs.reduce((acc, [dy, dx]) => {
                return acc || !isCharNumber(get(y, x, [dy, dx]))
                && !isDot(get(y, x, [dy, dx]))
                && get(y, x, [dy, dx]) !== undefined && isAsterix(get(y, x, [dy, dx]));
            }, false);
            if (toAdd) {
                asterixPos = dirs.reduce((acc, [dy, dx]) => {
                    let asterixPos = getAsterixPos(get(y, x, [dy, dx]), [y + dy, x + dx]);
                    if (asterixPos !== undefined) {
                        return asterixPos;
                    } else {
                        return acc;
                    }
                }, [0, 0]);
                validated = true;
            }
        }
        if ((!isNumber && validated == true) || (validated == true && (x + 1) == data[y].length)) {
            toBeVerified.push([digitToAdd, asterixPos]);
            validated = false;
        }
        if (!isNumber) {
            digitToAdd = '';
        }
    }
}

const occurences = toBeVerified.map((x) => x[1]).reduce((acc, curr) => {
    return acc[curr] ? ++acc[curr]: acc[curr] = 1, acc
}, []);

for (let i = 0; i != toBeVerified.length - 1; i++) {
    if (toBeVerified[i][1][0] == toBeVerified[i + 1][1][0]
        && toBeVerified[i][1][1] == toBeVerified[i + 1][1][1]) {
        const key = toBeVerified[i][1][0] + ',' + toBeVerified[i][1][1];
        if (occurences[key] == 2) {
            total = total + (parseInt(toBeVerified[i][0]) * parseInt(toBeVerified[i + 1][0]))
        }
    }
}
console.log("total is:", total);
