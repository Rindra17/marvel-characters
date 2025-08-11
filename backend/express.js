
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());

const filePath = path.join(__dirname, "characters.json");

app.get("/characters", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const characters = JSON.parse(data);
    res.json(characters.characters);
  }
  catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return res.status(500).send("Error reading or parsing JSON file:")
  }
});

app.get("/characters/:id", async (req, res) => {
});

app.post("/characters", async (req, res) => {

});

app.put("characters/:id", (req, res) => {

});

app.delete("characters/:id", (req, res) => {

});

app.listen(8080);
