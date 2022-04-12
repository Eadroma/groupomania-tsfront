import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';

type LocalUserInfo = {
    id: string;
    token: string;
};

const addItemLocalStorage = (item: LocalUserInfo) => {
    let data = localStorage.getItem('user');
    console.log(data);
    console.log(item);
    if (!data) {
        localStorage.setItem('user', JSON.stringify(item));
        return true;
    }
    // error handling (existant item)
    return false;
};

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Groupomania
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const loStorage = getItemLocalStorage();
    if (loStorage && loStorage.token) {
        window.location.href = '/';
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const api = 'https://groupomania-myback.herokuapp.com/api/auth/register';
        const resp = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.get('email'), password: data.get('password') }),
        });
        if (resp.status == 400) {
            window.alert('An error occured');
        } else {
            const result = await resp.json();
            const { id, token } = result;
            const localUser = { id, token };
            const lo = addItemLocalStorage(localUser);
            console.log(lo);
            if (lo) window.location.href = '/';
            else {
                window.alert('vous êtes déjà inscrit et connecté !');
                return;
            }
        }
    };

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
                    <Avatar
                        sx={{ m: 1 }}
                        src="https://res.cloudinary.com/datxh7pfw/image/upload/v1647294068/Groupomania/icon_xtpuvo.svg"
                        alt="Groupomania Logo"
                    />
                    <Typography component="h1" variant="h5">
                        Inscription
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
