const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const calculatorRoutes = require('./routes/calculatorroutes');

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.use('/', calculatorRoutes);

app.listen(port, () => {
    console.log(`[SERVER] Server running at http://localhost:${port}`);
});

