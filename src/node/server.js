const express = require('express');
const fs = require('fs');
const util = require('util');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('OK!');
});

app.get('/audio', async (req, res) => {
    const path = __dirname + '/public/audios/systemofadownVEVO/System Of A Down - Chop Suey! (Official Video).mp3';
    const statPromise = util.promisify(fs.stat);
    const myStat = await statPromise(path);
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': myStat.size
    });
    const stream = fs.createReadStream(path);
    stream.on('end', () => console.log('fim da transmissão.'));
    stream.pipe(res);
});

app.listen(3000, '192.168.1.66', () => console.log('Running API!'));