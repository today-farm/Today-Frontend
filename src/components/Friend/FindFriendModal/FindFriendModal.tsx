import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import axios from 'axios'
import {
  CloseButton,
  ModalBackground,
  Title,
} from '../../../style/CommonStyles'
import { FriendModalWrapper, SearchBox, Input, Users } from './style'
import { API_URL, IMG_URL } from './../../../constant'
import { useCookies } from 'react-cookie'
import { FriendProfile, ProfileImg, NickName, SmallButton } from '../style'
import { Link } from 'react-router-dom'

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function FindFriendModal(props: IProps) {
  const [cookies] = useCookies(['accessToken', 'password'])
  const userId = localStorage.getItem('userId')
  const [searchUserNickname, setSearchUserNickname] = useState('')
  const [lastFriendUserId, setLastFriendUserId] = useState('')
  const [lastUserId, setLastUserId] = useState('')
  const [friends, setFriends] = useState<any>([])
  const [ScrollY, setScrollY] = useState(0)
  // console.log(lastFriendUserId)
  // console.log(lastUserId)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleFollow = () => {
    setScrollY(window.pageYOffset) // window 스크롤 값을 ScrollY에 저장
  }

  useEffect(() => {
    console.log('ScrollY is ', ScrollY) // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [ScrollY])

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch() // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleFollow) // addEventListener 함수를 삭제
    }
  })

  // const addFriend = () => {
  //   axios.post(`${API_URL}/friend/add/${friendId}`, {
  //     headers: { Authorization: `Bearer ${cookies.accessToken}` },
  //   })
  // }
  //console.log(friends)

  const findFriend = () => {
    if (searchUserNickname === '') {
      setLastFriendUserId('')
      setLastUserId('')
    }
    axios
      .get(
        lastFriendUserId === '' && lastUserId === ''
          ? `${API_URL}/user/search?size=10&loginUserId=${userId}&searchUserNickname=${searchUserNickname}`
          : `${API_URL}/user/search?size=10&loginUserId=${userId}&lastFriendUserId=${lastFriendUserId}&lastUserId=${lastUserId}&searchUserNickname=${searchUserNickname}`,
        {
          headers: { Authorization: `Bearer ${cookies.accessToken}` },
        },
      )
      .then((res) => {
        console.log(res)
        const friendInfos = res.data.result.friendInfos.friendUserInfos
        const userInfos = res.data.result.userInfos.userInfos
        if (friendInfos.length !== 0) {
          setLastFriendUserId(friendInfos[friendInfos.length - 1].userId)
        }
        if (userInfos.length !== 0) {
          setLastUserId(userInfos[userInfos.length - 1].userId)
        }
        setFriends([...friendInfos, ...userInfos])
      })
  }

  // const onHomeClick = () => {
  //   modalRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(() => {
  //   findFriend()
  // }, [searchUserNickname])

  return (
    <ModalBackground>
      <FriendModalWrapper>
        <CloseButton
          src="/img/icons/icon_close.png"
          onClick={() => {
            props.setOpenModal(false)
          }}
        />
        <Title>친구 찾기</Title>
        <SearchBox>
          <Input
            type="text"
            maxLength={7}
            placeholder="닉네임을 입력해주세요."
            onChange={(e) => {
              setSearchUserNickname(e.target.value)
            }}
          />
          <img onClick={findFriend} src="/img/icons/icon_search.png" />
        </SearchBox>
        <Users>
          {friends.map((x: any) => {
            return (
              <FriendProfile>
                <ProfileImg
                  src={`${IMG_URL}${x.profileImgUrl}`}
                  alt={'profile'}
                />
                <NickName>{x.nickname}</NickName>
                <SmallButton>친구 요청</SmallButton>
              </FriendProfile>
            )
          })}
        </Users>
        {/* <button onClick={onHomeClick}></button> */}
      </FriendModalWrapper>
    </ModalBackground>
  )
}
