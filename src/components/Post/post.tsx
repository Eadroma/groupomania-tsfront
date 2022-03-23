import { Card, CardContent, Typography, CardActions, Button, Fab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import getPostsbyId from '../../hooks/getPost';
import getUserbyId from '../../hooks/getUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.css';

const Posts: React.FC<{}> = () => {
    const queryString = window.location.search;
    const objectId = new URLSearchParams(queryString).get('id');
    const loStorage = getItemLocalStorage();
    let service = getPostsbyId(loStorage.id);
    let userService = getUserbyId(loStorage.id);
    if (objectId) {
        service = getPostsbyId(parseInt(objectId));
        userService = getUserbyId(parseInt(objectId));
    }
    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                userService.status === 'loaded' &&
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
                    }) => (
                        <div className="postLayout">
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {userService.payload.email} -{' '}
                                        {Math.round((Date.now() - parseInt(data.date)) / 60000)}m
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {userService.payload.name}
                                    </Typography>
                                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                     adjective
                 </Typography> */}
                                    <Typography variant="body2">{data.textContent}</Typography>
                                </CardContent>
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
                            </Card>
                        </div>
                    ),
                )}
            {service.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    );
};

export default Posts;
