const fs = require('fs');

const input = fs.readFileSync('./day-1/input.txt', 'utf-8');

let sum = 0;

const convertMap = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

const keyWords = Object.keys(convertMap);

input.split('\n').forEach((line) => {
    let numbers = [];
    let bufferedChars = "";

    for (let i = 0; i < line.length; i++) {
        if (!isNaN(parseInt(line[i]))) {
            numbers.push(parseInt(line[i]));
            continue;
        }
        bufferedChars += line[i];
        for (let j = 0; j < keyWords.length; j++) {
            if (bufferedChars.includes(keyWords[j])) {
                // remove all characters before the word and word length - 1
                numbers.push(convertMap[keyWords[j]]);
                bufferedChars = bufferedChars.slice(bufferedChars.indexOf(keyWords[j]) + keyWords[j].length - 1);
                // 
            }
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