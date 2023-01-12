import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import './css/CountryList.css'
import { useParams, useNavigate } from 'react-router-dom';
import CountryCard from './CountryCard'

const Region = ({allCountries, countries, setCountries}) => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const perPage = 8;
    const {region} = useParams()
    const [continent, setContinent] = useState(null)

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => {
            setContinent(response.data)
            console.log(response.data)
        })
    }, [region])
    if (continent === null) return


    const handleChange = (event, value) => {
        setPage(value);
    };
    const pagedContinent = continent.slice((page - 1) * perPage, page * perPage);



      return (
        <>
        <div className="region-container">
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
      )
     }


export default Region;
