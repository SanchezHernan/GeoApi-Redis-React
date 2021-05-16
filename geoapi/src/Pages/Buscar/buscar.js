import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MapContainer from '../../Components/MapContainer/mapContainer'
import Select from '../../Components/Select/select'
import useCoords from '../../Hooks/useCoords'

import './buscar.css'

const Buscar = () => {

    const [grupoSeleccionado, setGrupoSeleccionado] = useState('')
    const [modoBuscar, setModoBuscar] = useState(false)
    const [listado, setListado] = useState([])
    const {latitud, longitud} = useCoords()

    const seleccionarGrupo = (value) => setGrupoSeleccionado(value)

    const changeMode = () => setModoBuscar(!modoBuscar)

    const buscar = async() => {
        const resp = await fetch(`http://localhost:3000/radio/withdist/${grupoSeleccionado}/${latitud}/${longitud}`)
        const dlist = await resp.json()
        setListado(dlist)
    }


    useEffect(() => {
        const fetchData = async() => {
            const resp = await fetch(`http://localhost:3000/`)
            const data = await resp.json()
            setGrupoSeleccionado(data[0])
        }
        fetchData()
    }, [])


    return(
        <div className='buscar'>
            {!modoBuscar ?
                <div>
                    <Select
                        handleChange={seleccionarGrupo}
                    />
                    <button className='btn btn-outline-info mt-3 w100' onClick={changeMode}>Seleccionar</button>
                    <Link to='/' className='btn btn-outline-info mt-3 w100'>Volver al Menu</Link>
                </div>
            :
                <div>
                    <h2>Buscar {grupoSeleccionado} a tu alrededor</h2>
                    <div className='column-content'>
                        <MapContainer
                            description='Clickea en el mapa para obtener tus coordenadas'
                        />
                        <div className='row-column'>
                            <p>Tus coordenadas: </p>
                            <small className='description mr-3'>Latitud: {latitud}</small>
                            <small className='description ml-3'>longitud: {longitud}</small>
                        </div>
                        <button className='btn btn-outline-info mt-3' onClick={buscar}>Buscar</button>
                        
                        <ul className='list-group mt-3'>
                            {listado.map(punto => 
                                <li className='list-group-item buscarlist' key={punto[0]}>
                                    <span className='w50'>{punto[0]}</span>
                                    <span className='w50'>Distancia: {punto[1].substring(0, 4)}km</span>
                                </li>
                            )}
                        </ul>
                        <button className='btn btn-outline-info mt-3' onClick={changeMode}>Cerrar Busqueda</button>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default Buscar