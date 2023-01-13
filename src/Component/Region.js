import React, {Fragment, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import './css/CountryList.css'
import { useParams, useNavigate } from 'react-router-dom';
import CountryCard from './CountryCard'
import useFetch from './Hook/useFetch'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Region = ({allCountries, countries, setCountries}) => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const perPage = 8;
    const {region} = useParams()
    const {data: continent, loading} = useFetch(`https://restcountries.com/v3.1/region/${region}`)

    const handleChange = (event, value) => {
        setPage(value);
    };
    const pagedContinent = continent.slice((page - 1) * perPage, page * perPage);
    
    
    if (continent === null) return
      return (
        <Fragment>
            {loading ?  
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> : 
            <>
                <div style={{textAlign: 'center'}}>
                <h1>{continent.length} Countries in {region}</h1>
                <button className='go-back-btn' onClick={
                    () => navigate('/')
                }>Go Back to All Countries</button>
                
                </div>
                <ul className='country-list'>
                    {pagedContinent.map(country => (
                        <li className='list-container' key={Math.random() * 100}>
                        <CountryCard country={country}/>
                        </li>
                    ))}
                </ul>
                <Pagination 
                    className="pagination" 
                    count={Math.ceil(continent.length/perPage)}  
                    page={page} 
                    onChange={handleChange} 
                />
                </>
                }
        </Fragment>
      )
     }


export default Region;
