import { useState } from 'react'
import React from 'react'


const App = () => {
  const [persons, setPersons] = useState([
      {name: 'Arto Hellas',
      number: '+2349030684139'}
    ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const checkName = persons.find(person => person.name === newName)
    checkName ?
      alert(`${newName} is already added to the phonebook`) :
      setPersons(persons.concat({name:newName, number:newNumber}))
      setNewName('')
      setNewNumber('')       
  }
  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input value={newName} onChange={(e)=>setNewName(e.target.value)}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)}/>
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
      </div>
  )
}
export default App
