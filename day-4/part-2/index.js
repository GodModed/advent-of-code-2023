const fs = require('fs');
const input = fs.readFileSync('./day-4/input.txt', 'utf-8');

const lines = input.split('\n');

const copies = [];
lines.forEach(() => {
    copies.push(1);
});

lines.forEach((line, index) => {
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

    let copyAmount = 1;
    winningNumbersArray.forEach(number => {
        if (!scratchCardNumbersArray.includes(number)) {
            return;
        }
        copies[index + copyAmount] += copies[index];
        copyAmount++;
    });
});

// get sum of all copies
let sum = 0;
copies.forEach(copy => {
    sum += copy;
});

console.log(sum);