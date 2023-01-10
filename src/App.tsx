import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import MyPage from './components/MyPage/MyPage';
import Withdraw from './components/Withdraw';
import TodayPost from './components/Today';
import EditAccount from './components/EditAccount';
import FriendAdd from './components/Friendadd';
import Account from './components/MyPage/Account/Account';
import FindPassword from './components/FindPassword/FindPassword';
function App() {
  return (
    <CookiesProvider>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/account' element={<Account />} />
        <Route path='/login' element={<Login />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/post' element={<TodayPost />} />
        <Route path='/edit' element={<EditAccount />} />
        <Route path='/friend/add' element={<FriendAdd />} />
        <Route path='/' element={<p>메인페이지입니다.</p>} />
        <Route path='/post' element={<TodayPost />} />
        <Route path='/find/password' element={<FindPassword />} />

        <Route path='*' element={<p>여기는 없는 페이지입니다😢</p>} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
