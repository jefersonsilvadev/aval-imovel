import { Form, useLoaderData } from "react-router-dom";

import { app } from '../firebase'
import { getFirestore, setDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '@mui/material';
import Box from '@mui/material/Box'
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

// conexão com o banco de dados
const db = getFirestore(app);


export async function carregaDados(req)
{
    const id = req.params.id;
    
    const ref = doc(db, "imoveis", id);
    const registro = await getDoc(ref);

    if (registro.exists())
    {
        let dados = registro.data();
        dados.id = registro.id; 
        return dados;
    } else {
        return { erro: "Registro não encontrado"}
    }
} 

export default function Editar()
{
    const valor = useLoaderData();

console.log(valor);

    const [novoImovel, setNovoImovel] = useState(valor)
    const [carregando, setCarregando] = useState(false)

    function alteraImovel(evento)
    {
        let campo = evento.target.name;
        let valor = evento.target.value;

        
        novoImovel[campo] = valor;

        setNovoImovel(novoImovel)        

    }

    async function salvar()
    {
        setCarregando(true)
        
        const novo = doc(db, "imoveis", novoImovel.id);
        await setDoc(novo, novoImovel);

        setCarregando(false);
        window.location.pathname = "/imoveis";
    }
    
    const geoloc = (valor.geoloc)? valor.geoloc.latitude + "," + valor.geoloc.longitude: "";

    let extras = "";

    if (valor.extras)
    {
        extras = valor.extras.map((item) => {
            return (
                <Chip label={item} key={item}/>
            )
        })
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Box 
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    
                >
                    <TextField defaultValue={valor.codigo} onChange={alteraImovel} label="Código" margin="normal" name='codigo' />
                    <TextField defaultValue={valor.descricao} onChange={alteraImovel} name="descricao" label="Descrição" margin="normal"  multiline rows={4} />
                    <TextField defaultValue={valor.endereco} onChange={alteraImovel} name="endereco" label="Endereço" margin="normal"  />
                    <TextField defaultValue={valor.quartos} onChange={alteraImovel} name="quartos" label="Quartos" margin="normal"  />
                    <TextField defaultValue={valor.tipo} onChange={alteraImovel} name="tipo" label="Tipo" margin="normal" select >
                        <MenuItem value="AP">Apartamento</MenuItem>
                        <MenuItem value="SB">Sobrado</MenuItem>
                        <MenuItem value="LJ">Loja</MenuItem>
                        <MenuItem value="CS">Casa</MenuItem>
                    </TextField>
                    <TextField defaultValue={valor.valor_imovel} onChange={alteraImovel} name="valor_imovel" label="Valor do Imovel" margin="normal"  />
                    <TextField defaultValue={ geoloc } onChange={alteraImovel} name="geoloc" label="Geolocalização" margin="normal"  />
                    <TextField defaultValue={valor.extras} onChange={alteraImovel} name="extras" label="Extras" margin="normal"  />
                    
                    {
                        extras
                    }

                    { (carregando == true)? 
                        <Button disabled variant="contained">Enviando</Button> :
                        <Button onClick={ salvar } variant="contained">Confirmar</Button>
                    }

                </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}