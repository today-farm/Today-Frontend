import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import {
  CloseButton,
  ModalBackground,
  Title,
} from '../../../style/CommonStyles'
import { FriendModalWrapper } from './../FindFriendModal/style'
import { Button, ProfileImg, NickName, FriendProfile } from '../style'
import { API_URL, IMG_URL } from './../../../constant'
import { RequestUsersWrapper, AcceptButton, RefuseButton } from './style'
interface Iprops {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  // openModal: boolean
}

function FriendRequestModal(props: Iprops) {
  const [cookies] = useCookies(['accessToken', 'password'])
  const [requestUsers, setRequestUsers] = useState([])

  const showRequestUsers = () => {
    axios
      .get(`${API_URL}/friend/find-requested-users`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => setRequestUsers(res.data.result.receiveRequestFriendInfos))
  }

  const acceptRequest = (requestUserId: number) => {
    axios.post(
      `${API_URL}/friend/accept-request/${requestUserId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      },
    )
  }
  const refuseRequest = (requestUserId: number) => {
    axios.delete(`${API_URL}/friend/refuse-request/${requestUserId}`, {
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
  }

  useEffect(() => {
    showRequestUsers()
  }, [])

  useEffect(() => {
    showRequestUsers()
  }, [acceptRequest])

  useEffect(() => {
    showRequestUsers()
  }, [refuseRequest])

  return (
    <ModalBackground>
      <FriendModalWrapper>
        <CloseButton
          src="/img/icons/icon_close.png"
          onClick={() => {
            props.setOpenModal(false)
          }}
        />
        <Title>받은 친구 요청</Title>
        <RequestUsersWrapper>
          {requestUsers.map((x: any) => {
            return (
              <FriendProfile>
                <ProfileImg src={`${IMG_URL}${x.profileImgUrl}`} />
                <NickName>{x.nickname}</NickName>
                <AcceptButton
                  onClick={() => {
                    acceptRequest(x.userId)
                  }}
                >
                  <img src={'/img/icons/icon_check.png'} />
                </AcceptButton>
                <RefuseButton
                  onClick={() => {
                    refuseRequest(x.userId)
                  }}
                >
                  <img src={'/img/icons/icon_smallclose.png'} />
                </RefuseButton>
              </FriendProfile>
            )
          })}
        </RequestUsersWrapper>
        <Button>모두 수락</Button>
      </FriendModalWrapper>
    </ModalBackground>
  )
}

export default FriendRequestModal
