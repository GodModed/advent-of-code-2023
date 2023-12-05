const fs = require('fs');
const input = fs.readFileSync('./day-5/input.txt', 'utf-8');

let lines = input.split('\n');
const seedLine = lines[0];

// remove first 2 lines
lines = lines.slice(2);
// merge all lines into one string

const maps = [];
let currentConverter = 0;
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.includes(':')) {
        maps[currentConverter] = [];
        currentConverter++;
        continue;
    }
    if (line.trim() == '') {
        continue;
    }
    line = line.trim().split(' ');
    const [destination, source, increment] = line;
    maps[currentConverter - 1].push({
        range: [parseInt(source), parseInt(increment)],
        destination: parseInt(destination)
    });
}

let lowestRangeLocation;
let lowestRangeArray = [];
let lowestNumber;

const cache = {};

const seedRanges = seedLine.split(':')[1].trim().split(' ');
for (let i = 0; i < seedRanges.length; i++) {
    const start = parseInt(seedRanges[i]);
    const end = parseInt(seedRanges[++i]);
    const goto = start + end - 1;
    const endLocation = getLocation(goto);
    if (!lowestRangeLocation || endLocation < lowestRangeLocation) {
        lowestRangeLocation = endLocation;
        lowestRangeArray = [start, goto];
    }
}

console.log(lowestRangeArray);

// split lowestRangeArray every 10000 numbers
const splitRanges = [];
let lastRange = lowestRangeArray[0];

for (let i = lowestRangeArray[0]; i < lowestRangeArray[1]; i+= 10000) {
    splitRanges.push([lastRange, i]);
    lastRange = i;
}

lowestRangeLocation = undefined;
lowestRangeArray = [];

for (let i = 0; i < splitRanges.length; i++) {
    const [start, end] = splitRanges[i];
    const endLocation = getLocation(end);
    const combinedLocation = endLocation;
    if (!lowestRangeLocation || combinedLocation < lowestRangeLocation) {
        lowestRangeLocation = combinedLocation;
        lowestRangeArray = [start, end];
    }
}

const [lowestStart, lowestEnd] = lowestRangeArray;
for (let i = lowestStart; i < lowestEnd; i++) {
    const location = getLocation(i);
    if (!lowestNumber || location < lowestNumber) {
        lowestNumber = location;
    }
}

function getLocation(seed) {
    if (cache[seed]) {
        return cache[seed];
    }
    let newNumber = seed;
    for (let i = 0; i < maps.length; i++) {
        const map = maps[i];
        let found = false;
        map.forEach(mapping => {
            if (found) {
                return;
            }
            const { range, destination } = mapping;
            if (range[0] <= newNumber && newNumber <= range[1] + range[0] - 1) {
                // find distance from newNumber to range[0]
                const distance = newNumber - range[0];

                newNumber = destination + distance;
                found = true;
            }
        });
    }
    cache[seed] = newNumber;
    return newNumber;
}

console.log(lowestNumber);