import Home from './dashboard/Home';
import CadastroImovel from './imovel/Cadastro';
import ListarImovel from './imovel/Listar'
import EditarImovel from './imovel/Editar'
import { carregaDados } from './imovel/Editar'

import {
    createBrowserRouter,
    RouterProvider,
    } from "react-router-dom";

const paginas = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/imoveis",
        element: <ListarImovel />
    },
    {
        path: "/imoveis/cadastro",
        element: <CadastroImovel></CadastroImovel>
    },
    {
        path: "/imoveis/editar/:id",
        element: <EditarImovel/>,
        loader: carregaDados
    }
]);

export default paginas;