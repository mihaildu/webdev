/**
 * adding routes after app.listen()
 */
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
    console.log("Started app on port 3000!");
});

app.get("/test", (req, res) => {res.send("test")});
