import React, { Dispatch, SetStateAction } from 'react'
import { Title } from './../../../style/CommonStyles'
import { Link } from 'react-router-dom'
import {
  ModalBackground,
  ModalWrapper,
  InfoMsg,
  CloseButton,
  PasswordButton,
} from './style'

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

function Modal(props: IProps) {
  return (
    <ModalBackground>
      <ModalWrapper>
        <CloseButton
          src="/img/icons/icon_close.png"
          onClick={() => {
            props.setOpenModal(false)
          }}
        />
        <Title>메일 전송 완료!</Title>
        <InfoMsg>
          이메일로 전송된
          <br /> 임시 비밀번호로 로그인해 주세요.
        </InfoMsg>
        <Link to="/login">
          <PasswordButton>로그인 바로가기</PasswordButton>
        </Link>
      </ModalWrapper>
    </ModalBackground>
  )
}

export default Modal
