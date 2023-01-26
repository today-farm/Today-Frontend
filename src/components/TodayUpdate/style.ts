import styled from 'styled-components'

export const Contents = styled.div`
  height: 68vh;
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

export const SecretWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 342px;
  margin-top: 20px;
  margin-bottom: 40px;
`

export const OpenButton = styled.button`
  height: 36px;
  border: none;
  border-radius: 18px;
  margin-left: 7px;
  background-color: var(--mid-green);
  color: var(--dark-green);
  font-size: var(--small);
  cursor: pointer;
`

export const NonActiveButton = styled(OpenButton)`
  padding: 10px;
  border: 2px solid var(--light-green);
  background-color: #fff;
  color: var(--green);
`
