import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";



export const MarcaCreate =()=>{

  
        const [name, setName] = useState("");
        const handleName = (evt) => {
            setName(evt.target.value)
        }
        const handleSubmit = (evt) => {
            evt.preventDefault();
            const newMarca = {
                name: name
            }
            axios({
                method: "post",
                url: "https://localhost:7127/Marca",
                headers: {
                  "Content-Type": "application/json",
                },
                data: newMarca,
            }).then((res) => console.log(res))
                
        }
        return(
            <div>
                <p>Nueva Marca</p>
                <form onSubmit={(evt) => handleSubmit(evt)}>
                    <label htmlFor="MarcaName">Nombre Nueva Marca</label>
                    <input type="text" name="MarcaName" value={name} onChange={(evt) => handleName(evt)}/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    

}
export const MarcaEdit=()=>{

    
        const [marcaId, setMarcaId] = useState("");
        const [marcaName, setMarcaName] = useState("");
        const [error, setError] = useState(null);
        const handleIdChange = (evt) => {
            setMarcaId(evt.target.value);
        }
        const handleNameChange = (evt) => {
            setMarcaName(evt.target.value);
        }
        const handleSubmit = (evt) => {
            evt.preventDefault();
            const requestData = {
                name: marcaName
            }
            axios({
                method: "put",
                url: `https://localhost:7127/Marca=${marcaId}`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: requestData
            }).then((res) => {
                console.log(res);
                setError(null);
            })
            .catch((error) => setError({
                    // message: error.response.data
                    message: error.message
                }
            ))
        }
        return (
            <div>
                <p>Actualizar la marca</p>
                { error && <p>Ha ocurrido un error: {error.message}</p> }
                <form onSubmit={(evt) => handleSubmit(evt)}>
                    <label htmlFor="marcaId">Id </label>
                    <input type="text" name="marcaId" value={marcaId} onChange={(evt) => handleIdChange(evt)}/>
                    <label htmlFor="marcaName">Nombre</label>
                    <input type="text" name="marcaName" value={marcaName} onChange={(evt) => handleNameChange(evt)}/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
    export const MarcaList = () => {
        const [marcaList, setMarcaList] = useState([]);
    
        const update = () => {
            axios({
            method: "get",
            url: "https://localhost:7127/Marca",
             headers: {
             "Content-Type": "application/json",
            },
         }).then((res) => setMarcaList(res.data))
    }
           
    
        useEffect(
            () => update(),
            []
        );
        return (
            <div>
                <button onClick={() => update()}>Update</button>
                <ul>
                    {
                        marcaList.map(marca => <li key={marca.id}>Id: {marca.id} Nombre: {marca.name}</li>)
                    }
                </ul>
            </div>
        );
    }
    export const MarcaDelete = () => {
        const [marcaId, setMarcaId] = useState("");
        const [error, setError] = useState(null);
        const handleChange = (evt) => {
            setMarcaId(evt.target.value);
        }
        const handleSubmit = (evt) => {
            evt.preventDefault();
            axios({
                method: "delete",
                url: `https://localhost:7127/Marca=${marcaId}`,
                headers: {
                  "Content-Type": "application/json",
                },
            }).then((res) => {
                console.log(res);
                setError(null);
            })
            .catch((error) => setError(
                {
                    message: error.message
                }
            ))
        }
        return (
            <div>
                <h3>Borrar</h3>
                { error && <p>Ha ocurrido un error: {error.message}</p> }
                <form onSubmit={(evt) => handleSubmit(evt)}>
                    <label htmlFor="marcaId">Product Type ID</label>
                    <input type="text" name="marcaId" value={marcaId} onChange={(evt) => handleChange(evt)}/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
    export default function MarcaAdmin(){
      
        return <MarcaList />
    }

   

