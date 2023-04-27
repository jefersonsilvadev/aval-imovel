import { Form, useLoaderData } from "react-router-dom";

export function carregaDados(req)
{
    const id = req.params.id;
    console.log(id)
    return id;
} 

export default function Editar()
{
    const valor = useLoaderData();
    
    return (
        <div>editar {valor} </div>
    )
}