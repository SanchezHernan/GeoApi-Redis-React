import {Link} from 'react-router-dom'
import './home.css'

const Home = () => {
    return(
        <div className='home'>
            <h1>API GEOLOCALIZACION REDIS</h1>
            <br/>
            <h3>Opciones:</h3>
            <Link to='/agregar' className='btn btn-outline-info mb-2'>Agregar Punto de Interes</Link>
            <Link to='/buscar' className='btn btn-outline-info'>Buscar Puntos Cercanos</Link>
        </div>
    )
}

export default Home