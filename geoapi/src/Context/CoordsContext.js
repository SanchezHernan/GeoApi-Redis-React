import React, { useState } from 'react'

const CoordsContext = React.createContext({})

export function CoordsContextProvider ({children}) {
  const [latitud, setLatitud] = useState('')
  const [longitud, setLongitud] = useState('')
  
  return <CoordsContext.Provider value={{
    latitud,
    setLatitud,
    longitud,
    setLongitud
  }}>

    {children}
  </CoordsContext.Provider>
}

export default CoordsContext