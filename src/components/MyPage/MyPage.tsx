import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { GreenComponentWrapper } from '../../style/CommonStyles';
import Header from '../Header/Header';
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
} from './style';
// import RightButton from 'img/icon_right.png';
import { User } from '../Interface';
const amazonUrl = `https://todayproject-bucket.s3.ap-northeast-2.amazonaws.com/`;

export default function MyPage() {
  const RightButton = 'img/icon_right.png';
  const [cookies] = useCookies(['accessToken']);
  const [info, setInfo] = useState<User>({
    email: '',
    nickname: '',
    img: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      return axios({
        method: 'get',
        url: `/user/find-my-info`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }).then((res) => {
        console.log(res);
        // setInfo(['email']: res.data.result.email);
        setInfo((prev) => ({
          ...prev,
          ['email']: res.data.result.email,
          ['nickname']: res.data.result.nickname,
          ['img']: res.data.result.profileImgUrl,
        }));
      });
    };
    fetchData();
  }, []);

  return (
    <GreenComponentWrapper>
      <Header title='마이페이지' />
      <MyPageWrapper>
        <MyPageMenu>
          <Profile>
            <ProfileImg src={`${amazonUrl}${info.img}`} />
            <UserInfo>
              <Nickname>{info.nickname}</Nickname>
              <Email>{info.email}</Email>
            </UserInfo>
            <Link to='/account'>
              <img src={RightButton} />
            </Link>
          </Profile>
          <Menu>
            <p>비밀번호 변경</p>
            <Link to='/change/password'>
              <img src={RightButton} />
            </Link>
          </Menu>
          <Menu>
            <p>문의사항</p>
            <img src={RightButton} />
          </Menu>
          <LogoutButton>
            <p>로그아웃</p>
            <img src={RightButton} />
          </LogoutButton>
        </MyPageMenu>
      </MyPageWrapper>
    </GreenComponentWrapper>
  );
}
