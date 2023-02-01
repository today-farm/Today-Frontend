import styled from 'styled-components'

export const RequestUsersWrapper = styled.div`
  width: 100%;
  height: 476px;
  margin: 22px 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
`

export const AcceptButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: var(--green);
  cursor: pointer;
`
export const RefuseButton = styled(AcceptButton)`
  border: 2px solid var(--mid-green);
  background-color: transparent;
`
