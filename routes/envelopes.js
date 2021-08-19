//Router for handling envelope requests
const express = require('express');
const router = express.Router();

//Bring in queries
const db = require('../queries/envelope-queries');

//HTTP ENDPOINTS 
//GET request for retrieving all envelopes
router.get('/', db.getAllEnvelopes);

//GET request for retreiving a specific envelope
router.get('/:id', db.getEnvelopeById);

//POST request for adding a new envelope
router.post('/', db.createEnvelope);

//DELETE request for deleting an envelope
router.delete('/:id', db.deleteEnvelope);

//PUT request for updating envelopes
router.put('/:id', db.updateEnvelope);

module.exports = router;