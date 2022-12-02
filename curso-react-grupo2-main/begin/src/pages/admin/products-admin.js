import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import clientHttp from '../../services/ClientHttp';
import axios from "axios";
import { Product } from "../product/Product";
import CarroReducer from "../pages/CarroItems";

export const ProductCreate =()=>{

    const [product, setProduct] = useState({
        nombre: "",
        activo:true ,
        precio: 0,
        observaciones: "",
        caducidad: "",
        marcaId: "",
        tipoProductoId: ""
    });
    const handleProduct = (evt, field) => {
        setProduct((currentProduct) => ({...currentProduct, [field]:evt.target.value}));
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(product);
        axios({
            method: "post",
            url: "https://localhost:7127/Producto",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: product,
        }).then((res) => console.log(res))
            
    }
    return(
        <div>
            <h3>Crear</h3>
            <form onSubmit={(evt) => handleSubmit(evt)}>
                <label htmlFor="productName">Nombre</label>
                <input type="text" name="productName" value={product.nombre} 
                onChange={(evt) => handleProduct(evt, 'name')}/>

                <label htmlFor="productActivo">Activo</label>
                <input type="checkbox" name="productActivo" value={product.activo} 
                onChange={(evt) => handleProduct(evt, 'Activo')}/>

                <label htmlFor="productPrice">Precio</label>
                <input type="number" name="productPrice" value={product.precio} 
                onChange={(evt) => handleProduct(evt, 'price')}/>

                <label htmlFor="productNotes">observaciones</label>
                <input type="text" name="productNotes" value={product.observaciones} 
                onChange={(evt) => handleProduct(evt, 'notes')}/>

                <label htmlFor="productExpiration">Caducidad</label>
                <input type="date" name="productExpiration" value={product.caducidad}
                 onChange={(evt) => handleProduct(evt, 'expiration')}/>

                <label htmlFor="productBrand">Id Marca</label>
                <input type="text" name="productBrand" value={product.marcaId} 
                onChange={(evt) => handleProduct(evt, 'brandId')}/>

                <label htmlFor="productType">Id Tipo Producto</label>
                <input type="text" name="productType" value={product.tipoProductoId}
                 onChange={(evt) => handleProduct(evt, 'productTypeId')}/>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}


export const ProductEdit=()=>{
    
    const [product,setProduct]=useState({});
    const { productId } = useParams();

    useEffect(()=>{
        
        clientHttp.get(``)
            .then((response)=>setProduct(response.data))

    },[])
    
    return <form>
    <div className="col-md-4">
        <label for="validationCustomUsername" className="form-label">Username</label>
        <div className="input-group has-validation">
            <input type="text" className="form-control" id="validationCustomUsername"
            required />
            <div className="invalid-feedback">
                Please choose a username.
            </div>
        </div>
   </div>


    </form>
}


export const ProductList=()=>{
    
    
        const [products, setProducts] = useState([]);
        const [carro, dispatchCarro] = useReducer(CarroReducer, []);
        const updateProducts = () => {
            axios({
                method: "get",
                url: "https://localhost:7127/Producto",
                headers: {
                  "Content-Type": "application/json",
                },
            }).then((res) => setProducts(res.data))
        }
        useEffect(
            () => updateProducts(),
            []
        );
        return (
            <div>
            <ul> {
            carro.map(carroItem => 
            <carroItem key={carroItem.product.id}
                onAddQuanntity={() => dispatchCarro({type: "addQuantity", product: carroItem.product})} 
                onSubtract={() => dispatchCarro({type: "subtractQuantity", product: carroItem.product, quantity: carroItem.quantity})}
                onRemove={() => dispatchCarro({type: "removeProduct", product: carroItem.product})}
                                    item={carroItem} />)}
            </ul><button className="product-add-carro" onClick={() => updateProducts()}>Update</button><ul> {
            products.map(product =><Product
                key={product.id}
                onAdd={() => dispatchCarro({type: "addProduct", product: product})}{...product} />
                        )}
                </ul>
            </div>
        );
    }



export default function ProductAdmin(){
    return <ProductList/>
}