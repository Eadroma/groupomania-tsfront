import { Card, CardContent, Typography, Avatar, CardHeader } from '@mui/material';
import React from 'react';
import getPostsbyId from '../../hooks/getPost';
import './style.css';
import getUserbyId from '../../hooks/getUser';
import AddComment from '../../components/addComment/addComment';
import CardButtons from '../postButton/button';

const Posts: React.FC<{ id: number }> = ({ id }) => {
    const service = getPostsbyId(id);
    const user = getUserbyId(id);

    const handleClick = (postId: number, e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = `/post/${postId}`;
    };
    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                user.status === 'loaded' &&
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
                        id: number;
                    }) => (
                        <div className="postLayout">
                            <Card>
                                <CardContent onClick={(e) => handleClick(data.id, e)} sx={{ cursor: 'pointer' }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                aria-label="recipe"
                                                src={user.payload.imgUrl}
                                                sx={{ width: 48, height: 48 }}
                                            />
                                        }
                                        title={`${user.payload.name} - ${user.payload.email}`}
                                        subheader={`${Math.round((Date.now() - parseInt(data.date)) / 60000)}m`}
                                    />
                                    <Typography variant="body2">{data.textContent}</Typography>
                                </CardContent>
                                <CardButtons userId={data.userId} id={data.id} />
                                <div id={`${data.id}`}>
                                    <AddComment postId={data.id} />
                                </div>
                            </Card>
                        </div>
                    ),
                )}
            {service.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    );
};

export default Posts;
