import styled from 'styled-components'
import { Label } from '../../../style/CommonStyles'

export const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 93%;
  cursor: pointer;
`

export const FileInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 36px;
  border: 2px solid var(--mid-green);
  border-radius: 24px;
  cursor: pointer;
  & img {
    margin-right: 5px;
  }
`

export const InputLabel = styled(Label)`
  cursor: pointer;
`
