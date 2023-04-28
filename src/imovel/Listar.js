import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { app } from '../firebase'
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

import { useEffect, useState } from 'react';

import Confirmar from './Confirmar'


// conexão com o banco de dados
const db = getFirestore(app);

export default function Listar()
{
    const [imoveis, setImoveis] = useState([]);
    const [dialogo, abrirDialogo] = useState(false);
    const [confirmar, setConfirmar] = useState();
    const [idSelecionado, setIdSelecionado] = useState();

    async function carregar() 
    {
        const resultado = await getDocs(collection(db, "imoveis"));
        const novo = resultado.docs.map(function(item) {
            let retorno = item.data();
            retorno.id = item.id;
            return retorno
        }); 

        if (imoveis.length == 0) {
            setImoveis(novo);
            console.log(novo);
        }
        
    }

    useEffect(() => {

        let ignore = false;

        carregar();

        return () => {
            ignore = true
        }
    }, [imoveis]);


    function deletar(id)
    {
        setIdSelecionado(id);
        setConfirmar(null);
        abrirDialogo(true);
    }

    async function removerFirebase(id)
    {
        await deleteDoc(doc(db, "imoveis", id));
        setImoveis([]);
        carregar();
        setConfirmar(null);
    }

    // executa na proxima atualização
    if (confirmar == true)
    {
        removerFirebase(idSelecionado);        
    }


    return (
        <Grid container spacing={3}>
            <Grid item>
                <Button href="/imoveis/cadastro" variant="contained">Cadastrar Novo</Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    
                }}
            >
                
                <Confirmar 
                    abrir={dialogo} 
                    texto="Deseja realmente deletar o imovel?" 
                    modificador={abrirDialogo}
                    retorno={setConfirmar}
                />
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Data de Cadastro</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { imoveis.map(function(item) {
                            
                            // Link dinâmico baseado no ID
                            const link = '/imoveis/editar/' + item.id;

                            return (
                        <TableRow key={ item.codigo }>
                            <TableCell>{ item.codigo }</TableCell>
                            <TableCell>{ item.endereco }</TableCell>
                            <TableCell>{  item.valor_imovel.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) }</TableCell>
                            <TableCell>{  item.data_cadastro.toDate().toLocaleString()  }</TableCell>
                            <TableCell> 
                                <IconButton onClick={ () => { deletar(item.id) }}><DeleteIcon /></IconButton>
                                <IconButton href={link} > <EditIcon /> </IconButton>
                            </TableCell>
                        </TableRow>
                            )
                        
                        }) 
                        }
                        
                    </TableBody>
                </Table>

                </Paper>
            </Grid>
        </Grid>
    )
}