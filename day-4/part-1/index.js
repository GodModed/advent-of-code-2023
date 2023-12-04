const fs = require('fs');
const input = fs.readFileSync('./day-4/input.txt', 'utf-8');

const lines = input.split('\n');

let sum = 0;
lines.forEach(line => {
    line = line.trim().split(':');
    const [_, scratchCard] = line;
    const [winnningNumbers, scratchCardNumbers] = scratchCard.split('|');
    let winningNumbersArray = winnningNumbers.trim().split(' ');
    let scratchCardNumbersArray = scratchCardNumbers.trim().split(' ');
    // remove all empty strings or strings with only spaces from both arrays
    winningNumbersArray = winningNumbersArray.filter(number => number.trim() !== '' && number.trim() !== ' ');
    scratchCardNumbersArray = scratchCardNumbersArray.filter(number => number.trim() !== '' && number.trim() !== ' ');
    // trim all numbers
    winningNumbersArray = winningNumbersArray.map(number => number.trim());
    scratchCardNumbersArray = scratchCardNumbersArray.map(number => number.trim());

    let winningNumbersSum = 0;
    let first = true;
    winningNumbersArray.forEach(number => {
        if (!scratchCardNumbersArray.includes(number)) {
            return;
        }
        if (first) {
            winningNumbersSum += 1;
            first = false;
        } else {
            winningNumbersSum *= 2;
        }
    });
    sum += winningNumbersSum;
});

console.log(sum);