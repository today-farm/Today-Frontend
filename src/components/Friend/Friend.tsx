import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Footer from '../Footer/Footer'
import {
  ActiveSmallButton,
  GreenComponentWrapper,
  Title,
} from '../../style/CommonStyles'
import {
  Header,
  FriendsList,
  Button,
  FriendRequestWrapper,
  FriendRequest,
  FriendRequestNum,
  FindFriendButton,
  FriendsProfilesWrapper,
  FriendProfile,
  ProfileImg,
  SmallButton,
  NickName,
} from './style'
import FindFriendModal from './FindFriendModal/FindFriendModal'
import FriendRequestModal from './FriendRequestModal/FriendRequestModal'
import { API_URL, IMG_URL } from './../../constant'

export default function Friend() {
  const userId = localStorage.getItem('userId')
  const [cookies] = useCookies(['accessToken', 'password'])
  const [openFindModal, setOpenFindModal] = useState<boolean>(false)
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    axios
      .get(`${API_URL}/friend/friends/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res)
        setFriends(res.data.result.friendInfos)
      })
  }, [])

  return (
    <GreenComponentWrapper>
      <Header>
        <div>로고</div>
        <FindFriendButton
          src={'/img/icons/icon_add.png'}
          onClick={() => {
            setOpenFindModal(true)
          }}
        />
      </Header>
      <Title>농부 친구들</Title>
      <FriendsList>
        <FriendsProfilesWrapper>
          {friends.map((x: any) => {
            return (
              <FriendProfile>
                <ProfileImg
                  src={`${IMG_URL}${x.profileImgUrl}`}
                  alt={'profile'}
                />
                <NickName>{x.nickname}</NickName>
                <Link to="">
                  <SmallButton>농장 보기</SmallButton>
                </Link>
              </FriendProfile>
            )
          })}
        </FriendsProfilesWrapper>
        <Button>친구 목록 편집</Button>
      </FriendsList>
      <FriendRequestWrapper
        onClick={() => {
          setOpenRequestModal(true)
        }}
      >
        <FriendRequest>당신과 친구가 되고 싶어해요!</FriendRequest>
        <FriendRequestNum></FriendRequestNum>
      </FriendRequestWrapper>
      <Footer />
      {openFindModal && <FindFriendModal setOpenModal={setOpenFindModal} />}
      {openRequestModal && (
        <FriendRequestModal setOpenModal={setOpenRequestModal} />
      )}
    </GreenComponentWrapper>
  )
}
