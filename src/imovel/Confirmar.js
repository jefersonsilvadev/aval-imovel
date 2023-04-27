import { Dialog, DialogTitle, DialogContent, DialogContentText, Button,DialogActions } from "@mui/material"

export default function Confirmar(props)
{
    function cancelar()
    {
        props.modificador(false);
        props.retorno(false);
    }

    function confirmar()
    {
        props.modificador(false);
        props.retorno(true);
    }

    return (
        <Dialog open={ props.abrir }>
            <DialogTitle>Confirmar Ação</DialogTitle>
            
            <DialogContent>
                <DialogContentText>
                    { props.texto }
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={ cancelar } >Cancelar</Button>
                <Button onClick={ confirmar } >Confirmar</Button>
            </DialogActions>

        </Dialog>
    )
}