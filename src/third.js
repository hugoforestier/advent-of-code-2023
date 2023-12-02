const { readFileSync } = require('fs');

const data = readFileSync('./inputs/input-2-1', 'utf8');

var total = 0;

data.split('\n').forEach(line => {
    if (line.length == 0) {
        console.log("suck it empty line");
        return;
    }
    const gameInfo = line.split(':')[1].replaceAll(';','').replaceAll(',', '');
    let possible = true;
    let even = false;
    let nbCubes = 0;
    gameInfo.split(' ').forEach(play => {
        if (play.length != 0) {
            if (!even) {
                nbCubes = Number(play);
                even = true;
            } else {
                if (play == 'red' && Number(nbCubes) > 12) {
                    possible = false;
                }
                if (play == 'green' && Number(nbCubes) > 13) {
                    possible = false;
                }
                if (play == 'blue' && Number(nbCubes) > 14) {
                    possible = false;
                }
                even = false;
            }
        }
    });
    if (possible) {
        total = total + Number(line.split(':')[0].split(' ')[1]);
    }
});

console.log('The total is:', total);
