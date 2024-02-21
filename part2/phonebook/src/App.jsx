import { useState } from 'react'
import React from 'react'


const App = () => {
  const [persons, setPersons] = useState([
      {name: 'Arto Hellas'}
    ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const checkName = persons.find(person => person.name === newName)
    checkName ?
      alert(`${newName} is already added to the phonebook`) :
      setPersons(persons.concat({name:newName}))
      setNewName('')       
  }
  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input placeholder={newName} value={newName} onChange={(e)=>setNewName(e.target.value)}/>
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {persons.map(person => <p key={person.name}>{person.name}</p>)}
        </div>
      </div>
  )
}
export default App
