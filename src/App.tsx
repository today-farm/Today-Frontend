import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { CookiesProvider } from 'react-cookie';
import Login from './components/Login';
import Signup from './components/Signup/Signup';
import Withdraw from './components/Withdraw';
import TodayPost from './components/Today';
import EditAccount from './components/EditAccount';
import FriendAdd from './components/Friendadd';
import React from 'react';
import { PageLink } from './components/PageLink'; // react-icons에서 받아온 icon으로 
// 너비 설정, 링크 설정, icon 설정 가능.

import { FiArrowLeft,FiArrowRight } from "react-icons/fi";
import { FaUserFriends } from 'react-icons/fa';
import { BiCalendar,BiSearch,BiHome } from 'react-icons/bi';
import { GiSprout } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
// 필요 아이콘 import.




function App() {

  let navigate = useNavigate();  

  const routeAddFriend = () =>{ 
    let path = `/friend/add`; 
    navigate(path);
  }
  // 아이콘 링크 navigate 함수

  return (
    <CookiesProvider>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/post' element={<TodayPost />} />
        <Route path='/edit' element={<EditAccount />} />
        <Route path='/friend/add' element={<FriendAdd />} />
        <Route path='/' element={<p>
          <FiArrowRight></FiArrowRight>
        <FiArrowLeft></FiArrowLeft>
        <FaUserFriends></FaUserFriends>
        <BiCalendar></BiCalendar>
        <GiSprout></GiSprout>
        <AiOutlineClose></AiOutlineClose>
        <BiSearch></BiSearch>
        <BiHome></BiHome>
      {/* // react-icons 예시. */}

        메인페이지입니다.<PageLink icon = {FaUserFriends} path = {routeAddFriend} width ='1em'></PageLink></p>} />
      
      {/* // 페이지 링크 컴포넌트 추가 예시. */}
        <Route path='/post' element={<TodayPost />} />
        <Route path='*' element={<p>여기는 없는 페이지입니다😢</p>} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
