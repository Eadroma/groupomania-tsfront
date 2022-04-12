import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Button, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Service } from '../../types/Service';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Post.scss';
import CardButtons from '../../components/postButton/button';
import AddComment from '../../components/addComment/addComment';
import getUsers from '../../hooks/getUsers';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
type Payload = {
    post: Post;
    user: User;
};

const CommentSection: React.FC<{ post: Post }> = ({ post }) => {
    const loStorage = getItemLocalStorage();

    const handleClick = (comment: { userId: number; content: string }) => {
        try {
            fetch(`https://groupomania-myback.herokuapp.com/api/posts/${post.id}/comments`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: loStorage.token,
                },
                body: JSON.stringify(comment),
            })
                .then((response) => response.json())
                .then((response) => console.log(response));
        } catch (error) {
            console.error(error);
        }
    };

    const comments = post.comments;
    const users = getUsers();
    if (!users.length) return <div>No comments</div>;
    const CommentElement = Object.values(comments).map((comment: { userId: number; content: string }) => {
        const data = users.filter((e: { id: number }) => e.id == comment.userId)[0] as User;
        return (
            <div key={Object.values(comments).indexOf(comment)}>
                <Card>
                    <CardHeader
                        avatar={<Avatar aria-label="recipe" src={data.imgUrl} />}
                        title={data.name}
                        subheader={data.email}
                    />
                    <Divider />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {comment.content}
                        </Typography>
                        {comment.userId == loStorage.id && (
                            <div className="CommentButtonDelete">
                                <Button
                                    variant="outlined"
                                    color="error"
                                    className="DeleteButton"
                                    onClick={() => handleClick(comment)}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    });
    return <>{CommentElement}</>;
};

const PostPage = () => {
    const loStorage = getItemLocalStorage();
    const { id } = useParams();
    if (!id) return <div>No post id</div>;
    const [service, setService] = React.useState<Service<Payload>>({
        status: 'loading',
    });
    useEffect(() => {
        fetch(`https://groupomania-myback.herokuapp.com/api/posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: loStorage.token,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                const post = response;
                fetch(`https://groupomania-myback.herokuapp.com/api/auth/${response.userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: loStorage.token,
                    },
                })
                    .then((response) => response.json())
                    .then((response) => {
                        setService({
                            status: 'loaded',
                            payload: {
                                post,
                                user: response,
                            },
                        });
                    });
            })
            .catch((error) => setService({ status: 'error', error }));
    }, []);

    return (
        <div className="postPageContainer">
            <Sidebar />
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' && (
                <div className="postPage">
                    <Card className="cardPost">
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="recipe"
                                    src={service.payload.user.imgUrl}
                                    alt={service.payload.user.name}
                                />
                            }
                            title={service.payload.user.name}
                            subheader={service.payload.user.email}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {service.payload.post.textContent}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <CardButtons id={service.payload.post.id} userId={service.payload.user.id} />
                        </CardActions>
                    </Card>
                    <Card className="commentCard">
                        <div id={`${service.payload.post.id}`}>
                            <AddComment postId={parseInt(id)} />
                        </div>
                        <div className="commentSection">
                            <CommentSection post={service.payload.post} />
                        </div>
                    </Card>
                </div>
            )}
            {service.status === 'error' && <div>Error: {service.error}</div>}
        </div>
    );
};

export default PostPage;
