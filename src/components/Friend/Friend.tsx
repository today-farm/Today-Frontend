import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Footer from '../Footer/Footer'
import {
  GreenComponentWrapper,
  NonActiveSmallButton,
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
  ActiveButton,
  DeleteButton,
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
  const [requestUsers, setRequestUsers] = useState([])
  const [editOn, setEditOn] = useState(false)
  const deleteFriend = (friendId: number) => {
    axios.post(
      `${API_URL}/friend/delete/${friendId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      },
    )
  }

  const showFriends = () => {
    axios
      .get(`${API_URL}/friend/friends/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        setFriends(res.data.result.friendInfos)
      })
  }

  useEffect(() => {
    showFriends()
  }, [])

  useEffect(() => {
    showFriends()
  }, [deleteFriend])

  useEffect(() => {
    axios
      .get(`${API_URL}/friend/find-requested-users`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => setRequestUsers(res.data.result.friendRequestInfoDtos))
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
                {editOn === true ? (
                  <DeleteButton
                    onClick={() => {
                      deleteFriend(x.userId)
                    }}
                  >
                    친구 삭제
                  </DeleteButton>
                ) : (
                  <Link to="">
                    <SmallButton>농장 보기</SmallButton>
                  </Link>
                )}
              </FriendProfile>
            )
          })}
        </FriendsProfilesWrapper>
        {editOn === true ? (
          <ActiveButton
            onClick={() => {
              setEditOn(false)
            }}
          >
            편집 완료
          </ActiveButton>
        ) : (
          <Button
            onClick={() => {
              setEditOn(true)
            }}
          >
            친구 목록 편집
          </Button>
        )}
      </FriendsList>
      <FriendRequestWrapper
        onClick={() => {
          setOpenRequestModal(true)
        }}
      >
        <FriendRequest>당신과 친구가 되고 싶어해요!</FriendRequest>
        <FriendRequestNum>{requestUsers.length}</FriendRequestNum>
      </FriendRequestWrapper>
      <Footer />
      {openFindModal && <FindFriendModal setOpenModal={setOpenFindModal} />}
      {openRequestModal && (
        <FriendRequestModal setOpenModal={setOpenRequestModal} />
      )}
    </GreenComponentWrapper>
  )
}
