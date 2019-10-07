const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Web DB Challenge 1 server');
});

server.post('/', (req, res) => {
  res.send('Web DB Challenge 1 server');
});

server.put('/', (req, res) => {
  res.send('Web DB Challenge 1 server');
});

server.delete('/', (req, res) => {
  res.send('Web DB Challenge 1 server');
});

module.exports = server;
