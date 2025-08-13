
const { log, error } = require('console');
const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(cors());

const filePath = path.join(__dirname, "characters.json");

app.get("/characters", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const characters = JSON.parse(data);
    res.json(characters.characters);
  }
  catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return res.status(500).json({ error: "Error reading or parsing JSON file:" });
  }
});

app.get("/characters/:id", async (req, res) => {
  const characterId = parseInt(req.params.id);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    const characters = Array.isArray(jsonData) ? jsonData : jsonData.characters;

    const character = characters.find((char) => char.id == characterId);

    character ? res.json(character) : res.status(404).json({ error: "characters Not Found" });
  }
  catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return res.status(500).json({ error: "Error reading or parsing JSON file" });
  }
});

app.post("/characters", async (req, res) => {

});

app.put("/characters/:id", (req, res) => {

});

app.delete("/characters/:id", async (req, res) => {
  const characterId = parseInt(req.params.id);
  try {

    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    const characters = Array.isArray(jsonData) ? jsonData : jsonData.characters;

    const characterIndex = characters.findIndex(
      char => char.id == characterId
    );

    console.log(characterIndex)
    if (characterIndex === -1) {
      console.error("Character Not Found: ", error);
      return res.status(404).json({ error: "characters not found" });
    }

    characters.splice(characterIndex, 1);
    console.log(characters);

    await fs.writeFile(filePath, JSON.stringify(characters, null, 2));
    return res.status(200).json({ message: "Character deleted successfully" });
  }
  catch (error) {
    console.error("Delete error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = 3000;
app.listen(port, () => console.log(`Server running on prot ${port}`));
