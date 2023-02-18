import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTE_ARR, PUBLIC_ROUTE_ARR, PRIVATE_ROUTE } from '../../Route'
import { GreenComponentWrapper, Title } from '../../style/CommonStyles'
import {
  CalenderHeader,
  DateWrapper,
  CalenderWrapper,
  Month,
  Dates,
  Week,
  DayOfWeek,
  CheckToday,
  Day,
  Feeling,
  FeelingImg,
} from './style'
import moment from 'moment'
import Menu from '../Menu/Menu'
import Footer from '../Footer/Footer'
import { API_URL } from '../../constant'
import { matchFeeling } from '../util/usefulFunctions'
function Calender() {
  const [cookies] = useCookies(['accessToken', 'password'])
  const [todaies, setTodaies] = useState<any[]>([])
  const [getMoment, setMoment] = useState(moment())
  let userId: string | null = localStorage.getItem('userId')
  const friendId = localStorage.getItem('friendId')
  const today = getMoment // today == moment()   입니다.
  const firstWeek = today.clone().startOf('month').week()
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week()

  const calendarArr = () => {
    let result: any[] = []
    let week = firstWeek
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((_data, index) => {
              let days = today
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(index, 'day')
              // console.log('days' + days.format('MM'))
              // console.log(today.format('MM'))
              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                //오늘이면
                return (
                  <Day key={index}>
                    <div
                      style={{
                        width: '70%',
                        marginLeft: '7px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--light-green)',
                      }}
                    >
                      {days.format('D')}
                    </div>
                    {todaies.map((x: any) => {
                      const [, , day] = x.creationDay.split('-')
                      if (day === days.format('D')) {
                        return (
                          <>
                            <Link
                              to={
                                (PRIVATE_ROUTE.TODAY_DETAIL.path = `/${x.postId}`)
                              }
                            >
                              <FeelingImg
                                src={matchFeeling(x.todayFeeling, 0)}
                              />
                            </Link>
                          </>
                        )
                      }
                    })}
                    <CheckToday />
                  </Day>
                )
              } else if (days.format('MM') !== today.format('MM')) {
                // 전 달이나 다음 달 날짜라면
                return (
                  <Day key={index}>
                    <div style={{ opacity: 0.2 }}>{days.format('D')}</div>
                    <CheckToday style={{ opacity: 0.2 }} />
                  </Day>
                )
              } else {
                return (
                  <Day key={index}>
                    <div>{days.format('D')}</div>
                    {todaies.map((x) => {
                      const [, , day] = x.creationDay.split('-')
                      if (day === days.format('D')) {
                        return (
                          <>
                            <Link
                              to={
                                (PRIVATE_ROUTE.TODAY_DETAIL.path = `/${x.postId}`)
                              }
                            >
                              <FeelingImg
                                src={matchFeeling(x.todayFeeling, 0)}
                              />
                            </Link>
                          </>
                        )
                      }
                    })}
                    <CheckToday />
                  </Day>
                )
              }
            })}
        </tr>,
      )
    }
    return result
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          friendId
            ? `${API_URL}/post/find-user-and-month/${friendId}/${today.format(
                'MM',
              )}`
            : `${API_URL}/post/find-user-and-month/${userId}/${today.format(
                'MM',
              )}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          },
        )
        setTodaies(res.data.result.postInfoDtos)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [today.format('MM')])

  return (
    <GreenComponentWrapper>
      <CalenderHeader>
        <Menu />
        <DateWrapper>
          <img
            src="img/icons/calendar_icon_left.png"
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, 'month'))
            }}
          />
          <Title>{today.format('YYYY년 MM월')}</Title>
          <img
            src="img/icons/calendar_icon_right.png"
            onClick={() => {
              setMoment(getMoment.clone().add(1, 'month'))
            }}
          />
        </DateWrapper>
      </CalenderHeader>
      <CalenderWrapper>
        <Week>
          <DayOfWeek>일</DayOfWeek>
          <DayOfWeek>월</DayOfWeek>
          <DayOfWeek>화</DayOfWeek>
          <DayOfWeek>수</DayOfWeek>
          <DayOfWeek>목</DayOfWeek>
          <DayOfWeek>금</DayOfWeek>
          <DayOfWeek>토</DayOfWeek>
        </Week>
        <Month>
          <Dates>{calendarArr()}</Dates>
        </Month>
      </CalenderWrapper>
      <Footer />
    </GreenComponentWrapper>
  )
}

export default Calender
