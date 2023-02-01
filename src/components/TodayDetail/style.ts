import styled from 'styled-components'
import { NonActiveButton } from '../../style/CommonStyles'

export const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 42px 15px 36px 30px;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--light-green);
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70vh;
  padding: 0 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const Question = styled.div`
  margin: 28px 0 16px 0;
  font-size: var(--big);
`

export const Answer = styled.div`
  margin-bottom: 16px;
  font-size: var(--mid);
`

export const Img = styled.img`
  width: 342px;
  height: 192px;
  margin-bottom: 16px;
  border-radius: 20px;
  object-fit: fill;
`

export const Video = styled.video`
  width: 342px;
  height: 192px;
  border-radius: 20px;
  object-fit: fill;
`
export const DeleteButton = styled(NonActiveButton)`
  margin-top: 16px;
  border: 2px solid var(--red);
  color: var(--red);
`

export const FeelingImg = styled.img`
  width: 140px;
  height: 110px;
  margin-bottom: 36px;
`
