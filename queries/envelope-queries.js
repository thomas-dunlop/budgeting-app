const {pool} = require('../config');

//Get all envelopes 
const getAllEnvelopes = (req, res) => {
    const text = 'SELECT * FROM envelope';
    pool.query(text, null, (error, result) => {
        if (error) {
            console.log(error);
            throw error;
        }
        res.status(200).json(result.rows);
    })
};

//Get a specific envelope 
const getEnvelopeById = (req, res) => {
    const id = parseInt(req.params.id);
    const values = [];
    values.push(id);
    const text = 'SELECT * FROM envelope WHERE id = $1';
    pool.query(text, values, (error, result) => {
        if (error){ 
             throw(error);
        }
        res.status(200).json(result.rows);
    })
};

//Create a new envelope
const createEnvelope = (req, res) => {
    const name = req.body.env_name;
    const budget = req.body.env_budget;
    const money = req.body.env_money;
    const values = [];
    values.push(name);
    values.push(budget);
    values.push(money);
    const text = 'INSERT INTO envelope (env_name, env_budget, env_money) VALUES ($1, $2, $3) RETURNING *';
    pool.query(text, values, (error, result) => {
        if (error){
            throw error;
        }
        res.status(201).send(`Envelope added with ID: ${result.rows[0].id}`);
    })

}

//Update an envelope
const updateEnvelope = (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.env_name;
    const budget = req.body.env_budget;
    const money = req.body.env_money;
    const values = [];
    values.push(id);
    values.push(name);
    values.push(budget);
    values.push(money);
    const text = 'UPDATE envelope SET env_name = $2, env_budget = $3, env_money = $4 WHERE id = $1';
    pool.query(text, values, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Envelope updated with ID: ${id}`);
    })
};

//Delete an envelope
const deleteEnvelope = (req, res) => {
    const id = parseInt(req.params.id);
    const values = [];
    values.push(id)
    const text = 'DELETE FROM envelope WHERE id = $1';
    pool.query(text, values, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Envelope deleted with ID: ${id}`);
    })
}

module.exports = {
    getAllEnvelopes,
    getEnvelopeById,
    createEnvelope,
    updateEnvelope,
    deleteEnvelope
}