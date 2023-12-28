import { readFileSync } from "fs";

const data = readFileSync('inputs/day6/input-2', 'utf8');

const times = data.split("Time:")[1].split("\n")[0].split(' ').filter((x) => x.length > 0);
const distances = data.split("Distance:")[1].split('\n')[0].split(' ').filter((x) => x.length > 0);

let time: string = '';
let distance: string = '';

times.forEach((t, i) => {
    time = time + t;
    distance = distance + distances[i];
});


console.log(time, distance);
let count_winning_ways = 0;
for (let h = 0; h < parseInt(time); h++) {
    if ((h * (parseInt(time) - h)) > parseInt(distance)) {
        count_winning_ways++;
    }
}
console.log(count_winning_ways);
