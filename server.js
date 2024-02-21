const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('LabInventory'));
app.use(cors());

app.get('/', (req, res) => {
    console.log('request received:', req.url);
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});