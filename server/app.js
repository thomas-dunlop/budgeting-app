//Initialize Express
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

//Set global variables
let envelopeIdCounter = 0;
const envelopeArray = [];

//Envelop Class and Array
class Envelope {
    constructor (name, money, budget) {
        this.name = name;
        this.money = money;
        this.budget = budget;
        this.id = envelopeIdCounter++
    }
}

//Function for adding envelopes to the array
function addEnvelope(name, money, budget) {
    let tempEnvelope = new Envelope(name, money, budget);
    envelopeArray.push(tempEnvelope);
}

//Test Envelopes
addEnvelope('Food', 800, 1000);
addEnvelope('Rent', 3000, 3000);
addEnvelope('Gas', 100, 200);

//MIDDLEWARE
//Validates that envelope exists
app.param('id', (req, res, next, id) => {
    let foundEnvelope = envelopeArray.find( ({ id }) => id.toString() === req.params.id);
    if (foundEnvelope) {
        req.envelope = foundEnvelope;
        let foundId = envelopeArray.findIndex( ({ id }) => id === req.envelope.id);
        req.id = foundId;
        next();
    } else {
        res.status(404).send();
    }
})

//HTTP ENDPOINTS 
//GET request for retrieving all envelopes
app.get('/', (req, res) => {
    res.status(200).send(envelopeArray);
});

//GET request for retreiving a specific envelope
app.get('/:id', (req, res) => {
    res.status(200).send(req.envelope); 
});

//POST request for adding a new envelope
app.post('/', (req, res) => {
    addEnvelope(req.body.name, req.body.money, req.body.budget);
    res.status(201).send('New envelope created.') 
})

//DELETE request for deleting an envelope
app.delete('/:id', (req, res) => {
    envelopeArray.splice(req.id, 1);
    res.status(204).send(`Id: ${req.id} envelope deleted.`);
})

//PUT request for updating envelopes
app.put('/:id', (req, res) => {
    let newKeys = Object.keys(req.body);
    newKeys.forEach(element => {
        let currentKey = element;
        if (envelopeArray[req.id][currentKey]){
            envelopeArray[req.id][currentKey] = req.body[currentKey];
        }
    })
    res.send(`Id: ${req.id} envelope updated.`);
});

app.listen(port, () => {
    console.log(`Server is listening at PORT ${port}.`);
})