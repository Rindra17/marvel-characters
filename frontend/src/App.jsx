import './App.css'
import { CharactersCard } from './components'

function App() {

  return (
    <div className='flex flex-col background w-full h-screen gap-3 p-2'>
      <h1 className="mx-auto font-title text-5xl text-white">Marvel Characters</h1>
      <CharactersCard />
    </div>
  )
}

export default App
