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

export const ContentInput = styled.textarea`
  background-attachment: local;
  background-image: linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(
      white,
      white 30px,
      var(--light-gray) 30px,
      var(--light-gray) 31px,
      white 31px
    );
  line-height: 31px;
  width: 100%;
  padding: 0 10px;
  margin: 20px 0 15px 0;
  border: none;
  resize: none;
  font-size: var(--mid);
  text-align: center;
  &:focus {
    outline: none;
  }
  ::placeholder {
    font-size: var(--mid);
    color: var(--light-gray);
  }
`

export const PreviewImg = styled.img`
  width: 286px;
  height: 190px;
  border-radius: 20px;
`
