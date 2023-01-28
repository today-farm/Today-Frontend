import React, { Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import {
  CloseButton,
  ModalBackground,
  Title,
} from '../../../style/CommonStyles'
import { FriendModalWrapper } from './../FindFriendModal/style'
import { Button } from '../style'
interface Iprops {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

function FriendRequestModal(props: Iprops) {
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
        <Button>모두 수락</Button>
      </FriendModalWrapper>
    </ModalBackground>
  )
}

export default FriendRequestModal
