const express = require('express');
const fs = require('fs');
const util = require('util');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/teste', (req, res) => {
    res.send([{status: "OK"}]);
});

app.get('/audio_stream', async (req, res) => {
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

app.get('/audio_base64', (req, res) => {
    const path = __dirname + '/public/audios/systemofadownVEVO/System Of A Down - Chop Suey! (Official Video).mp3';
    const file = fs.readFileSync(path);
    const data64 = file.toString('base64');
    
    res.send([{status: "OK", audioBase64: data64}]);
});

app.listen(3000, '192.168.1.66', () => console.log('Running API!'));