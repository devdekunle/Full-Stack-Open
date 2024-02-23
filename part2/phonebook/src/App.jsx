import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
      <div>Filter shown with
            <input type="text" value={props.newFilter} onChange={props.onChange}/>
      </div>
    )
} 

const Input = (props) => {
  return (
      <div>
            {props.type}: <input value={props.value} onChange={props.handleChange}/>
      </div>
    )
}
const PersonForm = (props) => {
  return (
      <form onSubmit={props.onSubmit}>
          <Input type="name" value={props.newName} handleChange={props.handleNameChange}/>
          <Input type="number" value={props.newNumber} handleChange={props.handleNumberChange}/>
          <div>
            <button type='submit'>add</button>
          </div>
      </form>
    )
}

const Person = (props) => {
  return (
      <div>
          {props.toShow.map(person => {
              return <p key={person.id}>
                      {person.name} {person.number}
                      </p>})
          }
      </div>
    )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState([])


  useEffect(()=> {
    console.log('checking useEffect')
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
  }, [])
  console.log('persons are', persons.length, 'people')
  const handleSubmit = (event) => {
    event.preventDefault()
    const checkName = persons.find(person => person.name === newName)
    checkName ?
      alert(`${newName} is already added to the phonebook`) :
      setPersons(persons.concat({name:newName, number:newNumber, id: persons.length+1}))
      setNewName('')
      setNewNumber('')       
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterPerson = (e) => {
    setNewFilter(e.target.value)
    const nameFilter = persons.filter(person => {
      return person.name.toLowerCase().includes(newFilter.toLowerCase())
    })
    setShowFilter(nameFilter)
  }

  const toShow = newFilter === '' ? persons : showFilter

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter onChange={handleFilterPerson} newFilter={newFilter}/>
        <h2>add a new</h2>
        <PersonForm 
            onSubmit={handleSubmit}
            newName={newName}
            newNumber={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}/>

        <h2>Numbers</h2>
        <Person toShow={toShow}/>
      </div>
  )
}
export default App
