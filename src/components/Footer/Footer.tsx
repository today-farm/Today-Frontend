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
          <img src="/img/icons/icon_farm.png" />
        </FarmIcon>
      </FarmIconWrapper>
      <IconWrapper>
        <Icon src="/img/icons/icon_calendar.png" />
        <Icon src="/img/icons/icon_friends2.png" />
      </IconWrapper>
    </FooterWrapper>
  )
}

export default Footer
