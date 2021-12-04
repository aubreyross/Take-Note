const api = require("express").Router();
//uuid npm package for unique id 
const {v4: uuidv4 } = require ('uuid');
//import from fs.utils.js file 
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');

const file = './db/db.json';

//GET route for content of notes in db.json
api.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});