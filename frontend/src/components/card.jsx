import { useEffect, useState } from "react";
import { AddCharacter, EditCharacter } from ".";
import { DeleteButton, EditButton } from "./tools";

export default function CharactersCard() {
  const [characters, setCharacters] = useState([]);
  const [editChar, setEditChar] = useState(null);
  const [deleteById, setDeleteById] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error("Error", error));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showConfirm) {
        cancelDelete();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showConfirm]);

  const confirmDelete = (id) => {
    setShowConfirm(null);
    setDeleteById(id);

    setTimeout(() => {
      DeleteButton(id, setCharacters);
      setDeleteById(null);
    }, 300)
  }

  const handleDeleteClick = (id) => {
    setShowConfirm(id);
  }

  const cancelDelete = () => {
    setShowConfirm(null);
  }

  if (characters.length === 0) {
    return (
      <div>
        Loading characters ...
      </div>
    )
  }

  return (
    <div className="h-[80vh] overflow-y-auto scroll-smooth p-4">
      <div className="flex flex-wrap justify-center items-center gap-5 text-white ">
        {characters.map(char => (
          <div key={char.id}
            className={`flex bg-black opacity-80 rounded item-center w-2/12 transform transition-all duration-200
            ${deleteById === char.id ? 'scale-0 opacity-0 h-0 overflow-hidden' : 'scale-100 opacity-80'}
          `}>
            {showConfirm === char.id && (
              <div className="absolute inset-0 bg-black/90 z-60 flex flex-col items-center justify-center p-4 rounded gap-2">
                <p className="text-center text-xl"> Delete this chararcter?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => confirmDelete(char.id)}
                    className="px-3 py-2 rounded bg-red-600 text-white cursor-pointer hover:bg-red-800 duration-100">
                    Confirm
                  </button>

                  <button
                    onClick={cancelDelete}
                    className="px-3 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-800 duration-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
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
                  onClick={(() => handleDeleteClick(char.id))}
                  className="px-3 py-2 rounded bg-red-600 text-white cursor-pointer hover:bg-red-800 duration-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex bg-black opacity-80 rounded item-center w-2/12 ">
          <div className="flex flex-col min-w-xs rounded shadow-2xl p-5 gap-2 hover:scale-110 hover:bg-[#76161D]  duration-200">
            <p className="font-text"><span className="font-text font-bold">Id:</span> </p>
            <p className="font-text"><span className="font-text font-bold">Name:</span> ?</p>
            <p className="font-text"><span className="font-text font-bold">realName:</span> ?</p>
            <p className="font-text"><span className="font-text font-bold">universe:</span> ?</p>
            <div className="flex justify-around items-center mt-5">
              <button
                onClick={() => setShowAddForm(true)}
                className="px-3 py-2 rounded bg-green-400 text-white cursor-pointer hover:bg-green-700 duration-100"
              >
                Add
              </button>
            </div>

          </div>
        </div>
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

      {showAddForm && (
        <>
          <AddCharacter
            setShowAddForm={setShowAddForm}
            setCharacters={setCharacters}
          />
        </>
      )}
    </div>
  )
}

