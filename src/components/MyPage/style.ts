import styled from 'styled-components'

export const MyPageWrapper = styled.div`
  width: 340px;
  height: 668px;
  border-radius: 30px;
  border: 2px solid var(--light-green);
  background-color: #fff;
`

export const Profile = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  border-bottom: 1px solid var(--light-gray);
`

export const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`

export const UserInfo = styled.div`
  padding-right: 15px;
`

export const Nickname = styled.p`
  font-size: var(--mid);
  margin-bottom: 8px;
`

export const Email = styled.p`
  font-size: var(--more-small);
`

export const MyPageMenu = styled.ul``

export const Menu = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 25px;
  font-size: var(--mid);
  border-bottom: 1px solid var(--light-gray);
`

export const LogoutButton = styled(Menu)`
  color: var(--red);
  border-bottom: none;
`

export const LinkButton = styled.img`
  cursor: pointer;
`
