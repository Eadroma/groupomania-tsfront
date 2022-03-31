import * as React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import inputSearch from './components/inputSearch';

export default function Find() {
    return (
        <React.Fragment>
            <Sidebar />
            <inputSearch />
        </React.Fragment>
    );
}
