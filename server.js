const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json({
        message:
          'There is a problem retrieving the account information from the database'
      });
    });
});

server.get('/api/accounts/:id', (req, res) => {
  db.select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json({
        message:
          'There was a problem retrieving the requested account from the database'
      });
    });
});

server.post('/api/accounts', (req, res) => {
  const postData = req.body;
  if (!postData.name || !postData.budget) {
    res
      .status(400)
      .json({ message: 'Please include a name and a budget amount' });
  }

  db('accounts')
    .insert(postData, 'id')
    .then(ids => {
      console.log(ids); // returns an array of id's or an array of 1 id if posting only one object.
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Problem creating account in database' });
    });
});

server.put('/api/accounts/:id', (req, res) => {
  const putID = req.params.id;
  const changes = req.body;

  db('accounts')
    .where({ id: putID })
    .update({ budget: changes.budget })
    .then(updatedRows => {
      res.status(200).json(updatedRows);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Problem saving the updated account to database' });
    });
});

server.delete('/api/accounts/:id', (req, res) => {
  const delID = req.params.id;
  db('accounts')
    .where({ id: delID })
    .del()
    .then(deletedRows => {
      res.status(200).json(deletedRows);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating the database with your delete request'
      });
    });
});

module.exports = server;
