const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


// body-parser middleware
app.use(bodyParser.json());

app.use(express.static('public'));

const heroes = require('./routes/api/heroes');
app.use('/api/heroes', heroes);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});