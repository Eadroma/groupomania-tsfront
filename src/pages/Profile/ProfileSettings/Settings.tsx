import './settings.scss';
import { TextField, Button, Avatar, Card, CardHeader, CardMedia, IconButton } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import getUserbyId from '../../../hooks/getUser';
import { getItemLocalStorage } from '../../../hooks/getLocalStorage';
import { PhotoCamera } from '@mui/icons-material';

const initialFormValues = {
    email: '',
    name: '',
    imgUrl: '',
    coverUrl: '',
    description: '',
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

        if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'This field is required.';

        if ('email' in fieldValues) {
            temp.email = fieldValues.email ? '' : 'This field is required.';
            if (fieldValues.email)
                temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? '' : 'Email is not valid.';
        }

        if ('description' in fieldValues) temp.description = fieldValues.description ? '' : 'This field is required.';

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
            // await postContactForm(values);
            alert("You've posted your form!");
        }
    };
    const formIsValid = (fieldValues = values) => {
        const isValid =
            fieldValues.name &&
            fieldValues.email &&
            fieldValues.description &&
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
const SettingsPage = () => {
    const loStorage = getItemLocalStorage();
    const userService = getUserbyId(loStorage.id);
    const { handleInputValue, handleFormSubmit, formIsValid, errors } = useFormControls();
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
                                image={userService.payload.coverUrl}
                                alt="cover img"
                            />
                            <label htmlFor="icon-button-file">
                                <input accept="image/*" id="icon-button-file" type="file" />
                                <Button
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    startIcon={<PhotoCamera />}
                                >
                                    modify header
                                </Button>
                            </label>
                            <div className="layoutCardMedia">
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            aria-label="recipe"
                                            src={userService.payload.imgUrl}
                                            sx={{ width: 92, height: 92 }}
                                        />
                                    }
                                    action={<IconButton aria-label="settings"></IconButton>}
                                    subheader={
                                        <label htmlFor="icon-button-file">
                                            <input accept="image/*" id="icon-button-file" type="file" />
                                            <Button
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                                startIcon={<PhotoCamera />}
                                            >
                                                modify avatar
                                            </Button>
                                        </label>
                                    }
                                />
                            </div>
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

                    <Button type="submit" disabled={!formIsValid()}>
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
