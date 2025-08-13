import { useEffect, useState } from "react";

export default function CharactersCard() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error("error", error));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-5 text-white ">
        {characters.map(char => (
          <div key={char.id} className="flex item-center w-2/12">
            <div className="flex flex-col min-w-xs rounded shadow-2xl p-5 gap-2 hover:scale-125 hover:bg-[#76161D] duration-200">
              <p className="font-text"><span className="font-text font-bold">Name:</span> {char.name}</p>
              <p className="font-text"><span className="font-text font-bold">realName:</span> {char.realName}</p>
              <p className="font-text"><span className="font-text font-bold">universe:</span> {char.universe}</p>
              <div className="flex justify-around">
                <button type="button" id="Modify" className="rounded p-2 bg-black hover:bg-white hover:text-[#76161D] duration-300">Modify</button>
                <button type="button" id="Delete" className="rounded p-2 bg-black hover:bg-white hover:text-[#76161D] duration-300">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

