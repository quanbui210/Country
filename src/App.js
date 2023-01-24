import React, { useState, Fragment } from 'react'
import CountryList from './Component/CountryList'
import Filter from './Component/Filter'
import { useNavigate, NavLink } from 'react-router-dom'
import './App.css'
import useFetch from './Component/Hook/useFetch'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';




const App = () => {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [error, setError] = useState(false)
  const {data: allCountries, loading} = useFetch('https://restcountries.com/v3.1/all')
  console.log(loading)

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
    <Fragment>
        {loading ?  
          <Box className='country-container'>
            <CircularProgress />
          </Box> : 
      <>
        <div style={{textAlign: 'center', margin: '36px 0'}}>
          {regions.map(region => 
          <NavLink
            className='region-select-btn'
            key={region}
            to={`/region/${region}`}
          >
            {region}
          </NavLink> )}
        </div>
            <Filter 
              allCountries={allCountries} 
              value={newFilter} 
              onChange={handleFilterChange} 
              disabled={error}
              />
        {error ? <h3 style={{textAlign: 'center'}}>No Country Match Your Search</h3> : <>
            <h1 style={{textAlign: 'center'}}>All Countries</h1>
            <CountryList 
              newFilter={newFilter} 
              allCountries={allCountries} 
              countries={countries} 
              setCountries={setCountries} />
          </>} 
      </> }
    </Fragment>
  )
}

export default App