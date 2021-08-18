//Initialize Express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000;

//Bring in queries
const db = require('./queries.js');

//HTTP ENDPOINTS 
//GET request for retrieving all envelopes
app.get('/envelopes', db.getAllEnvelopes);

//GET request for retreiving a specific envelope
app.get('/envelopes/:id', db.getEnvelopeById);

//POST request for adding a new envelope
app.post('/envelopes', db.createEnvelope);

//DELETE request for deleting an envelope
app.delete('/envelopes/:id', db.deleteEnvelope);

//PUT request for updating envelopes
app.put('/envelopes/:id', db.updateEnvelope);

app.listen(port, () => {
    console.log(`Server is listening at PORT ${port}.`);
})