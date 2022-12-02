import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";


export const ClientCreate=()=>{
    const [newclient,setNewClient]=useState({});
    const [clientCategory,setClientCategory]=useState([]);

    const { clientId } = useParams();

    const navegacion = useNavigate();

    useEffect(()=>{
        clientHttp.get(`/Cliente/${clientId}`)
            .then((response)=>{
                setNewClient(response.data);
                setLoading(false);
            });
    },[]);
    useEffect(()=>{
        clientHttp.get(`/ClienteCategoria`)
        .then((response)=>{
            setClientCategory(response.data); 
        });
    },[]);
   
    const handleSubmit= (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === false) {
            
            clientHttp.post(`/Cliente/?id=${clientId}`,newclient)
                .then((response)=>{
                    navegacion(`/admin/clients`)
                });
        }
    }
      
      const {identificacion,nombres,apellidos,telefonos,clienteCategoriaId} = client;
   
    return loading?<div>Loading data...</div>:
        <form className="row"  onSubmit={(e)=>handleSubmit(e)}>
            <div className="col-6">
                <label htmlFor="identificacion" className="form-label">Identificación</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="identificacion"
                    value={identificacion} required maxLength="30" />
                    <div className="invalid-feedback">
                        Identificación nueva
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="nombres" className="form-label">Nombres</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="nombres"
                    value={nombres}  required maxLength="80"  />
                    <div className="invalid-feedback">
                        Nombres nuevo
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="apellidos"
                    value={apellidos == null ? '' : apellidos}
                    onChange= {e => handleChange(e)} required maxLength="80" />
                    <div className="invalid-feedback">
                        Apellidos nuevo
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="telefonos" className="form-label">Teléfono </label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="telefonos"  
                        value={telefonos == null ? '' : telefonos}

                    />
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="clienteCategoriaId" className="form-label">Categoría</label>
                <select className="form-select" id="clienteCategoriaId" value={clienteCategoriaId} required >
                    <option disabled value="">Seleccionar Categoría</option>
                    { clientCategory.map((cat)=><option key={cat.id} value={cat.id} >{cat.nombre}</option>) } 
                </select>
                <div className="invalid-feedback">
                    Categoría es requerido
                </div>
            </div>
            
            <div className="col-12 mt-3">
               <button className="btn btn-secondary" type="button" onClick={(e)=>navegacion(`/admin/clients`)}>Cancelar</button>
                <button className="btn btn-primary ms-3" type="submit">Guardar Nuevo</button>
                
            </div>
        </form> 

    } 
    

export const ClientEdit=()=>{
    
    const [ client,setClient]=useState({});
    const [ clientCategory,setClientCategory]=useState([]);
    
    const [loading,setLoading]=useState(true);
    const { clientId } = useParams();

    const navegacion = useNavigate();

    useEffect(()=>{
        clientHttp.get(`/Cliente/${clientId}`)
            .then((response)=>{
                setClient(response.data);
                setLoading(false);
            });
    },[]);

    useEffect(()=>{
        clientHttp.get(`/ClienteCategoria`)
        .then((response)=>{
            setClientCategory(response.data); 
        });
    },[]);
    
    const handleChange = (event) => {
         const target = event.target;
         const value = target.type === "checkbox" ? target.checked : target.value;
         const name = target.id;         
         setClient((clientCurrent)=>({...clientCurrent,[name]: value}));
    };

        
    const handleSubmit= (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            //console.log("Enviar...");
            //console.log(client);
            clientHttp.put(`/Cliente/?id=${clientId}`,client)
                .then((response)=>{
                    navegacion(`/admin/clients`)
                });
        }
      }

    const {identificacion,nombres,apellidos,telefonos,clienteCategoriaId} = client;

    return loading?<div>Loading data...</div>:
        <form className="row"  onSubmit={(e)=>handleSubmit(e)}>
            <div className="col-6">
                <label htmlFor="identificacion" className="form-label">Identificación</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="identificacion"
                    value={identificacion} onChange= {e => handleChange(e)}   required maxLength="30" />
                    <div className="invalid-feedback">
                        Identificación es obligatoria
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="nombres" className="form-label">Nombres</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="nombres"
                    value={nombres}  onChange= {e => handleChange(e)} required maxLength="80"  />
                    <div className="invalid-feedback">
                        Nombres es obligatorio
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="apellidos"
                    value={apellidos == null ? '' : apellidos}
                    onChange= {e => handleChange(e)} required maxLength="80" />
                    <div className="invalid-feedback">
                        Apellidos es obligatorio
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="telefonos" className="form-label">Teléfono </label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="telefonos"  
                        value={telefonos == null ? '' : telefonos}
                        onChange= {e => handleChange(e)}
                    />
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="clienteCategoriaId" className="form-label">Categoría</label>
                <select className="form-select" id="clienteCategoriaId" value={clienteCategoriaId} required 
                    onChange= {e => handleChange(e)}>
                    <option disabled value="">Seleccionar Categoría</option>
                    { clientCategory.map((cat)=><option key={cat.id} value={cat.id} >{cat.nombre}</option>) } 
                </select>
                <div className="invalid-feedback">
                    Categoría es requerido
                </div>
            </div>
            
            <div className="col-12 mt-3">
               <button className="btn btn-secondary" type="button" onClick={(e)=>navegacion(`/admin/clients`)}>Cancelar</button>
                <button className="btn btn-primary ms-3" type="submit">Guardar</button>
                
            </div>
        </form> 
}


const ClientList=()=>{

    const [clients,setClients]=useState([]);

    const navegacion = useNavigate();

    useEffect(()=>{
        clientHttp.get(`/Cliente`)
        .then((response)=>{
            //console.log(response);
            setClients(response.data.lista); 
        });
    },[]);

    const handlerEditar=(client)=>{
        navegacion(`/admin/clients/${client.id}`)
    }

    return <table className="table">
        <thead>
        <tr>
            <th >Identificación</th>
            <th >Nombres/Apellidos</th>
            <th >Categoría</th>
            <th >Acciones</th>
        </tr>
        </thead>
        <tbody>
            {clients.map((cli)=>
                <tr key={cli.id}>
                    <td>{cli.identificacion}</td>
                    <td>{cli.nombres}/{cli.apellidos}</td>
                    <td>{cli.clienteCategoria}</td>
                    <td><button onClick={(e)=>handlerEditar(cli)}>Editar</button></td>
                </tr>)} 
        </tbody>
    </table>
}

export const ClienteDelete =()=>{
    const [ClienteId, setClienteId] = useState("");
    const [error, setError] = useState(null);
    const handleChange = (evt) => {
        setClienteId(evt.target.value);
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios({
            method: "delete",
            url: `https://localhost:7127/Cliente|2||=${ClienteId}`,
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
                <label htmlFor="ClienteId">Product Type ID</label>
                <input type="text" name="ClienteId" value={brandId} onChange={(evt) => handleChange(evt)}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}




export default function ClientsAdmin(){
      
    return <ClientList />
}