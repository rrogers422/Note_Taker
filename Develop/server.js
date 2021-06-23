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
app.GET('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.GET('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});