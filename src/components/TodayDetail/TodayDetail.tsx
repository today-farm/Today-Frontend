import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, IMG_URL } from '../../constant'
import { matchFeeling } from '../util/usefulFunctions'
import { ActiveButton, ComponentWrapper } from './../../style/CommonStyles'
import {
  Header,
  Line,
  ContentWrapper,
  Content,
  Question,
  Answer,
  Img,
  Video,
  DeleteButton,
  FeelingImg,
} from './style'
import { Title } from '../Header/style'
import { PRIVATE_ROUTE } from '../../Route'

export default function TodayDetail() {
  const [cookies] = useCookies(['accessToken', 'password'])
  const [postQuestions, setPostQuestions] = useState<string[]>([])
  const [creationDay, setCreationDay] = useState('')
  const [todayFeeling, setTodayFeeling] = useState('')
  const [year, month, day] = creationDay.split('-')
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const params = useParams()
  const todayId = params.todayId

  useEffect(() => {
    axios
      .get(`${API_URL}/post/find-one/${todayId}/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        setPostQuestions(res.data.result.postQuestions)
        setCreationDay(res.data.result.creationDay)
        setTodayFeeling(res.data.result.todayFeeling)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const deleteToday = () => {
    axios
      .delete(`${API_URL}/post/delete/${todayId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        navigate(PRIVATE_ROUTE.CALENDAR.path)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <ComponentWrapper>
      <Header>
        <Title>
          {year}년 {month}월 {day}일
        </Title>
        <Link to={PRIVATE_ROUTE.CALENDAR.path}>
          <img src="/img/icons/icon_close.png" />
        </Link>
      </Header>
      <ContentWrapper>
        <FeelingImg src={matchFeeling(todayFeeling, 1)} />
        {postQuestions.map((today: any) => {
          return (
            <Content>
              <Line />
              <Question>{today.question}</Question>
              <Answer>{today.content}</Answer>
              {today.postImgUrls.map((img: any) => {
                return <Img src={`${IMG_URL}${img.postImgUrl}`} />
              })}
              {today.postVideoUrls.map((video: any) => {
                return (
                  <Video controls src={`${IMG_URL}${video.postVideoUrl}`} />
                )
              })}
            </Content>
          )
        })}
      </ContentWrapper>
      <Link to={(PRIVATE_ROUTE.TODAY_UPDATE.path = `/update/${todayId}`)}>
        <ActiveButton>기록 수정</ActiveButton>
      </Link>
      <DeleteButton onClick={deleteToday}>기록 삭제</DeleteButton>
    </ComponentWrapper>
  )
}
