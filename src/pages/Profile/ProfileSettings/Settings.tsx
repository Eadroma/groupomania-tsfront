import './settings.scss';
import { TextField, Button, Avatar, Card, CardHeader, CardMedia, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import getUserbyId from '../../../hooks/getUser';
import { getItemLocalStorage } from '../../../hooks/getLocalStorage';
import { PhotoCamera } from '@mui/icons-material';
import updateUser from '../../../hooks/updateUser';
import { objectForm } from '../../../types/objectForm';
import { LoadingButton } from '@mui/lab';

const initialFormValues = {
    email: '',
    name: '',
    description: '',
    coverUrl: '',
    imgUrl: '',
    formSubmitted: false,
    success: false,
};

const inputFieldValues = [
    {
        name: 'name',
        label: 'Nom',
        id: 'name',
    },
    {
        name: 'email',
        label: 'Email',
        id: 'email',
    },
    {
        name: 'description',
        label: 'Description',
        id: 'description',
        multiline: true,
        rows: 2,
    },
];

const useFormControls = () => {
    // We'll update "values" as the form updates
    const [values, setValues] = useState(initialFormValues);
    // "errors" is used to check the form for errors
    const [errors, setErrors] = useState({} as any);

    const validate: any = (fieldValues = values) => {
        let temp: any = { ...errors };

        if ('email' in fieldValues) {
            temp.email = fieldValues.email;
            if (fieldValues.email)
                temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? '' : 'Email is not valid.';
        }

        setErrors({
            ...temp,
        });
    };
    const handleInputValue = (e: any) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        validate({ [name]: value });
    };
    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        if (formIsValid()) {
            const resp = await updateUser(values as objectForm);
            if (resp) {
                setValues({
                    ...values,
                    ['formSubmitted']: true,
                    ['success']: true,
                });
                location.href = '/profile';
            } else {
                setValues({
                    ...values,
                    ['formSubmitted']: false,
                    ['success']: false,
                });
            }
        }
    };
    const formIsValid = (fieldValues = values) => {
        const isValid =
            (fieldValues.name || fieldValues.email || fieldValues.description) &&
            Object.values(errors).every((x) => x === '');

        return isValid;
    };
    return {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors,
    };
};
type imagesType = {
    cover: object | null;
    img: object | null;
};

const SettingsPage = () => {
    const loStorage = getItemLocalStorage();
    const userService = getUserbyId(loStorage.id);
    const { handleInputValue, handleFormSubmit, formIsValid, errors } = useFormControls();
    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState<imagesType>();
    const [avatarURL, setAvatarURL] = useState<string>();
    const [coverURL, setCoverURL] = useState<string>();

    useEffect(() => {
        if (images && images.cover) {
            const previewImg = URL.createObjectURL(images.cover as Blob | MediaSource);
            setCoverURL(`${previewImg}`);
        }
        if (images && images.img) {
            const previewImg = URL.createObjectURL(images.img as Blob | MediaSource);
            setAvatarURL(`${previewImg}`);
        }
    }, [images]);

    const handleHeaderImg = (e: { target: { files: any } }) => {
        console.log('on Header');
        if (images) {
            setImages({
                ...images,
                cover: e.target.files[0],
            });
        } else {
            setImages({
                img: null,
                cover: e.target.files[0],
            });
        }
        return e;
    };

    const handleAvatarImg = (e: { target: { files: any } }) => {
        console.log('on Avatar');
        if (images) {
            setImages({
                ...images,
                ['img']: e.target.files[0],
            });
        } else {
            setImages({
                cover: null,
                img: e.target.files[0],
            });
        }
        return e;
    };

    const postImg = () => {
        setLoading(true);

        if (images && images.cover) {
            console.log('cover');
            const data = new FormData();
            data.append('file', images.cover as Blob);
            data.append('upload_preset', 'meldob6j');
            data.append('cloud_name', 'datxh7pfw');
            try {
                fetch('https://api.cloudinary.com/v1_1/datxh7pfw/image/upload', {
                    method: 'post',
                    body: data,
                })
                    .then((resp) => resp.json())
                    .then(async (data) => {
                        if (
                            await updateUser({
                                coverUrl: data.url,
                            } as objectForm)
                        ) {
                            setLoading(false);
                            alert('photo de couverture modifié');
                        }
                    });
            } catch (err) {
                console.error(err);
            }
        }
        if (images && images.img) {
            console.log('img');
            const data = new FormData();
            data.append('file', images.img as Blob);
            data.append('upload_preset', 'meldob6j');
            data.append('cloud_name', 'datxh7pfw');
            try {
                fetch('https://api.cloudinary.com/v1_1/datxh7pfw/image/upload', {
                    method: 'post',
                    body: data,
                })
                    .then((resp) => resp.json())
                    .then(async (data) => {
                        if (
                            await updateUser({
                                imgUrl: data.url,
                            } as objectForm)
                        ) {
                            setLoading(false);
                            alert('photo de profil modifié');
                        }
                    });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const resetImg = () => {
        setImages(undefined);
        setAvatarURL('');
        setCoverURL('');
        setLoading(false);
        return;
    };

    const handleDelete = () => {
        if (window.confirm('Voulez-vous vraiment supprimer votre compte ?')) {
            if (userService.status == 'loaded') {
                fetch(`https://groupomania-myback.herokuapp.com/api/auth/${userService.payload.id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: loStorage.token,
                    },
                }).then(() => {
                    localStorage.clear();
                    location.href = '/';
                });
            }
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="settingsForm">
                <div className="imgSettings">
                    {userService.status === 'loaded' && (
                        <Card className="layoutHeader">
                            <CardMedia
                                component="img"
                                height="275"
                                image={coverURL || userService.payload.coverUrl}
                                alt="cover img"
                                sx={{ height: 275, width: 1080 }}
                            />
                            <label htmlFor="headerButtonFile">
                                <input accept="image/*" id="headerButtonFile" type="file" onChange={handleHeaderImg} />
                                <Button
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    startIcon={<PhotoCamera />}
                                    className="buttonHeaderForm"
                                >
                                    modify header
                                </Button>
                            </label>
                            <div className="layoutCardMedia">
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            aria-label="recipe"
                                            src={avatarURL || userService.payload.imgUrl}
                                            sx={{ width: 92, height: 92 }}
                                        />
                                    }
                                    action={<IconButton aria-label="settings"></IconButton>}
                                    subheader={
                                        <label htmlFor="avatarButtonFile">
                                            <input
                                                accept="image/*"
                                                id="avatarButtonFile"
                                                type="file"
                                                onChange={handleAvatarImg}
                                            />
                                            <Button
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                                startIcon={<PhotoCamera />}
                                                className="buttonHeaderForm"
                                            >
                                                modify avatar
                                            </Button>
                                        </label>
                                    }
                                />
                            </div>
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={loading}
                                onClick={postImg}
                                id="buttonForm"
                            >
                                Modifier
                            </LoadingButton>
                            <Button variant="contained" type="submit" onClick={resetImg} id="buttonForm">
                                Annuler
                            </Button>
                        </Card>
                    )}
                </div>
                <div className="formHeader">
                    <h1>Modifier votre profil</h1>
                </div>
                <form onSubmit={handleFormSubmit}>
                    {inputFieldValues.map((inputFieldValue, index) => {
                        return (
                            <TextField
                                key={index}
                                onBlur={handleInputValue}
                                onChange={handleInputValue}
                                name={inputFieldValue.name}
                                label={inputFieldValue.label}
                                multiline={inputFieldValue.multiline ?? false}
                                rows={inputFieldValue.rows ?? 1}
                                autoComplete="none"
                                {...(errors[inputFieldValue.name] && {
                                    error: true,
                                    helperText: errors[inputFieldValue.name],
                                })}
                            />
                        );
                    })}

                    <Button variant="contained" type="submit" disabled={!formIsValid()} id="buttonForm">
                        Modifier
                    </Button>
                </form>
                <Button variant="contained" color="error" type="submit" onClick={() => handleDelete()} id="buttonForm">
                    Supprimer
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;
