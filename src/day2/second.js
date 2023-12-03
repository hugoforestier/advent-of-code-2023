const { readFileSync } = require('fs');

const data = readFileSync('./inputs/input-2-2', 'utf8');

var total = 0;

data.split('\n').forEach(line => {
    if (line.length == 0) {
        console.log("suck it empty line");
        return;
    }
    const gameInfo = line.split(':')[1].replaceAll(';','').replaceAll(',', '');
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;
    let even = false;
    let nbCubes = 0;
    gameInfo.split(' ').forEach(play => {
        if (play.length != 0) {
            if (!even) {
                nbCubes = Number(play);
                even = true;
            } else {
                if (play == 'red') {
                    if (nbCubes > minRed) {
                        minRed = nbCubes;
                    }
                }
                if (play == 'green') {
                    if (nbCubes > minGreen) {
                        minGreen = nbCubes;
                    }
                }
                if (play == 'blue') {
                    if (nbCubes > minBlue) {
                        minBlue = nbCubes;
                    }
                }
                even = false;
            }
        }
    });
    total = total + (minRed * minBlue * minGreen)
});

console.log('The total is:', total);
