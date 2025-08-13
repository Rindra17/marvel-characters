
const { log, error } = require('console');
const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, "characters.json");

const readJsonFile = async (filePath) => {
  const data = await fs.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(data);

  return parsedData;
};

const writeJsonFile = async (filePath, characters) => {
  await fs.writeFile(filePath, JSON.stringify(characters, null, 2));
};

const getCharacterArray = (jsonData) => {
  return jsonData.characters || [];
};

const getNextId = (characters) => {
  const maxId = characters.reduce((max, char) => Math.max(max, char.id), 0);

  return maxId + 1;
}

app.get("/characters", async (req, res) => {
  try {
    const jsonData = await readJsonFile(filePath);
    const characters = getCharacterArray(jsonData);
    return res.status(200).json(characters);
  }
  catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return res.status(500).json({ error: "Error reading or parsing JSON file" });
  }
});

app.get("/characters/:id", async (req, res) => {
  const characterId = parseInt(req.params.id);
  try {
    const jsonData = await readJsonFile(filePath);
    const characters = getCharacterArray(jsonData);
    const character = characters.find((char) => char.id == characterId);

    character ? res.json(character) : res.status(404).json({ error: "characters Not Found" });
  }
  catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return res.status(500).json({ error: "Error reading or parsing JSON file" });
  }
});

app.post("/characters", async (req, res) => {
  const { name, realName, universe } = req.body;

  if (!name || !realName || !universe) {
    return res.status(400).json({ error: "Missing required fields (name, realName, universe)" });
  }

  try {
    const jsonData = await readJsonFile(filePath);
    const characters = getCharacterArray(jsonData);

    const newCharacter = {
      id: getNextId(characters),
      name,
      realName,
      universe
    };

    characters.push(newCharacter);
    jsonData.characters = characters;

    await writeJsonFile(filePath, jsonData);

    return res.status(201).json(newCharacter);
  }
  catch (error) {
    console.error("Error creating the character:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/characters/:id", async (req, res) => {
  const characterId = parseInt(req.params.id);
  const { name, realName, universe } = req.body;

  if (!name && !realName && !universe) {
    return res.status(400).json({ error: "Provide at least one field to update (name, realName, universe)" });
  }

  try {
    const jsonData = await readJsonFile(filePath);
    const characters = getCharacterArray(jsonData);
    const characterIndex = characters.findIndex(char => char.id == characterId);

    if (characterIndex === -1) {
      console.error("Character Not Found: ", error);
      return res.status(404).json({ error: "characters not found" });
    }

    characters[characterIndex] = {
      id: characterId,
      name: name != undefined ? name : characters[characterIndex].name,
      realName: realName != undefined ? realName : characters[characterIndex].realName,
      universe: universe != undefined ? universe : characters[characterIndex].universe
    };
    jsonData.characters = characters;

    await writeJsonFile(filePath, jsonData);

    return res.status(200).json(characters[characterIndex]);
  }
  catch (error) {
    console.error("Error to update the character:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/characters/:id", async (req, res) => {
  const characterId = parseInt(req.params.id);
  try {
    const jsonData = await readJsonFile(filePath);
    const characters = getCharacterArray(jsonData);
    const characterIndex = characters.findIndex(
      char => char.id == characterId
    );

    if (characterIndex === -1) {
      console.error("Character Not Found: ", error);
      return res.status(404).json({ error: "characters not found" });
    }

    characters.splice(characterIndex, 1);
    jsonData.characters = characters;

    await writeJsonFile(filePath, jsonData);
    return res.status(200).json({ message: "Character deleted successfully" });
  }
  catch (error) {
    console.error("Delete error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = 3000;
app.listen(port, () => console.log(`Server running on prot ${port}`));
