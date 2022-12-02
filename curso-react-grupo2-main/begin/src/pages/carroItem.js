export const CarroItem = ({item,onSubtract,onRemove,}) => {
    return (
        
            <div className="carro-item-info">
                <div className="carro-item-details">
                    <div className="carro-item-header">
                        <h3>{item.product.nombre}</h3>
                    </div>
                    <div className="carro-item-body">
                        <p>{item.product.observaciones}</p>
                    </div>
                </div>
                <div className="carro-item-actions">
                    <p>Cantidad: {item.quantity}</p>
                    <button onClick={() => onAddQuanntity()}>+</button>
                    <button onClick={() => onSubtract()}>-</button>
                    <button onClick={() => onRemove()}>Borrar</button>
                </div>
            </div>
       
    );
}

export function CarroReducer (state, action) {
    switch (action.type) {
        case "addProduct":
            let product = action.product;
            let filtered = state.filter(i => i.product === product);
            if (filtered.length === 0) {
                var carroItem = {
                    product: product,
                    quantity: 1
                };
                return [...state, carroItem]
            }else{
                let newState = state.map(carroItem => carroItem.product.id === product.id ?
                    ({...carroItem, quantity: carroItem.quantity + 1}) : (carroItem)    
                );
                return newState;
            }
        case "removeProduct":
            let productId = action.product.id;
            let newState = state.filter(carroItem => carroItem.product.id !== productId );
            return (newState);

        case "addQuantity":
            let newList = state.map(carroItem => 
                carroItem.product.id === action.product.id ?
                ({...carroItem, quantity: carroItem.quantity + 1}):
                (carroItem)    
            );
            return newList;
            }
}
