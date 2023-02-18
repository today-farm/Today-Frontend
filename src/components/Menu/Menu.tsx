import React from 'react'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTE } from '../../Route'
import { MenuWrapper } from './style'

function Menu() {
  return (
    <MenuWrapper>
      <Link to={PRIVATE_ROUTE.FARM.path}>
        <img src="img/logo.png" />
      </Link>
      <Link to={PRIVATE_ROUTE.MYPAGE.path}>
        <img src="img/icons/icon_mypage.png" />
      </Link>
    </MenuWrapper>
  )
}

export default Menu
