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
        if (!isNumber(character)) {
            continue;
        }

        let k = j;
        let isNextToSymbol = false;
        let number = '';
        while (k < characters[i].length && isNumber(characters[i][k])) {
            if (checkIfSymbolAround(i, k)) {
                isNextToSymbol = true;
            }
            number += characters[i][k];
            k++;
        }

        console.log(number, isNextToSymbol);
        if (isNextToSymbol) {
            j = k;
            sum += parseInt(number);
        }

    }
}

function isSymbol(character) {
    // is true if a character is not a period or a number
    return character !== '.' && isNaN(parseInt(character));
}

function isNumber(character) {
    return !isNaN(parseInt(character));
}

function checkIfSymbolAround(i, j) {
    // up, down, left, right, and diagonly
    const up = i - 1;
    const down = i + 1;
    const left = j - 1;
    const right = j + 1;
    // check if any of the above are symbols


    let upIsSymbol;
    let leftIsSymbol
    let rightIsSymbol;
    let downIsSymbol;
    let diagonallyUpLeftIsSymbol;
    let diagonallyUpRightIsSymbol;
    let diagonallyDownLeftIsSymbol;
    let diagonallyDownRightIsSymbol;
    if (up >= 0) {
        upIsSymbol = isSymbol(characters[up][j]);
    }
    if (down < characters.length) {
        downIsSymbol = isSymbol(characters[down][j]);
    }
    if (left >= 0) {
        leftIsSymbol = isSymbol(characters[i][left]);
    }
    if (right < characters[i].length) {
        rightIsSymbol = isSymbol(characters[i][right]);
    }
    if (up >= 0 && left >= 0) {
        diagonallyUpLeftIsSymbol = isSymbol(characters[up][left]);
    }
    if (up >= 0 && right < characters[i].length) {
        diagonallyUpRightIsSymbol = isSymbol(characters[up][right]);
    }
    if (down < characters.length && left >= 0) {
        diagonallyDownLeftIsSymbol = isSymbol(characters[down][left]);
    }
    if (down < characters.length && right < characters[i].length) {
        diagonallyDownRightIsSymbol = isSymbol(characters[down][right]);
    }

    const correct = upIsSymbol || downIsSymbol || leftIsSymbol || rightIsSymbol || diagonallyUpLeftIsSymbol || diagonallyUpRightIsSymbol || diagonallyDownLeftIsSymbol || diagonallyDownRightIsSymbol;
    // console.log(characters[i][j], correct);
    return correct;
}

console.log(sum);