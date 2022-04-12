import { IconButton, Paper, Divider, Autocomplete, TextField } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import getUsers from '../../hooks/getUsers';

type UserType = {
    id: number;
    email: string;
    name: string;
    posts: [];
    coverUrl: string;
    imgUrl: string;
    updatedAt: string;
};
const SearchBar: React.FC<{}> = () => {
    const users = getUsers();
    return (
        <div className="searchBar">
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '80%',
                }}
            >
                <Autocomplete
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Jean paul.."
                    renderInput={(params) => <TextField {...params} label="Name" />}
                    options={users.map((user: UserType) => user.name)}
                    id="searchbar"
                />
                <IconButton
                    type="submit"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={(event) => {
                        event.preventDefault();

                        const inputResult = (document.getElementById('searchbar') as HTMLInputElement).value;
                        if (!inputResult) return;
                        const user: UserType = users.filter((user: UserType) => user.name == inputResult)[0];
                        location.href = `/profile/${user.id}`;
                    }}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
};

export default SearchBar;
