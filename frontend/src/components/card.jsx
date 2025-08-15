import { useEffect, useState } from "react";
import { EditCharacter } from ".";
import { EditButton } from "./tools";

export default function CharactersCard() {
  const [characters, setCharacters] = useState([]);
  const [editChar, setEditChar] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error("error", error));
  }, []);

  if (characters.length === 0) {
    return (
      <div>
        Loading characters ...
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-5 text-white ">
        {characters.map(char => (
          <div key={char.id} className="flex bg-black opacity-80 rounded item-center w-2/12 duration-200">
            <div className="flex flex-col min-w-xs rounded shadow-2xl p-5 gap-2 hover:scale-110 hover:bg-[#76161D]  duration-200">
              <p className="font-text"><span className="font-text font-bold">Id:</span> {char.id}</p>
              <p className="font-text"><span className="font-text font-bold">Name:</span> {char.name}</p>
              <p className="font-text"><span className="font-text font-bold">realName:</span> {char.realName}</p>
              <p className="font-text"><span className="font-text font-bold">universe:</span> {char.universe}</p>
              <div className="flex justify-around items-center mt-5">
                <button
                  onClick={() => EditButton(char.id, setCharacters, char, setEditChar)}
                  className="px-3 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-800 duration-100"
                >
                  Edit
                </button>

                <button
                  className="px-3 py-2 rounded bg-red-600 text-white cursor-pointer hover:bg-red-800 duration-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editChar && (
        <>
          <EditCharacter
            editChar={editChar}
            setEditChar={setEditChar}
            setCharacters={setCharacters}
          />
        </>
      )}
    </div>
  )
}

