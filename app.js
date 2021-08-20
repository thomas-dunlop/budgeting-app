//Initialize Express
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT; //Change to "3000" if using locally.

//Bring in routers
const envelopeRoute = require('./routes/envelopes')
app.use('/envelopes', envelopeRoute);
const transactionRoute = require('./routes/transactions');
app.use('/transactions', transactionRoute);

//Enpoints for retreiving HTML and Javascript files for front end
app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: __dirname});
})
app.get('/front-end-scripts.js', (req, res) => {
    res.status(200).sendFile('front-end-scripts.js', {root: __dirname});
})

app.listen(port, () => {
    console.log(`Server is listening at PORT ${port}.`);
})