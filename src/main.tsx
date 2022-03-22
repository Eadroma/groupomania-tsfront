import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './pages/App/App'
import Profile from './pages/Profile/Profile'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/profile" element={<Profile />}/> 
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
