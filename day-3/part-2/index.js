const fs = require('fs');
const input = fs.readFileSync('./day-3/input.txt', 'utf-8');

// create a 2d array of all characters and lines
const lines = input.split('\n');
// strip the lines first
const strippedLines = lines.map(line => line.trim());
// create a 2d array of all characters
const characters = strippedLines.map(line => line.split(''));

let sum = 0;

for (let i = 0; i < characters.length; i++) {
    for (let j = 0; j < characters[i].length; j++) {
        const character = characters[i][j];
        if (character !== '*') {
            continue;
        }
        sum += getNumbersNextToGear(i, j);
    }
}

function getNumbersNextToGear(i, j) {
    // up, down, left, right, and diagonly
    const up = i - 1;
    const down = i + 1;
    const left = j - 1;
    const right = j + 1;

    const numberCoordinates = [];

    if (up >= 0 && isNumber(characters[up][j])) {
        numberCoordinates.push([up, j]);
    }
    if (down < characters.length && isNumber(characters[down][j])) {
        numberCoordinates.push([down, j]);
    }
    if (left >= 0 && isNumber(characters[i][left])) {
        numberCoordinates.push([i, left]);
    }
    if (right < characters[i].length && isNumber(characters[i][right])) {
        numberCoordinates.push([i, right]);
    }
    if (up >= 0 && left >= 0 && isNumber(characters[up][left])) {
        numberCoordinates.push([up, left]);
    }
    if (up >= 0 && right < characters[i].length && isNumber(characters[up][right])) {
        numberCoordinates.push([up, right]);
    }
    if (down < characters.length && left >= 0 && isNumber(characters[down][left])) {
        numberCoordinates.push([down, left]);
    }
    if (down < characters.length && right < characters[i].length && isNumber(characters[down][right])) {
        numberCoordinates.push([down, right]);
    }

    // check if multiple
    let numbers = [];
    numberCoordinates.forEach(coordinate => {
        const wholeNumber = getWholeNumber(coordinate[0], coordinate[1]);
        if (numbers.includes(wholeNumber)) {
            return;
        }
        numbers.push(wholeNumber);
    });

    if (numbers.length !== 2) {
        return 0;
    }

    console.log(numbers);
    // multiply all the numbers together
    const product = numbers.reduce((acc, curr) => parseInt(acc) * parseInt(curr), 1);

    return product;
}

function getWholeNumber(i, j) {
    // keep moving to the left until you hit not a number and return the left most number index
    let left = j;
    while (isNumber(characters[i][left])) {
        left--;
    }

    // now keep moving to the right until you hit not a number and return the number.
    let number = '';
    while (isNumber(characters[i][left + 1])) {
        number += characters[i][left + 1];
        left++;
    }
    // 
    return number;

}

function isNumber(character) {
    return !isNaN(parseInt(character));
}

console.log(sum);