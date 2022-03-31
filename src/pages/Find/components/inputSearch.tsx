import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

interface User {
    email: string;
    name: string;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function inputSearch() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<User[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...topFilms]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.email === value.email}
            getOptionLabel={(option) => option.email}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
    { email: 'The Shawshank Redemption', name: 'oui' },
    { email: 'The Godfather', name: 'oui' },
    { email: 'The Godfather: Part II', name: 'oui' },
    { email: 'The Dark Knight', name: 'oui' },
    { email: '12 Angry Men', name: 'oui' },
    { email: "Schindler's List", name: 'oui' },
    { email: 'Pulp Fiction', name: 'oui' },
    {
        email: 'The Lord of the Rings: The Return of the King',
        name: 'oui',
    },
    { email: 'The Good, the Bad and the Ugly', name: 'oui' },
    { email: 'Fight Club', name: 'oui' },
    {
        email: 'The Lord of the Rings: The Fellowship of the Ring',
        name: 'oui',
    },
    {
        email: 'Star Wars: Episode V - The Empire Strikes Back',
        name: 'oui',
    },
    { email: 'Forrest Gump', name: 'oui' },
    { email: 'Inception', name: 'oui' },
    {
        email: 'The Lord of the Rings: The Two Towers',
        name: 'oui',
    },
    { email: "One Flew Over the Cuckoo's Nest", name: 'oui' },
    { email: 'Goodfellas', name: 'oui' },
    { email: 'The Matrix', name: 'oui' },
    { email: 'Seven Samurai', name: 'oui' },
    {
        email: 'Star Wars: Episode IV - A New Hope',
        name: 'oui',
    },
    { email: 'City of God', name: 'oui' },
    { email: 'Se7en', name: 'oui' },
    { email: 'The Silence of the Lambs', name: 'oui' },
    { email: "It's a Wonderful Life", name: 'oui' },
    { email: 'Life Is Beautiful', name: 'oui' },
    { email: 'The Usual Suspects', name: 'oui' },
    { email: 'Léon: The Professional', name: 'oui' },
    { email: 'Spirited Away', name: 'oui' },
    { email: 'Saving Private Ryan', name: 'oui' },
    { email: 'Once Upon a Time in the West', name: 'oui' },
    { email: 'American History X', name: 'oui' },
    { email: 'Interstellar', name: 'oui' },
];
