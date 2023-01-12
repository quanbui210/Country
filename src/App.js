import React, { useState, useEffect } from 'react'
import CountryList from './Component/CountryList'
import Filter from './Component/Filter'
import { useNavigate } from 'react-router-dom'
import './App.css'
import useFetch from './Component/Hook/useFetch'



const App = () => {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [error, setError] = useState(false)
  const {data: allCountries} = useFetch('https://restcountries.com/v3.1/all')


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter) {
      const regex = new RegExp( newFilter, 'i' );
      const filteredCountries = () => allCountries.filter(country => country.name.common.match(regex))
      setCountries(filteredCountries)
    }
    if (countries.length === 0) {
      setError(true)
    } else {
      setError(false)
    }

    if (newFilter === '') {
      setError(false)
    }
  }
  const regions = [...new Set(allCountries.map((country) => country.region))];
  return (
    <>
      <div style={{textAlign: 'center'}}>
        {regions.map(region => 
        <button
          className='region-select-btn'
          key={region}
          onClick={() => navigate(`/region/${region}`)}
        >
          {region}
        </button> )}
      </div>
          <Filter 
            allCountries={allCountries} 
            value={newFilter} 
            onChange={handleFilterChange} 
            disabled={error}
            />
      {error ? <h3>No Country Match Your Search</h3> : <>
          <h1 style={{textAlign: 'center'}}>All Countries</h1>
          <CountryList 
            newFilter={newFilter} 
            allCountries={allCountries} 
            countries={countries} 
            setCountries={setCountries} />
        </>}
    </>
  )
}

export default App