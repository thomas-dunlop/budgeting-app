//Initialize Express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000;

//Bring in routers
const envelopeRoute = require('./routes/envelopes')
app.use('/envelopes', envelopeRoute);
const transactionRoute = require('./routes/transactions');
app.use('/transactions', transactionRoute);

app.get('/homepage', (req, res) => {
    res.status(200).sendFile('index.html', {root: 'C:/Users/dunlo/codingProjects/budgeting-app/'});
})

//Enpoints for retreiving HTML and Javascript files for front end
app.get('/front-end-scripts.js', (req, res) => {
    res.status(200).sendFile('front-end-scripts.js', {root: 'C:/Users/dunlo/codingProjects/budgeting-app/'});
})
app.listen(port, () => {
    console.log(`Server is listening at PORT ${port}.`);
})