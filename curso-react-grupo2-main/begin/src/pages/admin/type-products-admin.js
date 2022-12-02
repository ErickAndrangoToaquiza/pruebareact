import { useState } from "react";
import axios  from "axios";

export const TipoProductoCreate = () => {
    const [nombre, setNombre] = useState("");
    const handleName = (evt) => {
        setNombre(evt.target.value)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const newTipoProducto = {
            name: nombre
        }
        axios({
            method: "post",
            url: "https://localhost:7127/TipoProducto",
            headers: {
              "Content-Type": "application/json",
            },
            data: newTipoProducto,
        }).then((res) => console.log(res))
            
    }
    return(
        <div>
            <h3>Crear</h3>
            <form onSubmit={(evt) => handleSubmit(evt)}>
                <label htmlFor="productTypeName">Nombre</label>
                <input type="text" name="productTypeName" value={nombre} onChange={(evt) => handleName(evt)}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export const TipoProductoEdit = () => {
    const [tipoProductoId, setTipoProductoId] = useState("");
    const [tipoProductoNombre, setTipoProductoNombre] = useState("");
    const [error, setError] = useState(null);
    const handleIdChange = (evt) => {
        setTipoProductoId(evt.target.value);
    }
    const handleNameChange = (evt) => {
        setTipoProductoNombre(evt.target.value);
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const requestData = {
            name: tipoProductoNombre
        }
        axios({
            method: "put",
            url: `https://localhost:7127/TipoProducto=${tipoProductoId}`,
            headers: {
              "Content-Type": "application/json",
            },
            data: requestData
        }).then((res) => {
            console.log(res);
            setError(null);
        })
        .catch((error) => setError({
                message: error.message
            }
        ))
    }
    return (
        <div>
            <h3>Actualizar</h3>
            { error && <p>error: {error.message}</p> }
            <form onSubmit={(evt) => handleSubmit(evt)}>
                <label htmlFor="productTypeId">Id </label>
                <input type="text" name="productTypeId" value={tipoProductoId} onChange={(evt) => handleIdChange(evt)}/>
                <label htmlFor="productTypeName">Nombre</label>
                <input type="text" name="productTypeName" value={tipoProductoNombre} onChange={(evt) => handleNameChange(evt)}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export const TipoProductoList = () => {
    const [typesList, setTypesList] = useState([]);

    const update = () => {
        axios({
            method: "get",
            url: "https://localhost:7127/TipoProducto",
            headers: {
              "Content-Type": "application/json",
            },
        }).then((res) => setTypesList(res.data))
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
                    typesList.map(type => <li key={type.id}>Id: {type.id} Nombre: {type.name}</li>)
                }
            </ul>
        </div>
    );
}
export const TipoProductoDelete = () => {
    const [tipoProductoId, setTipoProductoId] = useState("");
    const [error, setError] = useState(null);
    const handleChange = (evt) => {
        setTipoProductoId(evt.target.value);
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios({
            method: "delete",
            url: `https://localhost:7127/TipoProducto=${tipoProductoId}`,
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
                <label htmlFor="productTypeId">Tipo de Producto </label>
                <input type="text" name="productTypeId" value={tipoProductoId} onChange={(evt) => handleChange(evt)}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default function TypeProductAdmin(){
    return <>TypeProductAdmin</>
}