import React from 'react'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTE } from '../../Route'
import { MenuWrapper } from './style'

function Menu() {
  return (
    <MenuWrapper>
      <span>로고</span>
      <Link to={PRIVATE_ROUTE.MYPAGE.path}>
        <img src="img/icons/icon_mypage.png" />
      </Link>
    </MenuWrapper>
  )
}

export default Menu
