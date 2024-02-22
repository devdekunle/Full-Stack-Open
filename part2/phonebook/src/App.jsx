import { useState } from 'react'
import React from 'react'


const App = () => {
  const [persons, setPersons] = useState([
      {name: 'Arto Hellas', number: '+2349030684139', id:1},
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]) 
  const [newName, setNewName] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    const checkName = persons.find(person => person.name === newName)
    checkName ?
      alert(`${newName} is already added to the phonebook`) :
      setPersons(persons.concat({name:newName, number:newNumber, id: persons.length+1}))
      setNewName('')
      setNewNumber('')       
  }

  const filterPerson = (e) => {
    setNewFilter(e.target.value)
    const nameFilter = persons.filter(person => {
      return person.name.toLowerCase().includes(newFilter.toLowerCase())
    })
    setShowFilter(nameFilter)
  }
  console.log(newFilter)
  console.log(showFilter)
  const toShow = newFilter === '' ? persons : showFilter
  return (
      <div>
        <h2>Phonebook</h2>
        <div>Filter shown with
            <input type="text" value={newFilter} onChange={filterPerson}/>
        </div>
        <h2>add a new</h2>
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
          {toShow.map(person => {
              return <p key={person.id}>
                      {person.name} {person.number}
                      </p>})
          }
        </div>
      </div>
  )
}
export default App
