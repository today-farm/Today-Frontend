import styled from 'styled-components'
import { ActiveButton } from '../../../style/CommonStyles'

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(29, 31, 0, 0.8);
`

export const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 342px;
  height: 288px;
  padding: 25px;
  padding-bottom: 30px;
  border-radius: 30px;
  background-color: #fff;
`

export const CloseButton = styled.img`
  align-self: flex-end;
  margin-bottom: 10px;
`

export const InfoMsg = styled.div`
  margin: 30px 0;
  font-size: var(--mid);
  text-align: center;
`

export const PasswordButton = styled(ActiveButton)`
  width: 286px;
`
