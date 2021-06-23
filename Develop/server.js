//Dependencies
const express = require("express");
const path = require("path");
const fr = require("fs");
const { Router } = require("express");

//Starting the Express app on port 3000
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
//these routes handle "visit" page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, jsonString) => {
        if(err) {
            console.log("file read failed:", err);
            return;
        }
        res.json(JSON.parse(json.jsonString));
    });
});

//redirects to index if no routes match
app.get("*", function (req, res) {
    res.redirect("/");
  });

  //POST requests

  app.post("/api/notes", (req, res) => {
      fs.readFile(path.join(__dirname, "db.json"), "utf8",
      function (error, response) {
          if(error) {
              console.log(error);
            }
            const note = JSON.parse(response);
            const noteReq = req.body;
            const newNoteId = note.length + 1;
            const newNote = {
              id: newNoteId,
              title: noteReq.title,
              text: noteReq.text,
            };
            note.push(newNote);
            res.json(newNote);
            fs.writeFile(
              path.join(__dirname, "db.json"),
              JSON.stringify(note, null, 2),
              function (err) {
                if (err) throw err;
              }
            );
          }
        );
      });
      //LISTENER 
      app.listen(PORT, () => {
          console.log(`APP listening on PORT: $(PORT)`);
      });