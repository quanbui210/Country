import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import './css/CountryCard.css'


const CountryCard = ({country}) => {
    const navigate = useNavigate()

    let nativeNameArr;
    let nativeName;
    if (country && country.name.nativeName) {
      nativeNameArr = Object.values(country.name.nativeName)
      nativeName = nativeNameArr[0].official
    }
    return <div>
        <Card className='country-card' sx={{ maxWidth: 345 }}>
        <CardMedia
            className='country-flag'
            component="img"
            alt="flags"
            height="140"
            image={country.flags.png}
        />
        <CardContent>
            <div style={{ minHeight: '80px'}}>
                <h3>{country.name.common}</h3>
                <p style={{
                    fontSize: '12px', 
                    fontStyle: 'italic', 
                    fontWeight: '900',
                    color: 'grey'
                }}>{nativeName}</p>
            </div>
            <div className="card-info" variant="body2" color="text.secondary">
               
                    <p>Region: {country.region}</p>
                    <p>area: {country.area}km2</p>
                    <p>Population: {country.population}</p>

            </div>
        </CardContent>
        <CardActions>
            <Button 
                onClick={()=> {
                    navigate(`/country/${country.name.common}`)
                }}
                size="small" 
                className='card-btn'>
                    <TravelExploreIcon className="view-icon"/>
            </Button>
        </CardActions>
    </Card>
    </div>
}

export default CountryCard