import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Login from './components/Login';
import Signup from './components/Signup/Signup';
import Withdraw from './components/Withdraw';
import TodayPost from './components/Today';
import EditAccount from './components/EditAccount';
import FriendAdd from './components/Friendadd';
import FriendList from './components/Friend/FriendList';
import React from 'react';

function App() {
  return (
    <CookiesProvider>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/post' element={<TodayPost />} />
        <Route path='/edit' element={<EditAccount />} />
        <Route path='/friend/add' element={<FriendAdd />} />
        <Route path='/friend/friends' element={<FriendList />} />
        <Route path='/' element={<p>메인페이지입니다.</p>} />
        <Route path='/post' element={<TodayPost />} />
        <Route path='*' element={<p>여기는 없는 페이지입니다😢</p>} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
