const fs = require('fs');
const input = fs.readFileSync('./day-2/input.txt', 'utf-8');

const games = input.split('\n');

let sumOfPowers = 0;

games.forEach(game => {
    let [_, data] = game.split(':');
    data = data.trim().split(';');
    let maxRed = maxGreen = maxBlue = 0;
    data.forEach(subData => {
        subData = subData.trim().split(',');
        let red = green = blue = 0;
        subData.forEach(color => {
            color = color.trim().split(' ');
            const [colorNumber, colorName] = color;
            switch (colorName) {
                case 'red':
                    red += parseInt(colorNumber);
                    break;
                case 'green':
                    green += parseInt(colorNumber);
                    break;
                case 'blue':
                    blue += parseInt(colorNumber);
                    break;
            }
        });
        if (red > maxRed) {
            maxRed = red;
        }
        if (green > maxGreen) {
            maxGreen = green;
        }
        if (blue > maxBlue) {
            maxBlue = blue;
        }
    });
    sumOfPowers += maxRed * maxGreen * maxBlue;
});

console.log(sumOfPowers);