const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('LabInventory'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('get request received: ', req.url);
    res.send('Hello, World! this is a get request response.');
});

app.post('/data', (req, res) => {
    console.log('post request received:', req.url);
    const requestData = req.body;
    console.log('received data: ', requestData);
    res.send('received post request. data received: ', JSON.stringify(requestData));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});