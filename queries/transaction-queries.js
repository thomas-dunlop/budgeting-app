//Set up Pool
const {Pool, Client} = require('pg');
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'envelope_budget_db',
    password: 'me2',
    PORT: 5432
});

//Get all transactions 
const getAllTransactions = (req, res) => {
    const text = 'SELECT * FROM transaction';
    pool.query(text, null, (error, result) => {
        if (error) {
            console.log(error);
            throw error;
        }
        res.status(200).json(result.rows);
    })
};

//Get a specific transaction 
const getTransactionById = (req, res) => {
    const id = parseInt(req.params.id);
    const values = [];
    values.push(id);
    const text = 'SELECT * FROM transaction WHERE id = $1';
    pool.query(text, values, (error, result) => {
        if (error){ 
             throw(error);
        }
        res.status(200).json(result.rows);
    })
};

//Create a new transaction
const createTransaction = (req, res, next) => {
    const env_id = req.body.env_id;
    const date = req.body.t_date;
    const amount = req.body.amount;
    const recipient = req.body.recipient;
    const values = [];
    values.push(env_id);
    values.push(date);
    values.push(amount);
    values.push(recipient)
    req.envelopeId = env_id;
    req.newAmount = amount;
    const text = 'INSERT INTO transaction (env_id, t_date, amount, recipient) VALUES ($1, $2, $3, $4) RETURNING *';
    pool.query(text, values, (error, result) => {
        if (error){
            throw error;
        }
        res.status(201).send(`Transaction added with ID: ${result.rows[0].id}`);
        next();
    })
}

//Update a transaction
const updateTransaction = (req, res, next) => {
    const id = parseInt(req.params.id);
    const env_id = req.body.env_id;
    const date = req.body.t_date;
    const amount = req.body.amount;
    const recipient = req.body.recipient;
    const values = [];
    values.push(id);
    values.push(env_id);
    values.push(date);
    values.push(amount);
    values.push(recipient);

    const text = 'UPDATE transaction SET env_id = $2, t_date = $3, amount = $4, recipient = $5 WHERE id = $1';
    pool.query(text, values, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Transaction updated with ID: ${id}`);
        req.newAmount = parseFloat(amount) - req.oldAmount;
        next();
    })
};

//Delete a transaction
const deleteTransaction = (req, res, next) => {
    const id = parseInt(req.params.id);
    const values = [];
    values.push(id);
    const text = 'DELETE FROM transaction WHERE id = $1';
    pool.query(text, values, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Transaction deleted with ID: ${id}`);
        req.newAmount = req.oldAmount * -1;
        next();
    })
}

//Update corresponding envelope (used for updating an envelope when deleting, adding, or updating a transaction)
const updateEnv = (req, res) => {
    env_id = req.envelopeId;
    amount = req.newAmount;
    const values = [];
    values.push(env_id);
    values.push(amount);
    text = 'UPDATE envelope SET env_money = env_money - $2 WHERE id = $1';
    pool.query(text, values, (error, result) => {
        if (error) {
            throw error;
        }
    })
}

//Get origional amount (used for updading envelopes when deleting or updating a transaction)
const getOriginalAmount = (req, res, next) => {
    const id = parseInt(req.params.id);
    const text_temp = 'SELECT amount, env_id FROM transaction WHERE id = $1';
    pool.query(text_temp, [id], (error, result) => {
        if (error) {
            throw error;
        }
        req.envelopeId = result.rows[0].env_id;
        req.oldAmount = result.rows[0].amount;
        next();
    })
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getOriginalAmount,
    updateEnv
}