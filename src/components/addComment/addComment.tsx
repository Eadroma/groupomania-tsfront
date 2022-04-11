import { Box, TextField, Button } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';

type dataObject = {
    content: string;
    userId: string;
};

const AddComment: React.FC<{ postId: number }> = ({ postId }) => {
    const [data, setData] = React.useState('');
    const localStorage = getItemLocalStorage();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(event.target.value);
    };
    const handlePost = () => {
        if (!data) return;
        const commentObject: dataObject = {
            content: data,
            userId: localStorage.id,
        };

        const api = `https://groupomania-myback.herokuapp.com/api/posts/${postId}/comments`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.token,
            },
            body: JSON.stringify(commentObject),
        };
        fetch(api, options)
            .then((response) => response.json())
            .then(() => {
                setData('');
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
                label="Your Comment"
                multiline
                rows={4}
                fullWidth
                value={data}
                onChange={(e) => handleChange(e)}
            />
            <Button variant="contained" color="primary" onClick={() => handlePost()} style={{ marginLeft: '10px' }}>
                Add Comment
            </Button>
        </Box>
    );
};

export default AddComment;
