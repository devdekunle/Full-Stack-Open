import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
      console.log('Fetching countries data')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
            console.log('Data successfully fetched')
            setCountries(response.data)
        })
        .catch(error => {
          console.log('Error in fetching data')
        })
      }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    const filter = countries.filter(country => {
        return country.name.common.toLowerCase().includes(value.toLowerCase())
      })
      setCountriesToShow(filter)
  }

  return (
   <div>
      find countries: <input value={value} onChange={handleChange}/>
      {countriesToShow.length > 10 && <p>Too many matches, specify another filter</p>}
      {countriesToShow.length > 1 && countriesToShow.length <= 10 && countriesToShow.map(
        country => <div key={country.name.common}><p>{country.name.common}</p></div>)}
      {countriesToShow.length === 1 && countriesToShow.map(country => {
        return <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h3>languages</h3>
            {Object.values(country.languages).map(language => <ul key={language}><li>{language}</li></ul>)}
          <div>{country.flag}</div>
        </div>
      })}
    </div>
    )
} 

export default App
