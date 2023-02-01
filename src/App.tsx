import './App.css'
import { Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import MyPage from './components/MyPage/MyPage'
import Withdraw from './components/Withdraw'
import TodayPost from './components/Today/Today'
import Account from './components/MyPage/Account/Account'
import FindPassword from './components/FindPassword/FindPassword'
import ChangePassword from './components/MyPage/ChangePassword/ChangePassword'
import TodayDetail from './components/TodayDetail/TodayDetail'
import TodayUpdate from './components/TodayUpdate/TodayUpdate'
import Calendar from './components/Calendar/Calendar'
import MainFarm from './components/MainFarm/MainFarm'
import SuccessPost from './components/Today/SuccessPost/SuccessPost'
import Friend from './components/Friend/Friend'
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
        <Route path="/todaylist/:todayId" element={<TodayDetail />} />
        <Route path="/todaylist/update/:todayId" element={<TodayUpdate />} />
        <Route path="/post" element={<TodayPost />} />
        <Route path="/friends" element={<Friend />} />
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
