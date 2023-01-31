import styled from 'styled-components'
import {
  Input,
  ActiveButton,
  NonActiveButton,
} from '../../../style/CommonStyles'

export const Line = styled.div`
  color: var(--light-gray);
  margin: 5px;
`

export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`
export const DoubleCheckButton = styled(ActiveButton)`
  width: 186px;
  margin-top: 48px;
`

export const NonDoubleCheckButton = styled(NonActiveButton)`
  width: 186px;
  margin-top: 48px;
`

export const NickNameInput = styled(Input)`
  width: 70%;
  text-align: center;
`
