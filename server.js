// Requires the following npm modules
const express = require ('express');
//uuid npm package for unique id 
const {v4: uuidv4 } = require ('uuid');
//import node path to indicate paths of routes
const path = require ('path');
//node.js file system
const fs = require('fs');

let DB = ('./db/db.json');
// Express app configuration
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// GET Routes to indicate where we're going to provide files and their location on our server's filesystem
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Home page
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Note page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//Wildcard 
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


app.get('/api/notes' , (req, res) => res.json(DB));


app.post('/api/notes' , (req, res) => {

    const {title, text} = req.body;
    
    if (req.body) {
        const noteData = {
            title,
            text,
            id: uuidv4(),
         };
    }

    try {

    fs.readFile(DB, 'utf8', (err, data) => {
    if (err) {
        console.log('file failed');
        return;
    } else {
        
        DB = JSON.parse(data);
        DB.push(noteData);
    
    fs.writeFile('.db/db.json', JSON.stringify(DB));
    }
});

} catch (err) {
    throw err;
}

});

//Delete route will 
app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;

    DB = DB.filter(note => note.id !== noteId)
  
        fs.writeFile('./db/db.json', JSON.stringify(DB, null),(err) => {
            if (err) {
                res.status(500);
            } else {
                res.status(200);
            }
        });

        res.json(DB);
      })


//Server accepts which port to listen on
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
