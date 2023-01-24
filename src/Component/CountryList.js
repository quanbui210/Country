import React, {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import './css/CountryList.css'
import CountryCard from './CountryCard'

const CountryList = ({allCountries, countries, setCountries}) => {
    const [page, setPage] = useState(1);
    const perPage = 8;


    const handleChange = (event, value) => {
        setPage(value);
    };

    const pagedCountries = allCountries.slice((page - 1) * perPage, page * perPage);

    if (countries.length > 0 && countries.length < 8) {
       return <ul className='country-list'>
       {countries.map(country => (<li className='list-container' key={Math.random() * 100}>
       <CountryCard country={country}/>
       </li>))}
     </ul>
     } 
      return <>
        <ul className='country-list'>
        {pagedCountries.map(country => (
        <li className='list-container' key={Math.random() * 100}>
            <CountryCard country={country}/>
        </li>))}
        </ul>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
     <Pagination 
        className="pagination" 
        count={Math.ceil(allCountries.length/perPage)}  
        page={page} 
        onChange={handleChange} 
     />
    </div>
      </> 
     }


export default CountryList;



