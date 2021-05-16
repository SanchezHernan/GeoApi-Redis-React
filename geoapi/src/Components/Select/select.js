import { useEffect, useState } from "react"


const Select = ({handleChange}) => {

    const [grupos, setGrupos] = useState([])


    useEffect(() => {
        const fetchData = async() => {
            const resp = await fetch(`http://localhost:3000/`)
            const data = await resp.json()
            console.log(data);
            setGrupos(data)
        }
        fetchData()
    }, [])


    return(
        <div>
            <select className="form-select" aria-label="Default select example" onChange={(e) => handleChange(e.target.value)}>
                {grupos.map(punto => 
                    <option value={punto} key={punto}>{punto}</option>
                )}
            </select>
        </div>
    )
}

export default Select