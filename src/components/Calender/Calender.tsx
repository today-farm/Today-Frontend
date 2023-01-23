import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import Header from '../Header/Header'
import { GreenComponentWrapper } from '../../style/CommonStyles'
import {
  CalenderHeader,
  DateWrapper,
  // Menu,
  CalenderWrapper,
  Month,
  Dates,
  Week,
  DayOfWeek,
  CheckToday,
  Day,
} from './style'
import { Title } from '../../style/CommonStyles'
import moment from 'moment'
// import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Menu from '../Menu/Menu'
import Footer from '../Footer/Footer'
function Calender() {
  const [cookies] = useCookies(['accessToken', 'password'])
  const [todaies, setTodaies] = useState<string[]>([])
  let userId: string | null = localStorage.getItem('userId')
  const [getMoment, setMoment] = useState(moment())
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
            .map((data, index) => {
              let days = today
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(index, 'day')
              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                return (
                  <Day key={index}>
                    <span
                      style={{
                        padding: '0 6px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--light-green)',
                      }}
                    >
                      {days.format('D')}
                    </span>
                    {/* <Link> */}
                    <CheckToday />
                    {/* </Link> */}
                  </Day>
                )
              } else if (days.format('MM') !== today.format('MM')) {
                return (
                  <Day key={index}>
                    <span style={{ opacity: 0.2 }}>{days.format('D')}</span>
                    {/* <Link> */}
                    <CheckToday style={{ opacity: 0.2 }} />
                    {/* </Link> */}
                  </Day>
                )
              } else {
                return (
                  <Day key={index}>
                    <span>{days.format('D')}</span>
                    {/* <Link> */}
                    <CheckToday />
                    {/* </Link> */}
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
          `post/find-user-and-month/${userId}/${today.format('MM')}`,
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
  }, [])

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
