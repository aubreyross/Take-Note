//list of depdencies used
const express = require ('express');
const fs = require('fs');
const path = require ('path');
const file = "./db/db/json";
const api = require('./routes/index.js');

var PORT = process.env.PORT || 3000;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/home', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')
);

//GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html')
);


app.post("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, file));
});


app.delete("/api/notes/:id", (req, res) => {


});


app.listen(PORT, () =>
  console.log(`App listening at ${PORT}`)
);

