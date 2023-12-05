const fs = require('fs');
const input = fs.readFileSync('./day-5/input.txt', 'utf-8');

let lines = input.split('\n');
const seedLine = lines[0];
const seeds = seedLine.split(':')[1].trim().split(' ');

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

let lowestNumber;

for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    const location = getLocation(seed);
    if (!lowestNumber || location < lowestNumber) {
        lowestNumber = location;
    }
}

function getLocation(seed) {
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
    return newNumber;
}

console.log(lowestNumber);