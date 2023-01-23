import React from 'react'
import {
  FooterWrapper,
  IconWrapper,
  FarmIconWrapper,
  FarmIcon,
  Icon,
} from './style'
function Footer() {
  return (
    <FooterWrapper>
      <FarmIconWrapper>
        <FarmIcon>
          <img src="/img/icon_farm.png" />
        </FarmIcon>
      </FarmIconWrapper>
      <IconWrapper>
        <Icon src="/img/icon_calendar.png" />
        <Icon src="/img/icon_friends2.png" />
      </IconWrapper>
    </FooterWrapper>
  )
}

export default Footer
