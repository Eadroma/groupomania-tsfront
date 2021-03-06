import { Box, Button, Divider, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import { User } from '../../types/User';

type dataObject = {
    content: string;
    userId: number;
    userName: string;
    userEmail: string;
};
const AddPost: React.FC<{ user: User }> = ({ user }) => {
    const [data, setData] = React.useState('');
    const localStorage = getItemLocalStorage();

    useEffect(() => {
        if (data.length == 255) {
            alert('You have reached the limit of 255 characters');
            setData('');
        }
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value);
    };

    const handlePost = () => {
        if (!data) return;
        const postObject: dataObject = {
            content: data,
            userId: localStorage.id,
            userName: user.name,
            userEmail: user.email,
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

export default AddPost;
