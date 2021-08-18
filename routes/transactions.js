const express = require('express');
const router = express.Router();

//Bring in queries
const db = require('../queries/transaction-queries');

//HTTP ENDPOINTS 
//GET request for retrieving all transactions
router.get('/', db.getAllTransactions);

//GET request for retreiving a specific transaction
router.get('/:id', db.getTransactionById);

//POST request for adding a new transaction
router.post('/', db.createTransaction, db.updateEnv);

//DELETE request for deleting a transaction
router.delete('/:id', db.getOriginalAmount, db.deleteTransaction, db.updateEnv);

//PUT request for updating transactions
router.put('/:id', db.getOriginalAmount, db.updateTransaction, db.updateEnv);

module.exports = router;