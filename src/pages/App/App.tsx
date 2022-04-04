import * as React from 'react';
import {
    Avatar,
    Checkbox,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../../components/Sidebar/Sidebar';
import './App.scss';
import addPost from '../../components/addPost/addPost';
import navBar from '../../components/Navbar/navBar';
import AllPosts from '../../components/Posts/posts';

type LocalUserInfo = {
    id: string;
    token: string;
};

const addItemLocalStorage = (item: LocalUserInfo) => {
    let data = localStorage.getItem('user');

    // error handling (existant item)
    if (data?.length && data?.length > 0) return false;
    localStorage.setItem('user', JSON.stringify(item));
    return true;
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

function NotSigned(): React.ReactNode {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });

        const api = 'https://groupomania-myback.herokuapp.com/api/auth/login';

        const resp = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            }),
        });
        const msgError = document.getElementById('msgError') as HTMLElement;
        if (resp.status == 400) {
            msgError.textContent = 'le mail ou le mot de passe est incorrecte.';
        } else {
            const result = await resp.json();
            const { id, token } = result;
            msgError.textContent = '';
            const localUser = { id, token };
            if (addItemLocalStorage(localUser)) window.location.reload();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
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
                            Connection
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <p id="msgError"></p>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        {' '}
                                        {/*NOT WORKING YET. HERE FOR V2*/}
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"} {/* NOT WORKING YET. HERE FOR V2 */}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default function App() {
    const [user] = React.useState(JSON.parse(localStorage.getItem('user') as string));
    if (!user) return <React.Fragment>{NotSigned()}</React.Fragment>;
    return (
        <React.Fragment>
            <div className="layout">
                <Sidebar />
                <div className="mainContent">
                    {navBar({})}
                    <div className="postContent">
                        {addPost({})}
                        {AllPosts({})}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
