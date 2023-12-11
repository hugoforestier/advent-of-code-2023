import { readFileSync } from "fs";
import { tmpdir } from "os";

const data = readFileSync('inputs/day5/input-2', 'utf8');

const seeds = data.split('\n')[0].split(':')[1].split(' ').filter((x) => x.length > 0);

var best = 0;

// Sue me
const seedToSoil = data.split('seed-to-soil map:')[1].split('soil-to-fertilizer map:')[0].split('\n').filter((c) => c.length > 0).map((x) => x.split(' '));
const soilToFertilizer = data.split('soil-to-fertilizer map:')[1].split('fertilizer-to-water map:')[0].split('\n').filter((c) => c.length > 0).map((x) => x.split(' '));
const fertilizerToWater = data.split('fertilizer-to-water map:')[1].split('water-to-light map:')[0].split('\n').filter((c) => c.length > 0).map((x) => x.split(' '));
const waterToLight = data.split('water-to-light map:')[1].split('light-to-temperature map:')[0].split('\n').filter((c) => c.length > 0).map((x) => x.split(' '));
const lightToTemperature = data.split('light-to-temperature map:')[1].split('temperature-to-humidity map:')[0].split('\n').filter((c) => c.length > 0).map((x) => x.split(' '));
const temperatureToHumidity = data.split('temperature-to-humidity map:')[1].split('humidity-to-location map:')[0].split('\n').filter((c) => c.length > 0).map((x) => x.split(' '));
const humidityToLocation = data.split('humidity-to-location map:')[1].split('\n').filter((c) => c.length > 0).map((x) => x.split(' '));

function compare(dest: number, source: number, offset: number, myNumber: number): number {
    if (myNumber >= source && myNumber <= source + offset) {
        return (myNumber - source) + dest;
    } else {
        return myNumber;
    }
}

function engine(maps: string[][], seed: number) {
    for (const range of maps) {
        const tmp = compare(parseInt(range[0]), parseInt(range[1]), parseInt(range[2]), seed);
        if (tmp != seed) {
            seed = tmp;
            break;
        }
    }
    return seed;
}

console.log(seeds);

for (let i = 0; i < seeds.length; i+=2) {
    console.log(i);
    for (let seed = parseInt(seeds[i]); seed < (parseInt(seeds[i]) + parseInt(seeds[i + 1])); seed++) {
        if (seed > (parseInt(seeds[i]) + parseInt(seeds[i + 1]))) {
            console.log("DLJFLKSDJFKLDJF");
            process.exit();
        }
        const tmpSeed = seed;
        seed = engine(seedToSoil, seed);
        seed = engine(soilToFertilizer, seed);
        seed = engine(fertilizerToWater, seed);
        seed = engine(waterToLight, seed);
        seed = engine(lightToTemperature, seed);
        seed = engine(temperatureToHumidity, seed);
        seed = engine(humidityToLocation, seed);
        if (best == 0 || seed < best) {
            best = seed;
            console.log(best);
        }
        seed = tmpSeed;
        console.log(seed, (parseInt(seeds[i]) + parseInt(seeds[i + 1])));
    }
}

console.log(best);
