import { useEffect, useState } from "react"
import useCoords from "../../Hooks/useCoords"


const AddForm = ({grupo, addReady}) => {

    const [nombrePunto, setNombrePunto] = useState('')
    const [puntoLat, setPuntoLat] = useState('')
    const [puntoLng, setPuntoLng] = useState('')
    const {latitud, longitud} = useCoords()

    const cambiarNombre = (value) => setNombrePunto(value)
  
    const cambiarLat = (value) => setPuntoLat(value)

    const cambiarLong = (value) => setPuntoLng(value)

    const agregarPunto = () => {
        fetch(`http://localhost:3000/agregar/${grupo}/${puntoLat}/${puntoLng}/${nombrePunto}`)
        alert('exito')
        addReady(true)
    }


    useEffect(() => {
        setPuntoLat(latitud);
        setPuntoLng(longitud);
    }, [latitud, longitud])


    return(
        <div className='cont2 inputs mt-2'>
            <label>Nombre del Punto</label>
            <input className='form-control w100 mb-3' value={nombrePunto} onChange={(e) => cambiarNombre(e.target.value)}/>
            <label>Latitud</label>
            <input className='form-control w100 mb-3' value={puntoLat} onChange={(e) => cambiarLat(e.target.value)}/>
            <label>Longitud</label>
            <input className='form-control w100 mb-3' value={puntoLng} onChange={(e) => cambiarLong(e.target.value)}/>
            <button className='btn btn-outline-info w100 mt-3' onClick={agregarPunto}>Agregar Punto</button>
        </div>
    )
}

export default AddForm