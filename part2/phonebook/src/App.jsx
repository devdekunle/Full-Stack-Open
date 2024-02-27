import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import dbStorage from './services/phonebook'

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
              return( 
                    <div key={person.id}>
                      <p> 
                        {person.name} {person.number}
                      </p>
                      <button onClick={() => props.handleDelete(person.id)}>delete</button>
                    </div>
                    )
          })
                    
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


  useEffect(() => {
    dbStorage
        .getPhone()
        .then(response => {
          setPersons(response)
        })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const existingUser = persons.find(person => person.name === newName)
      if(existingUser) {
          if (existingUser.name === newName && existingUser.number === newNumber) {
            alert(`${newName} is already added to the phonebook`)
          }  
          else if (existingUser.name === newName && existingUser.number !== newNumber){
              if (window.confirm(`${existingUser.name} is already added to the phonebook, replace the old number with a new one?`)) {
                dbStorage
                    .updatePhone(existingUser.id, {name:newName, number:newNumber})
                    .then(response => {
                      setPersons(persons.map(person => person.id !== existingUser.id ? person : response))
                      setNewName('')
                      setNewNumber('')
                    })
              }
          }
      }
      else {
        dbStorage
            .createPhone({ 
              name:newName,
              number:newNumber
            })
            .then(response => {
              setPersons(persons.concat(response))
              setNewName('')
              setNewNumber('')
            })
     }        
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

  const handleDelete = (id) => {
    const deletePerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      dbStorage
        .deletePhone(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== response.data.id))
          alert('delete successful')
        })    
    }
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
        <Person
           toShow={toShow}
           handleDelete={handleDelete}
        />
      </div>
  )
}
export default App
