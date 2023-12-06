const fs = require('fs');
const input = fs.readFileSync('./day-6/input.txt', 'utf-8');

let lines = input.split('\n');
let [timeLine, distanceLine] = lines;
timeLine += " ";
distanceLine += " ";

const times = [];
let currentNum = "";
for (let i = 0; i < timeLine.length; i++) {
    const char = timeLine[i];
    if (isNumber(char)) {
        currentNum += char;
    } else if (currentNum != "") {
        times.push(parseInt(currentNum));
        currentNum = "";
    }
}

const distances = [];
currentNum = "";
for (let i = 0; i < distanceLine.length; i++) {
    const char = distanceLine[i];
    if (isNumber(char)) {
        currentNum += char;
    } else if (currentNum != "") {
        distances.push(parseInt(currentNum));
        currentNum = "";
    }
}

const races = [];
for (let i = 0; i < times.length; i++) {
    races.push({
        time: times[i],
        distance: distances[i]
    });
}

let m = 1;
for (const race of races) {
    let combinations = 0;
    for (let i = 0; i < race.time; i++) {
        let timeLeft = race.time - i;
        if ((timeLeft * i) > race.distance) {
            combinations++;
        }
    }
    m *= combinations;
}

console.log(m);

function isNumber(n) {
    return !isNaN(parseInt(n));
}