import styled from 'styled-components'
import { ModalWrapper } from '../../../style/CommonStyles'

export const FriendModalWrapper = styled(ModalWrapper)`
  width: 342px;
  height: 700px;
`
export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 286px;
  height: 48px;
  margin-top: 36px;
  padding: 5px 10px;
  border: 2px solid var(--mid-green);
  border-radius: 30px;
  /* font-size: var(--small); */
`
export const Input = styled.input`
  width: 80%;
  padding: 5px;
  border: none;
  background-color: transparent;
  font-size: var(--mid);
  &:focus {
    outline: none;
  }
  ::placeholder {
    font-size: var(--mid);
    color: var(--light-gray);
  }
`
export const Users = styled.div`
  height: 50vh;
  overflow-y: scroll;
  padding: 0 10px;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
`
