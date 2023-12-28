import { readFileSync } from "fs";

const data = readFileSync('inputs/day6/input-1', 'utf8');

const times = data.split("Time:")[1].split("\n")[0].split(' ').filter((x) => x.length > 0);
const distances = data.split("Distance:")[1].split('\n')[0].split(' ').filter((x) => x.length > 0);

let best = 1;

times.forEach((time, i) => {
    let count_winning_ways = 0;
    for (let h = 0; h < parseInt(time); h++) {
        if ((h * (parseInt(time) - h)) > parseInt(distances[i])) {
            count_winning_ways++;
        }
    }
    best = best * count_winning_ways;
});

console.log(best);
