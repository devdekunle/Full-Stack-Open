import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import dbStorage from './services/phonebook'
import Filter from './components/Filter'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState([])
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(true)


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
                    .updatePhone(existingUser.id, {...existingUser, number:newNumber})
                    .then(response => {
                      setPersons(persons.map(person => person.id !== existingUser.id ? person : response))
                      setMessageStatus(true)
                      setMessage(`Updated ${existingUser.name}'s number`)
                      setTimeout(() => {
                        setMessage(null)
                      }, 5000)
                      setNewName('')
                      setNewNumber('')
                    })
                    .catch(error => {
                      setMessageStatus(false)
                      setMessage(`Information of ${existingUser.name} has been already been removed from the server`)
                      setTimeout(() => {
                        setMessage(null)
                      }, 5000)
                      setPersons(persons.filter(person => person.id !== existingUser.id))
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
              setMessage(`Added ${response.name}`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
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
          setMessageStatus(true)
          setMessage(`Deleted ${deletePerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(error)
          setMessageStatus(false)
          setMessage(`information of ${deletePerson.name} has already been removed from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== deletePerson.id))
          setNewName('')
          setNewNumber('') 

        })    
    }
  }

  const toShow = newFilter === '' ? persons : showFilter

  return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={message} isSuccess={messageStatus}/>
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
