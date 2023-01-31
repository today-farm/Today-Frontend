import React, { Dispatch, SetStateAction } from 'react'
import {
  ModalBackground,
  CloseButton,
  Title,
  InfoMsg,
  ModalButton,
} from '../../../style/CommonStyles'
import { CanPostModalWrapper, Info } from './style'

interface Iprops {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function CanPostInfoModal(props: Iprops) {
  return (
    <ModalBackground>
      <CanPostModalWrapper>
        <CloseButton
          src="/img/icons/icon_close.png"
          onClick={() => {
            props.setOpenModal(false)
          }}
        />
        <Title>오늘의 기록 작성 완료</Title>
        <InfoMsg>
          오늘은 이미 기록을 남겼어요!
          <br /> 추가 기록은 오늘의 기록 수정으로 <br /> 작성해주세요.
        </InfoMsg>
        <Info>새 기록은 다음 날 배셕 3시 이후 작성할 수 있어요.</Info>
        <ModalButton
          onClick={() => {
            props.setOpenModal(false)
          }}
        >
          닫기
        </ModalButton>
      </CanPostModalWrapper>
    </ModalBackground>
  )
}
