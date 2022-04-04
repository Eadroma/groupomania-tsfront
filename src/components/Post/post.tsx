import { Card, CardContent, Typography, CardActions, Fab } from '@mui/material';
import React from 'react';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import getPostsbyId from '../../hooks/getPost';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.css';

const CardButtons: React.FC<{ id: number }> = ({ id }) => {
    const loStorage = getItemLocalStorage();

    if (id == loStorage.id)
        return (
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Fab variant="extended" color="primary" aria-label="add">
                    Commenter
                </Fab>
                <Fab variant="extended" color="secondary" aria-label="edit">
                    Modifier
                </Fab>
                <Fab variant="extended" aria-label="like">
                    <FavoriteIcon />
                </Fab>
            </CardActions>
        );
    return (
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Fab variant="extended" color="primary" aria-label="add">
                Commenter
            </Fab>
            <Fab variant="extended" aria-label="like">
                <FavoriteIcon />
            </Fab>
        </CardActions>
    );
};

const Posts: React.FC<{ id: number }> = ({ id }) => {
    const service = getPostsbyId(id);
    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                service.payload.map(
                    (data: {
                        date: string;
                        textContent:
                            | boolean
                            | React.ReactChild
                            | React.ReactFragment
                            | React.ReactPortal
                            | null
                            | undefined;
                        userEmail: string;
                        userName: string;
                        userId: number;
                    }) => (
                        <div className="postLayout">
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {data.userEmail} - {Math.round((Date.now() - parseInt(data.date)) / 60000)}m
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {data.userName}
                                    </Typography>
                                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                     adjective
                 </Typography> */}
                                    <Typography variant="body2">{data.textContent}</Typography>
                                </CardContent>
                                <CardButtons id={data.userId} />
                            </Card>
                        </div>
                    ),
                )}
            {service.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    );
};

export default Posts;
