import React, { useState } from 'react'
import Mapa from '../Mapa/mapa'
import useCoords from '../../Hooks/useCoords'

import './mapContainer.css'

const MapContainer = ({description, getLatLng}) => {

    const MY_API_KEY = process.env.REACT_APP_API_KEY
    const MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${MY_API_KEY}`


    const [buscado, setBuscado] = useState('Concepcion del Uruguay')
    const [lat, setLat] = useState('-32.4846566')
    const [lng, setLng] = useState('-58.2321214')
    const {setLatLng} = useCoords()

    const changeBuscado = (value) => setBuscado(value)

    const updateCoordinates = async() => {
        const encodedAddress = encodeURI(buscado)
        // fetches data from our api
        const resp = await fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${encodedAddress}`, {
            "method": "GET",
            "headers": {
            "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY
            }
        })
        const latLng = await resp.json()
        setLat(latLng.results[0].geometry.location.lat)
        setLng(latLng.results[0].geometry.location.lng)
    }


    const changeLatLng = (latLng) => setLatLng(latLng)


    return(
        <div className='map-container'>
            
            <small className='description'>{description}</small>
            <div id="floating-panel">
                <input id="address" type="textbox" value={buscado} onChange={(e) => changeBuscado(e.target.value)}/>
                <button type="button" onClick={updateCoordinates}>Buscar</button>
            </div>
            <Mapa
                googleMapURL = {MAPS_URL}
                containerElement = {<div style={{height: '400px', minWidth: '400px'}} />}
                mapElement = {<div style={{height:'100%', width:'100%'}} />}
                loadingElement = {<p>Cargando</p>}
                lat={lat}
                lng={lng}
                getLatLng={changeLatLng}
            />
        </div>
    )
}

//-32.4846566, -58.2321214

export default React.memo(MapContainer)
