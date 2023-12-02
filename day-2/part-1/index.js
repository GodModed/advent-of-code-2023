const fs = require('fs');
const input = fs.readFileSync('./day-2/input.txt', 'utf-8');

const rules = {
    red: 12,
    green: 13,
    blue: 14
}

const games = input.split('\n');

let sumOfIds = 0;

games.forEach(game => {

    let possible = true;

    let [gameNumber, data] = game.split(':');
    const id = parseInt(gameNumber.split(' ')[1]);
    data = data.trim().split(';');
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
        if (
            red > rules.red ||
            green > rules.green ||
            blue > rules.blue
        ) {
            possible = false;
        }
    });

    if (possible) {
        sumOfIds += id;
    }
});

console.log(sumOfIds);