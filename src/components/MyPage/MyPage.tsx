import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { GreenComponentWrapper } from '../../style/CommonStyles'
import { API_URL, IMG_URL } from '../../constant'
import Header from '../Header/Header'
import {
  MyPageWrapper,
  ProfileImg,
  UserInfo,
  Profile,
  Email,
  Nickname,
  Menu,
  LogoutButton,
  MyPageMenu,
  LinkButton,
} from './style'
import { User } from '../Interface'
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from './../../Route'

export default function MyPage() {
  const RightButton = 'img/icons/icon_right.png'
  const [cookies, , removeCookie] = useCookies(['accessToken'])
  const [info, setInfo] = useState<User>({
    email: '',
    nickname: '',
    img: '',
  })

  const hanldeLogout = () => {
    removeCookie('accessToken')
    window.location.href = PUBLIC_ROUTE.LOGIN.path
  }

  useEffect(() => {
    const fetchData = async () => {
      return axios({
        method: 'get',
        url: `${API_URL}/user/find-my-info`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }).then((res) => {
        setInfo((prev) => ({
          ...prev,
          ['email']: res.data.result.email,
          ['nickname']: res.data.result.nickname,
          ['img']: res.data.result.profileImgUrl,
        }))
      })
    }
    fetchData()
  }, [])

  return (
    <GreenComponentWrapper>
      <Header title="마이페이지" />
      <MyPageWrapper>
        <MyPageMenu>
          <Profile>
            <ProfileImg src={`${IMG_URL}${info.img}`} />
            <UserInfo>
              <Nickname>{info.nickname}</Nickname>
              <Email>{info.email}</Email>
            </UserInfo>
            <Link to={PRIVATE_ROUTE.ACCOUNT.path}>
              <LinkButton src={RightButton} />
            </Link>
          </Profile>
          <Menu>
            <p>비밀번호 변경</p>
            <Link to={PRIVATE_ROUTE.CHANGE_PASSWORD.path}>
              <LinkButton src={RightButton} />
            </Link>
          </Menu>
          <Menu>
            <p>문의사항</p>
            <LinkButton src={RightButton} />
          </Menu>
          <LogoutButton>
            <p>로그아웃</p>
            <LinkButton src={RightButton} onClick={hanldeLogout} />
          </LogoutButton>
        </MyPageMenu>
      </MyPageWrapper>
    </GreenComponentWrapper>
  )
}
