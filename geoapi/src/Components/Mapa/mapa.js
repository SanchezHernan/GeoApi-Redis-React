import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"


const Mapa = (props) => {


    return(
        <GoogleMap
            defaultZoom={15}
            center={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
            onClick={(e) => props.getLatLng(e.latLng)}
        >
            {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
        </GoogleMap>
    )
}

export default withScriptjs(
    withGoogleMap( Mapa )
)
  

