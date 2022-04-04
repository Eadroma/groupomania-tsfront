import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import Profile from './pages/Profile/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup/Signup';
import { getItemLocalStorage } from './hooks/getLocalStorage';
import SettingsPage from './pages/Profile/ProfileSettings/Settings';

const ProfileDefault = () => {
    const loStorage = getItemLocalStorage();
    window.location.href = `/profile/${loStorage.id}`;
    return (
        <div className="loader">
            <div className="loader-wheel"></div>
            <div className="loader-text"></div>
        </div>
    );
};
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<ProfileDefault />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/settings" element={<SettingsPage />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
);
