import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import './css/Country.css'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useNavigate} from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import useFetch from './Hook/useFetch'


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const Country = () => {
    const {name} = useParams()
    const navigate = useNavigate();
    const [country, setCountry] = useState(null)
    const [expanded, setExpanded] = React.useState(false);
    // const officialNativeName = Object.values(country.nativeName).find(({ official }) => official);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => setCountry(response.data[0]))
        window.scrollTo(0, 0)
    }, [name])
    if (country === null) return


    return (
    <div className="country-container">
    <Card className="country-container-card" sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'rgb(161, 161, 161)' }} aria-label="">
            {country.flag}
          </Avatar>
        }
        title={name}
        subheader={country.capital}
      />
      <CardMedia
        component="img"
        height="194"
        image={country.flags.png}
        alt="flag"
      />
      <CardContent>
        <p variant="body2" color="text.secondary">
            <b><i>{name}</i></b> is a country located in the <b><i>{country.subregion}</i></b> sub-region of <b><i>{country.region}</i></b>,
            it has the area of <i>{country.area}</i> km2 and population of <i>{country.population}</i> people.
        </p>
      </CardContent>
      <CardActions disableSpacing>
        <button className="return-btn"
            onClick={()=> navigate('/') }
        >
            <KeyboardReturnIcon/>
        </button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <p style={{transform: 'rotate(180deg)'}} className="detail">See less</p> : 
          <p className="detail">See more</p>}
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <ul>
                <li>Sub-region: {country.subregion}</li>
                <li>Area: {country.area}</li>
                <li>Population: {country.population}</li>
                <li>Time Zone: {country.timezones[0]}</li>
            </ul>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    )
}

export default Country