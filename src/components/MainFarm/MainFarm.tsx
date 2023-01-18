import React from 'react'
import { GreenComponentWrapper } from '../../style/CommonStyles'
import Footer from './../Footer/Footer'
import { todayYearMonthDate } from '../Today/TodayDate'
import { Title } from '../../style/CommonStyles'
import Field from './Field/Field'

function MainFarm() {
  return (
    <GreenComponentWrapper>
      <Title>{todayYearMonthDate()}</Title>
      <Field text={'첫 번째 하루를 기록해보세요.'} />
      <Field text={'8개의 기록이 필요해요.'} />
      <Field text={'15개의 기록이 필요해요.'} />
      <Field text={'22개의 기록이 필요해요'} />

      <Footer main={true} />
    </GreenComponentWrapper>
  )
}

export default MainFarm
