import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


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

  const handleShowView = (country) => {
    const countryToShow = []
    countryToShow.push(country)
    setCountriesToShow(countryToShow)
  }
  return (
   <div>
      find countries: <input value={value} onChange={handleChange}/>
      <Countries countriesToShow={countriesToShow} handleShowView={handleShowView}/>
    </div>
    )
} 

export default App
