import { Card, CardContent, Typography, Avatar, CardHeader } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Posts } from '../../hooks/getPosts';
import './posts.scss';
import CardButtons from '../postButton/button';
import AddComment from '../../components/addComment/addComment';

import { User } from '../../types/User';
import { Service } from '../../types/Service';

const AllPosts: React.FC<{}> = () => {
    const [service, setService] = useState<Service<Posts>>({
        status: 'loading',
    });
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        const fillData = async () => {
            fetch(`https://groupomania-myback.herokuapp.com/api/posts`, {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((response) => setService({ status: 'loaded', payload: response.reverse() }))
                .catch((error) => {
                    console.error(error);
                    setService({ status: 'error', error });
                });
            fetch(`https://groupomania-myback.herokuapp.com/api/auth/`, {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((response) => setUsers(response))
                .catch((error) => console.error(error));
        };
        const interval = setInterval(() => {
            fillData();
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const handleClick = (postId: number, e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = `/post/${postId}`;
    };
    return (
        <div id="postMain">
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                service.payload.map(
                    (data: {
                        id: number;
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
                    }) => {
                        const user = users?.find((user) => user.id === data.userId);
                        return (
                            <div className="postLayout">
                                <Card>
                                    <CardContent onClick={(e) => handleClick(data.id, e)} sx={{ cursor: 'pointer' }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    aria-label="recipe"
                                                    src={user?.imgUrl || ''}
                                                    sx={{ width: 48, height: 48 }}
                                                />
                                            }
                                            title={`${data.userName} - ${data.userEmail}`}
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
                        );
                    },
                )}
            {service.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    );
};

export default AllPosts;
