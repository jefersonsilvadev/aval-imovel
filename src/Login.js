import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert'

import { app } from './firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const theme = createTheme();

export default function Login(props) {
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [msgErro, setMsgErro] = React.useState("");

    async function logar() {
        try {
            const auth = getAuth(app)
            const resposta = await signInWithEmailAndPassword(auth, email, senha);

            props.status('true');
            window.sessionStorage.setItem("logado", true);

            console.log(resposta);
        } catch (erro) {
            const tipoErro = erro.code;

            if (tipoErro == "auth/missing-password") {
                setMsgErro("A senha esta em branco");
            } else if (tipoErro == "auth/invalid-email") {
                setMsgErro("Email inválido")
            } else if (tipoErro == "auth/user-not-found") {
                setMsgErro("Usuario ou Senha incorretos");
            }

        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Entrar no Sistema
                    </Typography>

                    {(msgErro.length > 0) ? <Alert severity="error">{msgErro}</Alert> : ""}

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(evento) => { setEmail(evento.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(evento) => { setSenha(evento.target.value) }}
                        />

                        <Button

                            onClick={logar}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}