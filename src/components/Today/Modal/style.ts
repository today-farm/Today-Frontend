import styled from 'styled-components'
import {
  ActiveButton,
  NonActiveButton,
  ModalWrapper,
} from './../../../style/CommonStyles'

export const Buttons = styled.div`
  display: flex;
`

export const SuccessButton = styled(ActiveButton)`
  width: 139px;
  margin-right: 5px;
`
export const BackButton = styled(NonActiveButton)`
  width: 139px;
  margin-left: 5px;
  border: 2px solid var(--light-green);
  color: var(--green);
`
export const TodayModalWrapper = styled(ModalWrapper)`
  width: 342px;
  height: 288px;
  justify-content: center;
`
