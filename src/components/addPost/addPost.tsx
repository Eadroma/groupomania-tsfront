import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Card, Divider, IconButton, Input, Stack, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import getUserbyId from '../../hooks/getUser';

type dataObject = {
    content: string;
    userId: number;
    userName: string;
    userEmail: string;
};
const addPost: React.FC<{}> = () => {
    const [data, setData] = React.useState('');
    const localStorage = getItemLocalStorage();
    const user = getUserbyId(localStorage.id);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value);
    };

    const handlePost = () => {
        if (!data) return;
        const postObject: dataObject = {
            content: data,
            userId: localStorage.id,
            userName: user?.payload?.name,
            userEmail: user?.payload?.email,
        };

        const api = 'https://groupomania-myback.herokuapp.com/api/posts/';
        const devApi = 'http://localhost:3306/api/posts/';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postObject),
        };
        fetch(devApi, options)
            .then((response) => response.json())
            .then(() => window.location.reload());
    };
    return (
        <Box
            sx={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
            }}
            component="form"
            noValidate
        >
            <TextField
                id="textArea"
                label="Your Post"
                multiline
                rows={4}
                fullWidth
                value={data}
                onChange={handleChange}
                placeholder="Say hello world !"
            />
            <Divider />
            <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="textAre">
                    <Button
                        variant="contained"
                        component="span"
                        sx={{ backgroundColor: '#f42f0e', marginTop: '5%' }}
                        onClick={handlePost}
                    >
                        Envoyer
                    </Button>
                </label>
            </Stack>
        </Box>
    );
};

export default addPost;
