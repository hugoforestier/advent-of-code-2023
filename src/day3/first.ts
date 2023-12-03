import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day3/input-1', 'utf8');

var total = 0;

var values: Array<string> = [];

data.split('\n').forEach((line: string) => {
    if (line.length != 0) {
        values.push(line);
    }
})

let validated: boolean = false;
for(let y = 0; y != values.length; y++) {
    for (let x = 0; x != values[y].length; x++) {
        if (values[y][x] >= '0' && values[y][x] <= '9') {
            if (x != 0) {
                if (values[y][x - 1] != '.' && (values[y][x - 1] < '0' || values[y][x - 1] > '9')) {
                    validated = true;
                }
            }
            if (x != 0 && y != 0) {
                if (values[y - 1][x - 1] != '.' && (values[y - 1][x - 1] < '0' || values[y - 1][x - 1] > '9')) {
                    validated = true;
                }
            }
            if (y != 0) {
                if (values[y - 1][x] != '.' && (values[y - 1][x] < '0' || values[y - 1][x] > '9')) {
                    validated = true;
                }
            }
            if (y + 1 != values.length) {
                if (values[y + 1][x] != '.' && (values[y + 1][x] < '0' || values[y + 1][x] > '9')) {
                    validated = true;
                }
            }
            if (y + 1 != values.length && x != 0) {
                if (values[y + 1][x - 1] != '.' && (values[y + 1][x - 1] < '0' || values[y + 1][x - 1] > '9')) {
                    validated = true;
                }
            }
            if (x != values[y].length) {
                if (values[y][x + 1] != '.' && (values[y][x + 1] < '0' || values[y][x + 1] > '9')) {
                    validated = true;
                }
            }
            if (x != values[y].length && y != 0) {
                if (values[y - 1][x + 1] != '.' && (values[y - 1][x + 1] < '0' || values[y - 1][x + 1] > '9')) {
                    validated = true;
                }
            }
            if (x != values[y].length && ((y + 1) != values.length)) {
                if (values[y + 1][x + 1] != '.' && (values[y + 1][x + 1] < '0' || values[y + 1][x + 1] > '9')) {
                    validated = true;
                }
            }
        } else {
            if (x != 0) {
                if (validated == true) {
                    let tmp = x;
                    let tmpNumber: string = '';
                    if (values[y][x - 1] >= '0' && values[y][x - 1] <= '9') {
                        tmp--;
                    }
                    for (; tmp != -1 && values[y][tmp] >= '0' && values[y][tmp] <= '9'; tmp--);
                    tmp++;
                    for (; tmp != values[y].length && values[y][tmp] >= '0' && values[y][tmp] <= '9'; tmp++) {
                        tmpNumber+=values[y][tmp];
                    }
                    total = total + Number(tmpNumber);
                    validated = false;
                }
            }
            if (validated == true && x == 0 && y != 0) {
                let tmp = values[y].length - 1;
                let tmpNumber: string = '';
                if (values[y - 1][tmp] >= '0' && values[y - 1][tmp] <= '9') {
                    tmp--;
                }
                for (; tmp != -1 && values[y - 1][tmp] >= '0' && values[y - 1][tmp] <= '9'; tmp--);
                tmp++;
                for (; tmp != values[y - 1].length && values[y - 1][tmp] >= '0' && values[y - 1][tmp] <= '9'; tmp++) {
                    tmpNumber+=values[y - 1][tmp];
                }
                total = total + Number(tmpNumber);
                validated = false;
            }
        }
    }
}

console.log("total is:", total);
