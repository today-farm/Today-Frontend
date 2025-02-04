import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 50px 20px 20px 20px;
`

export const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 342px;
  height: 492px;
  padding: 30px 10px;
  margin-top: 24px;
  background-color: #fff;
  border: 2px solid var(--light-green);
  border-radius: 30px;
`
export const Button = styled.button`
  width: 268px;
  height: 48px;
  border-radius: 30px;
  border: 2px solid var(--mid-green);
  background-color: transparent;
  font-size: var(--big);
  color: var(--green);
  cursor: pointer;
`

export const ActiveButton = styled(Button)`
  border: none;
  background-color: var(--green);
  color: #fff;
`

export const FriendRequestWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const FriendRequest = styled.div`
  border-bottom: 1px solid var(--green);
  color: var(--green);
  font-size: var(--small);
  margin: 20px 3px;
`
export const FriendRequestNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--green);
  color: #fff;
`
export const FindFriendButton = styled.img`
  cursor: pointer;
`

export const FriendsProfilesWrapper = styled.div`
  width: 100%;
  height: 370px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
`

export const FriendProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
`

export const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 6px;
  border-radius: 50%;
`
export const SmallButton = styled.button`
  width: 97px;
  height: 36px;
  border-radius: 18px;
  border: none;
  background-color: var(--green);
  color: #fff;
  font-size: var(--mid);
  cursor: pointer;
`

export const DeleteButton = styled(SmallButton)`
  border: 2px solid var(--mid-green);
  background-color: transparent;
  color: var(--green);
`
export const NickName = styled.span`
  width: 50%;
  font-size: var(--mid);
`
export const SmallLineButton = styled(SmallButton)`
  border: 2px solid var(--mid-green);
  color: var(--green);
  background-color: transparent;
`
