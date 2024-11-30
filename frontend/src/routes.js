// routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Main from './pages/Main';
import Profile from './pages/Profile'; // 添加个人主页页面
import PracticePage from './pages/PracticePage'; // 添加在线做题页面
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/profile" element={<Profile />} /> {/* 个人主页 */}
      <Route path="/practice" element={<PracticePage />} />
    </Routes>
  );
}

export default AppRoutes;
