import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './Component/CountryList'
import Filter from './Component/Filter'
import { useNavigate } from 'react-router-dom'
import './App.css'



const App = () => {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter) {
      const regex = new RegExp( newFilter, 'i' );
      const filteredCountries = () => allCountries.filter(country => country.name.common.match(regex))
      setCountries(filteredCountries)
    }
  }
  const regions = [...new Set(allCountries.map((country) => country.region))];
  return (
    <div className='app-container'>
      {regions.map(region => 
      <button
        className='region-select-btn'
        key={region}
        onClick={() => navigate(`/region/${region}`)}
      >
        {region}
      </button> )}
        <Filter 
          allCountries={allCountries} 
          value={newFilter} 
          onChange={handleFilterChange} 
          />
          <h1>All Countries</h1>
        <CountryList 
          newFilter={newFilter} 
          allCountries={allCountries} 
          countries={countries} 
          setCountries={setCountries} />
    </div>
  )
}

export default App