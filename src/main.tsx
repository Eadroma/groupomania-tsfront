import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import Profile from './pages/Profile/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup/Signup';
import Find from './pages/Find/Find';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/find" element={<Find />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
);
