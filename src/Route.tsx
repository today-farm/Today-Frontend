import './App.css'
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

export const PUBLIC_ROUTE = {
  SIGNUP: {
    path: '/signup',
    element: Signup,
  },
  LOGIN: {
    path: '/',
    element: Login,
  },
  FIND_PASSWORD: {
    path: '/find-password',
    element: FindPassword,
  },
}

export const PRIVATE_ROUTE = {
  FARM: {
    path: '/mainfarm',
    element: MainFarm,
  },
  MYPAGE: {
    path: '/mypage',
    element: MyPage,
  },
  ACCOUNT: {
    path: '/account',
    element: Account,
  },
  CHANGE_PASSWORD: {
    path: '/change-password',
    element: ChangePassword,
  },
  FRIEND: {
    path: '/friend',
    element: Friend,
  },
  TODAY_POST: {
    path: '/today',
    element: TodayPost,
  },
  TODAY_DETAIL: {
    path: '/:todayId',
    element: TodayDetail,
  },
  TODAY_UPDATE: {
    path: '/update/:todayId',
    element: TodayUpdate,
  },
  CALENDAR: {
    path: '/calendar',
    element: Calendar,
  },
  SUCCESS_POST: {
    path: '/success-post',
    element: SuccessPost,
  },
}

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE)
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE)
