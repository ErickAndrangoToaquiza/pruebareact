//import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../componentes/layout";
import ClientsAdmin, { ClientEdit } from "../pages/admin/clients-admin";
import ProductAdmin from "../pages/admin/products-admin";
import TypeProductAdmin from "../pages/admin/type-products-admin";
import MarcaAdmin, { MarcaEdit } from "../pages/admin/marca";
export default [
    {
        name: "Administración Productos ",
        key:"products-admin",
        route: "/admin/products",
        component: <ProductAdmin />,
        showLink:true
    },
    {
        name: "Tipos de Productos",
        key:"type-products-admin",
        route: "/admin/type-products",
        component: <TypeProductAdmin />,
        showLink:true
    }
    ,
    {
        name: "Clientes",
        key:"clients-admin",
        route: "/admin/clients",
        component: <ClientsAdmin  />,
        showLink:true
    },
    {
        name: "Editar Clientes ",
        key:"clients-edit-admin",
        route: "/admin/clients/:clientId",
        component: <ClientEdit  />,
        showLink:false
    },
    {
        name: "Marca",
        key:"marca",
        route: "/admin/marca",
        component: <MarcaAdmin />,
        showLink:true
    },
    {
        name: "Editar Marca",
        key:"marca-edit",
        route: "/marca/:marcaId",
        component: <MarcaEdit />,
        showLink:false
    }
];