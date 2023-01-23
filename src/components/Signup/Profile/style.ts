import styled from 'styled-components'
import {
  ComponentWrapper,
  Input,
  NonActiveButton,
} from '../../../style/CommonStyles'

// export const ProfileComponentWrapper = styled(ComponentWrapper)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100vw;
//   height: 100vh;
//   background-color: var(--more-light-green);
// `;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 323px;
  height: 176px;
  margin-top: 48px;
  line-height: 34px;
`

export const Logo = styled.div`
  align-self: flex-start;
`

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 342px;
  height: 376px;
  margin: 24px 0 110px 0;
  background-color: #fff;
  border-radius: 30px;
  border: 2px solid var(--light-green);
`

export const NickNameInput = styled(Input)`
  width: 80%;
  ::placeholder {
    text-align: center;
  }
`

export const DoubleCheckButton = styled(NonActiveButton)`
  width: 186px;
  margin-top: 48px;
`

export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`
