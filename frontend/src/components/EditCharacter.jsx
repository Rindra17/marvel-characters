import { useEffect, useState, useRef } from "react"


export default function EditCharacter(props) {
  const { editChar, setEditChar, setCharacters } = props;
  const [character, setCharacter] = useState({
    id: null,
    name: '',
    realName: '',
    universe: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (editChar) {
      setCharacter({
        id: editChar.id,
        name: editChar.name || '',
        realName: editChar.realName || '',
        universe: editChar.universe || ''
      });

      setIsVisible(true);

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, [editChar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editChar.id) {
      alert("Error: ID not provided");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/characters/${character.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(character)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error server');
      }

      const updateChar = await res.json();

      setCharacters(prev => {
        if (!Array.isArray(prev)) return [updateChar];
        return prev.map(char => char.id === character.id ? updateChar : char);
      });

      setEditChar(null);
    }
    catch (error) {
      console.error("Error: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setEditChar(null), 200);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!editChar) return null;

  const inputClassName = "outline-none rounded bg-gray-300 px-2 py-1";
  const divInputClassName = "flex justify-between gap-2"

  return (
    <>
      <div
        className={`fixed inset-0 bg-black backdrop-blur-2xl z-40 transition-opacity duration-200
          ${isVisible ? 'opacity-75' : 'opacity-0'}`}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className={`relative w-1/4 font-text rounded bg-white text-black p-5 transform transition-all duration-200
            ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
          `}>
          <div className="flex flex-col items-center">
            <h2 className="font-title text-xl">Edit character</h2>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-400 duration-150 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6 M6 6l12 12" />
              </svg>
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div>
                <p><span className="font-bold">Id:</span> {character.id}</p>
              </div>

              <div className={divInputClassName}>
                <label className="font-bold">Name: </label>
                <input
                  type="text"
                  name="name"
                  value={character.name}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <div className={divInputClassName}>
                <label className="font-bold">Real Name: </label>
                <input
                  type="text"
                  name="realName"
                  value={character.realName}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <div className={divInputClassName}>
                <label className="font-bold">Universe: </label>
                <input
                  type="text"
                  name="universe"
                  value={character.universe}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <div className="flex justify-around">
                <button type="submit" className="px-3 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-800 duration-100">Save</button>
                <button type="button"
                  onClick={handleClose}
                  className="px-3 py-2 rounded bg-red-600 text-white cursor-pointer hover:bg-red-800 duration-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}

