import {useNavigate} from 'react-router-dom'


const Error = () => {
    const navigate = useNavigate()
    return <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <h1>Write a more specific country name before press enter, too many results {':('}</h1>
        <button 
            style={{
                padding: '4px',
                border: '1px solid #fff',
                backgroundColor: '#fff',
                borderRadius: '3px'
            }}
            onClick={() => navigate('/')}>Back To Home Page</button>
        </div>
}

export default Error