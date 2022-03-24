const fs = require('fs')

const IMAGE_PATH = './resources/images/valais.jpg';

const imageBuffer = fs.readFileSync(IMAGE_PATH);

fs.writeFile('buffer.json', JSON.stringify(imageBuffer),  (err) => {
        console.error(err);
});