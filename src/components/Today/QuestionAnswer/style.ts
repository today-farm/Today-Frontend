import styled from 'styled-components'
import { Input } from '../../../style/CommonStyles'

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 342px;
  min-height: 268px;
  padding: 30px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 2px solid var(--light-green);
  border-radius: 30px;
  background-color: #fff;
`

export const Question = styled.div`
  padding: 20px 0 20px 0;
  font-size: var(--big);
`

export const ContentInput = styled(Input)`
  margin: 20px 0;
  text-align: center;
`
