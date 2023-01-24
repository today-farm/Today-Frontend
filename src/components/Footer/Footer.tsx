import React from 'react'
import { Link } from 'react-router-dom'
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
interface Iprops {
  main?: boolean
}
function Footer(props: Iprops) {
  return (
    <FooterWrapper>
      {props.main && (
        <TextWrapper>
          <TextBox src="/img/Union.png" />
          <Text>오늘 하루는 어땠나요?</Text>
        </TextWrapper>
      )}
      <FarmIconWrapper>
        {props.main ? (
          <Link to="/post">
            <RabbitImg src="/img/character/mainRabbit.png" />
          </Link>
        ) : (
          <FarmIcon>
            <Link to="/">
              <img src="/img/icons/icon_farm.png" />
            </Link>
          </FarmIcon>
        )}
      </FarmIconWrapper>
      <IconWrapper>
        <Link to="/calendar">
          <Icon src="/img/icons/icon_calendar.png" />
        </Link>
        <Icon src="/img/icons/icon_friends2.png" />
      </IconWrapper>
    </FooterWrapper>
  )
}

export default Footer
