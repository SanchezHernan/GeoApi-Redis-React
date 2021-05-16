import { useContext } from "react"
import CoordsContext from '../Context/CoordsContext'


export default function useCoords () {
    const {latitud, setLatitud, longitud, setLongitud} = useContext(CoordsContext)

    const setLatLng = (latLng) => {
        setLatitud(latLng.lat())
        setLongitud(latLng.lng())
    }

    return {
        latitud, setLatLng, longitud
    }

}