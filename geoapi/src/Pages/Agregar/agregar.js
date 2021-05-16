import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Select from '../../Components/Select/select'
import MapContainer from '../../Components/MapContainer/mapContainer'
import AddForm from '../../Components/AddForm/addForm'

import './agregar.css'

const Agregar = () => {

    
    const [addMode, setAddMode] = useState(false)
    
    const [grupoSeleccionado, setGrupoSeleccionado] = useState('')

    
    const seleccionarGrupo = (value) => setGrupoSeleccionado(value)

   const changeMode = () => setAddMode(!addMode)
    

    useEffect(() => {
        const fetchData = async() => {
            const resp = await fetch(`http://localhost:3000/`)
            const data = await resp.json()
            setGrupoSeleccionado(data[0])
        }
        fetchData()
    }, [])


    return(
        <div className='agregar'>
            {!addMode ? 
                <div className='column-content'>
                    <h1>Agrega Puntos de Interes</h1>
                    <br/>
                    <Select
                        handleChange={seleccionarGrupo}
                    />
                    <button className='btn btn-outline-info mt-3' onClick={changeMode}>Seleccionar</button>
                </div>
            :
                <div className='column-content'>
                    <h2>Agregar Punto de Interes a {grupoSeleccionado}</h2>
                    <div className='row-content'>
                        <AddForm
                            grupo={grupoSeleccionado}
                            addReady={changeMode}
                        />
                        <div className='cont3 ml-3'>
                            <MapContainer
                                description='Clickea en el mapa para obtener las coordenadas'
                            />
                        </div>
                    </div>
                </div>
            }
            <div className='column-content'>
                <Link to='/' className='btn btn-outline-info mt-3 w100'>Volver al Menu</Link>
            </div>            
        </div>
    )
}

export default Agregar

//-32.4846566, -58.2321214