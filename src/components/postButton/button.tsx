import { Button, CardActions, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Post } from '../../types/Post';
import './button.scss';

const CardButtons: React.FC<{ id: number; userId: number }> = ({ id, userId }) => {
    const loStorage = getItemLocalStorage();
    const [post, setPost] = React.useState<Post>();
    const [isLiked, setIsLiked] = React.useState<boolean>(false);
    const [commentShow, setCommentShow] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState('');
    useEffect(() => {
        if (!post) {
            fetch(`https://groupomania-myback.herokuapp.com/api/posts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: loStorage.token,
                },
            })
                .then((response) => response.json())
                .then((response) => setPost(response))
                .catch((error) => console.error(error));
        } else {
            const htmlElement = document.getElementById(`${id}`);
            if (!htmlElement) return;
            htmlElement.style.display = commentShow ? 'block' : 'none';
        }
    });

    const handleLike = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: loStorage.token,
            },
            body: JSON.stringify({ userId: loStorage.id }),
        };
        fetch(`https://groupomania-myback.herokuapp.com/api/posts/${id}/like`, options)
            .then((response) => response.json())
            .then((response) => {
                setPost(response);
                setIsLiked(!isLiked);
            })
            .catch((error) => console.error(error));
    };

    const handleComment = () => {
        setCommentShow(!commentShow);
    };

    const handleDelete = () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: loStorage.token,
            },
            body: JSON.stringify({ userId: loStorage.id }),
        };

        fetch(`https://groupomania-myback.herokuapp.com/api/posts/${id}`, options).then((response) => {
            if (response.status == 201) {
                window.location.reload();
            }
        });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleModifPost = () => {
        console.log(data);
        if (!data) return;
        const postObject = {
            userId: loStorage.id,
            content: data,
        };
        console.log(postObject);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: loStorage.token,
            },
            body: JSON.stringify(postObject),
        };
        fetch(`https://groupomania-myback.herokuapp.com/api/posts/${id}`, options)
            .then((response) => response.json())
            .then((response) => {
                setPost(response);
                setOpen(false);
                console.log(response);
            })
            .catch((error) => console.error(error));
    };
    if (userId == loStorage.id)
        return (
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Fab variant="extended" color="primary" aria-label="add" onClick={() => handleComment()}>
                    Commenter
                </Fab>
                <Fab variant="extended" color="secondary" aria-label="edit" onClick={() => handleOpen()}>
                    Modifier
                </Fab>
                <Dialog open={open} onClose={handleClose} maxWidth={false} sx={{ width: '100%' }} className="modal">
                    <DialogTitle>Modification du posts</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="textArea"
                            label="Your Post"
                            fullWidth
                            multiline
                            rows={4}
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            placeholder="Say hello world !"
                            sx={{ marginBottom: '1rem', marginTop: '1rem' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()}>Annuler</Button>
                        <Button onClick={() => handleModifPost()}>Modifier</Button>
                    </DialogActions>
                </Dialog>
                <Fab variant="extended" color="error" aria-label="edit" onClick={() => handleDelete()}>
                    Supprimer
                </Fab>
                <Fab
                    variant="extended"
                    aria-label="like"
                    onClick={() => handleLike()}
                    color={isLiked ? 'info' : 'error'}
                >
                    <FavoriteIcon />
                    {post?.likes}
                </Fab>
            </CardActions>
        );
    return (
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Fab variant="extended" color="primary" aria-label="add" onClick={() => handleComment()}>
                Commenter
            </Fab>

            <Dialog open={open} onClose={handleClose} maxWidth={false} sx={{ width: '100%' }} className="modal">
                <DialogTitle>Modification du posts</DialogTitle>
                <DialogContent>
                    <TextField
                        id="textArea"
                        label="Your Post"
                        fullWidth
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="Say hello world !"
                        sx={{ marginBottom: '1rem', marginTop: '1rem' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Annuler</Button>
                    <Button onClick={() => handleModifPost()}>Modifier</Button>
                </DialogActions>
            </Dialog>

            <Fab variant="extended" aria-label="like" onClick={() => handleLike()} color={isLiked ? 'info' : 'error'}>
                <FavoriteIcon />
                {post?.likes}
            </Fab>
        </CardActions>
    );
};

export default CardButtons;
