import { IconButton, InputBase, Paper, Divider, Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import getUsers from '../../hooks/getUsers';
const searchBar: React.FC<{}> = () => {
    const users = getUsers();
    console.log(users);
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '80%',
            }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Autocomplete
                sx={{ ml: 1, flex: 1 }}
                placeholder="Jean paul.."
                renderInput={(params) => <TextField {...params} label="Name" />}
                options={users.map((user) => user.name)}
                id="searchbar"
            />
            <IconButton
                type="submit"
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={(event) => {
                    event.preventDefault();

                    const inputResult = document?.getElementById('searchbar')?.value;
                    const user = users.filter((e) => e.name == inputResult)[0];
                    location.href = `/profile/${user.id}`;
                }}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

const navBar: React.FC<{}> = () => {
    return searchBar({});
};

export default navBar;
