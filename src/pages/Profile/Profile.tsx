import React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Posts from '../../components/Post/post';
import './style.css';
import getUserbyId from '../../hooks/getUser';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Typography } from '@mui/material';
import addPost from '../../components/addPost/addPost';
const ProfileHeader = () => {
    const queryString = window.location.search;
    const objectId = new URLSearchParams(queryString).get('id');
    const loStorage = getItemLocalStorage();
    let userService = getUserbyId(loStorage.id);
    if (objectId) userService = getUserbyId(parseInt(objectId));
    return (
        <div>
            {userService.status === 'loading' && (
                <div>
                    <Skeleton variant="rectangular" height={275} animation="wave" />
                </div>
            )}
            {userService.status === 'loaded' && userService.status === 'loaded' && (
                <Card className="layoutHeader">
                    <CardMedia component="img" height="275" image={userService.payload.coverUrl} alt="cover img" />
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                src={userService.payload.imgUrl}
                                sx={{ width: 92, height: 92 }}
                            />
                        }
                        action={<IconButton aria-label="settings"></IconButton>}
                        title={`${userService.payload.name} - ${userService.payload.email}`}
                        subheader={userService.payload.description}
                    />
                </Card>
            )}
            {userService.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    );
};
export default function Profile() {
    return (
        <div className="container">
            <Sidebar />
            <div className="profileLayout">
                <ProfileHeader />
                {addPost()}
                <h2 id="posts">Posts:</h2>
                <Posts />
            </div>
        </div>
    );
}
