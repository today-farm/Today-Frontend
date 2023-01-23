import React, { Dispatch, SetStateAction } from 'react'
import {
  ModalBackground,
  ModalWrapper,
  InfoMsg,
} from './../../FindPassword/Modal/style'
import { Title } from '../../../style/CommonStyles'
import { Buttons, SuccessButton, BackButton } from './style'
interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  handleToday: () => void
}

function Modal(props: IProps) {
  return (
    <ModalBackground>
      <ModalWrapper>
        <Title>기록 저장</Title>
        <InfoMsg>오늘의 하루 기록을 완료할까요?</InfoMsg>
        <Buttons>
          <SuccessButton onClick={props.handleToday}>완료</SuccessButton>
          <BackButton
            onClick={() => {
              props.setOpenModal(false)
            }}
          >
            이전으로
          </BackButton>
        </Buttons>
      </ModalWrapper>
    </ModalBackground>
  )
}

export default Modal
