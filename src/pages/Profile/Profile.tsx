import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Posts from '../../components/Post/post';
import './style.scss';
import getUserbyId from '../../hooks/getUser';
import { Avatar, Button, Card, CardHeader, CardMedia, IconButton, Skeleton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddPost from '../../components/addPost/addPost';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import { User } from '../../types/User';

const ProfileHeader: React.FC<{ user: User; isAdmin: boolean }> = ({ user, isAdmin }) => {
    const loStorage = getItemLocalStorage();
    const handleDelete = () => {
        if (isAdmin && window.confirm('Voulez-vous vraiment supprimer le compte ?')) {
            fetch(`https://groupomania-myback.herokuapp.com/api/auth/${user.id}`, {
                method: 'DELETE',
                headers: {
                    authorization: loStorage.token,
                },
            }).then(() => {
                location.href = '/';
            });
        }
    };
    return (
        <>
            <Card className="layoutHeader">
                <CardMedia component="img" height="275" image={user.coverUrl} alt="cover img" />
                <div className="layoutCardMedia">
                    <CardHeader
                        avatar={<Avatar aria-label="recipe" src={user.imgUrl} sx={{ width: 92, height: 92 }} />}
                        action={<IconButton aria-label="settings"></IconButton>}
                        title={`${user.name} - ${user.email}`}
                        subheader={user.description}
                    />
                    {loStorage.id == user.id && (
                        <div className="layoutCardSettings">
                            <Link to={'/profile/settings'}>
                                <SettingsIcon />
                            </Link>
                        </div>
                    )}
                    {isAdmin && (
                        <div className="layoutCardSettings">
                            <Button
                                variant="contained"
                                color="error"
                                type="submit"
                                onClick={() => handleDelete()}
                                id="deleteAccount"
                                sx={{ marginRight: '5rem' }}
                            >
                                Supprimer
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};
export default function Profile() {
    const loStorage = getItemLocalStorage();
    const { id } = useParams();
    if (!id) location.href = '/';
    const user = getUserbyId(parseInt(id!));
    const connectedUser = getUserbyId(loStorage.id);
    console.log(connectedUser);
    console.log(loStorage.id);
    console.log(loStorage.id == id || connectedUser?.payload?.isAdmin);
    return (
        <div className="container">
            <Sidebar />
            {user.status === 'loading' && connectedUser.status === 'loading' && (
                <div className="layoutProfile">
                    <Skeleton variant="rectangular" height={275} animation="wave" />
                </div>
            )}
            {user.status === 'loaded' && connectedUser.status === 'loaded' && (
                <div className="profileLayout">
                    <ProfileHeader user={user.payload} isAdmin={connectedUser.payload.isAdmin} />
                    {loStorage.id == id ? <AddPost user={user.payload} /> : ''}
                    <h2 id="posts">Posts:</h2>
                    <Posts user={user.payload} />
                </div>
            )}
            {user.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    );
}
