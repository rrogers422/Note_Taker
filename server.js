// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// Express Configurations
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Route to /notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// API get request to obtain notes from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err){ res.status(400).json(err) }; 

        res.status(200).json(JSON.parse(data));
    });     
});

// Default Route -> has to be under all other app.get's
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Post Route to read then rewrite db.json, adding the new note
app.post('/api/notes', (req, res) => {
    
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if(err){ res.status(400).json(err) };
        const dbInfo = JSON.parse(data);
        const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: dbInfo.length + 1
        };
        dbInfo.push(newNote)
        
        fs.writeFile('db/db.json', JSON.stringify(dbInfo), 'utf8', (err) => {
        if(err){ res.status(400).json(err) };
        return true;
        });
    });

    res.redirect('/')
})

// will attempt app.delete later.
// app.delete('/api/notes/:id', (req, res) => {
//     let trashedNote
// })

// Listener 
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));