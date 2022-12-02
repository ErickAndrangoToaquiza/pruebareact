import { Link } from "react-router-dom";



const Menu = (props) => {
  return (<nav className="navbar navbar-expand-lg bg-light">
    <ul className="navbar-nav">
        <li className="nav-item">
           <Link to="/products" className="nav-link">Productos</Link>
        </li>
        <li className="nav-item">
           <Link to="/Marcas" className="nav-link">Marcas</Link>
        </li>
        <li className="nav-item">
           <Link to="/productTypes" className="nav-link">Tipos de producto</Link>
        </li>
    </ul> 
   
  </nav>);
};

export default Menu;