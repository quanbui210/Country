import React from 'react'
import './css/Filter.css'
import {useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

const Filter = ({value, onChange, allCountries, disabled}) => {
    const allNames = allCountries.map(country => country.name.common)
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        if (value === '') {
            window.alert('Country name cannot be empty')
            return;
        }
        const filteredNames = allNames.filter(name => name.toLowerCase() === value.toLowerCase())
        console.log(filteredNames.length)
        if (filteredNames.length === 0) {
            navigate(`/country/`)
        }
        navigate(`/country/${filteredNames}`)
      };
    
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
        handleSearch(e);
        }
    };

    return (
    <div className="filter-container">
        <p className="filter-text"></p> 
        <input 
            className="filter-input" 
            value={value} 
            onChange={onChange} 
            placeholder='Find countries...'
            onKeyDown={handleKeyDown}
        />
        <button
           disabled={disabled}
           className='filter-search-btn'        
           onClick={handleSearch}>
                    <SearchIcon/>
        </button>
    </div>
    )
}

export default Filter