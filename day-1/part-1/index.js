const fs = require('fs');

const input = fs.readFileSync('./day-1/input.txt', 'utf-8');

let sum = 0;

input.split('\n').forEach((line) => {
    const chars = line.split('');
    let numbers = [];
    for (let i = 0; i < chars.length; i++) {
        const parsed = parseInt(chars[i]);
        if (!isNaN(parsed)) {
            numbers.push(parsed);
        }
    }

    if (numbers.length === 0) {
        return;
    }

    const firstNumber = numbers[0];

    if (numbers.length === 1) {
        sum += parseInt(`${firstNumber}${firstNumber}`);
        return;
    }

    const lastNumber = numbers[numbers.length - 1];
    sum += parseInt(`${firstNumber}${lastNumber}`);
});

console.log(sum);