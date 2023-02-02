import React from 'react'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTE } from '../../../Route'
import { GreenComponentWrapper } from '../../../style/CommonStyles'
import { ContentsWrapper, SuccessImg, Text, LinkButton } from './style'

function SuccessPost() {
  return (
    <GreenComponentWrapper>
      <ContentsWrapper>
        <SuccessImg src="img/character/successRabbit.png" />
        <Text>오늘의 기록을 완료했어요!</Text>
        <Text>
          캘린더의 오늘 날짜를 클릭하면
          <br />
          기록을 꺼내볼 수 있어요.
        </Text>
      </ContentsWrapper>
      <Link to={PRIVATE_ROUTE.FARM.path}>
        <LinkButton>확인</LinkButton>
      </Link>
    </GreenComponentWrapper>
  )
}

export default SuccessPost
