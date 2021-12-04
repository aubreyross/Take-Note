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


// POST route to create note
api.post('/', (req, res) => {
  console.log(req.body);
  
  const noteContent = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  }; 
  
  try {

    readFromFile(file, 'utf8', (err, jsonStr) => {
      if (err) {
        res.error("Could not create note", err);
          return;
      
      } else {
  	
		readAndAppend(noteContent, './db/db.json');
		    res.json(`Succesful note`);
          
      }});

  } catch (err) {
    throw err;
  }

})


//DELETE route to delete selected note
api.delete('/:id', (req, res) => {
  const noteId = req.params.id;
      readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {

        const result = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Deleted!`);
  });
});


module.exports = api;
