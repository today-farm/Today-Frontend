import styled from 'styled-components'
import { ClearButton } from '../../../style/CommonStyles'
import '../../../style/GlobalStyle'

export const EmailInput = styled.div`
  display: flex;
  justify-content: space-between;
  & input {
    width: 74%;
  }
`

export const EmailAuthInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  & input {
    width: 74%;
  }
`
export const SignUpClearButton = styled(ClearButton)`
  right: 85px;
`
