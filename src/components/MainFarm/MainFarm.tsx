import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { GreenComponentWrapper } from '../../style/CommonStyles'
import Footer from './../Footer/Footer'
import { todayYearMonthDate } from '../Today/TodayDate'
import { Title } from '../../style/CommonStyles'
import Field from './Field/Field'
import Menu from '../Menu/Menu'
import { API_URL } from './../../constant'
import { Icrops } from '../Interface'

export default function MainFarm() {
  const userId = localStorage.getItem('userId')
  const [cookies] = useCookies(['accessToken'])
  const [growingCrops, setGrowingCrops] = useState<Icrops[]>([])
  // 0번 작성이면 빈 배열로 옴
  useEffect(() => {
    axios
      .get(`${API_URL}/crop/this-month-user-crops/${userId}`, {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      })
      .then((res) => {
        setGrowingCrops(res.data.result.growingCrops)
      })
  }, [])
  return (
    <GreenComponentWrapper>
      <Menu />
      <Title>{todayYearMonthDate()}</Title>
      <Field
        text={'첫 번째 하루를 기록해보세요.'}
        cropStatus={growingCrops[0]?.cropStatus}
      />
      <Field
        text={'8개의 기록이 필요해요.'}
        cropStatus={growingCrops[1]?.cropStatus}
      />
      <Field
        text={'15개의 기록이 필요해요.'}
        cropStatus={growingCrops[2]?.cropStatus}
      />
      <Field
        text={'22개의 기록이 필요해요'}
        cropStatus={growingCrops[3]?.cropStatus}
      />
      <Footer main={true} />
    </GreenComponentWrapper>
  )
}
