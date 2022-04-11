import { Box, Button, Divider, Stack, TextField } from '@mui/material';
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
            userName: user?.payload?.name as string,
            userEmail: user?.payload?.email as string,
        };

        const api = 'https://groupomania-myback.herokuapp.com/api/posts/';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.token,
            },
            body: JSON.stringify(postObject),
        };
        fetch(api, options)
            .then((response) => response.json())
            .then(() => {
                const textArea = document.getElementById('textArea') as HTMLInputElement;
                textArea.value = '';
            });
    };
    return (
        <Box
            sx={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
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
