

export function EditButton(id, setCharacters, character, setEditChar) {
  setEditChar({ ...character });
}

export function DeleteButton(id, setCharacters) {
  fetch(`http://localhost:3000/characters/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) throw new Error('Error: character is not deleted');
      setCharacters(prev => prev.filter(char => char.id !== id))
    })
    .catch(error => console.error("DELETE Eroro: ", error))
}
