import './App.css'
import { Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import MyPage from './components/MyPage/MyPage'
import Withdraw from './components/Withdraw'
import TodayPost from './components/Today/Today'
import FriendAdd from './components/Friendadd'
import Account from './components/MyPage/Account/Account'
import FindPassword from './components/FindPassword/FindPassword'
import ChangePassword from './components/MyPage/ChangePassword/ChangePassword'
import TodayList from './components/TodayList'
import TodayDetail from './components/TodayDetail/TodayDetail'
import Calendar from './components/Calendar/Calendar'
import MainFarm from './components/MainFarm/MainFarm'
import SuccessPost from './components/Today/SuccessPost/SuccessPost'
function App() {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/change/password" element={<ChangePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/todaylist" element={<TodayList />} />
        <Route path="/todaylist/:todayId" element={<TodayDetail />} />
        <Route path="/post" element={<TodayPost />} />
        <Route path="/friend/add" element={<FriendAdd />} />
        <Route path="/" element={<MainFarm />} />
        <Route path="/success" element={<SuccessPost />} />
        <Route path="/post" element={<TodayPost />} />
        <Route path="/find/password" element={<FindPassword />} />
        <Route path="*" element={<p>여기는 없는 페이지입니다😢</p>} />
      </Routes>
    </CookiesProvider>
  )
}

export default App
