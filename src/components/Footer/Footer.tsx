import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { checkPostToday } from './../../api'
import { API_URL } from '../../constant'
import {
  FooterWrapper,
  IconWrapper,
  FarmIconWrapper,
  FarmIcon,
  Icon,
  RabbitImg,
  TextBox,
  TextWrapper,
  Text,
} from './style'
import CanPostInfoModal from './CanPostInfoModal/CanPostInfoModal'
import { PRIVATE_ROUTE } from '../../Route'
interface Iprops {
  main?: boolean
}

export default function Footer(props: Iprops) {
  const [cookies] = useCookies(['accessToken'])
  const friendId = localStorage.getItem('friendId')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { isLoading, data } = useQuery<boolean>('todayPost', () =>
    checkPostToday(cookies.accessToken),
  )

  const backMyFarm = () => {
    localStorage.removeItem('friendId')
  }

  return (
    <FooterWrapper>
      {openModal && <CanPostInfoModal setOpenModal={setOpenModal} />}
      {props.main && (
        <TextWrapper>
          {data === true ? (
            <TextBox img="/img/Union.png">
              <Text>오늘 하루는 어땠나요?</Text>
            </TextBox>
          ) : (
            <TextBox img={'/img/longUnion.png'}>
              <Text>오늘은 이미 기록을 남겼어요!</Text>
            </TextBox>
          )}
        </TextWrapper>
      )}
      <FarmIconWrapper>
        {props.main ? (
          data === true ? (
            <Link to={PRIVATE_ROUTE.TODAY_POST.path}>
              <RabbitImg src="/img/character/mainRabbit.png" />
            </Link>
          ) : (
            <RabbitImg
              src="/img/character/mainRabbit2.png"
              onClick={() => {
                setOpenModal(true)
              }}
            />
          )
        ) : (
          <FarmIcon>
            <Link to={PRIVATE_ROUTE.FARM.path}>
              <img src="/img/icons/icon_farm.png" />
            </Link>
          </FarmIcon>
        )}
      </FarmIconWrapper>
      <IconWrapper>
        <Link to={PRIVATE_ROUTE.CALENDAR.path}>
          <Icon src="/img/icons/icon_calendar.png" />
        </Link>
        {friendId ? (
          <Link to={PRIVATE_ROUTE.FARM.path}>
            <Icon src="/img/icons/icon_home.png" onClick={backMyFarm} />
          </Link>
        ) : (
          <Link to={PRIVATE_ROUTE.FRIEND.path}>
            <Icon src="/img/icons/icon_friends2.png" />
          </Link>
        )}
      </IconWrapper>
    </FooterWrapper>
  )
}
