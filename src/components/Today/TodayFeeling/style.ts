import styled from 'styled-components'

interface FeelingProps {
  width: number | undefined
  opacity: number | undefined
}

export const FeelingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 342px;
  height: 584px;
  padding: 50px 0;
  margin-bottom: 35px;
  border: 2px solid var(--light-green);
  border-radius: 30px;
  background-color: #fff;
`

export const Title = styled.div`
  font-size: var(--mid);
  line-height: 24px;
  text-align: center;
  margin-bottom: 48px;
`

export const Feelings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 282px;
  & :nth-child(1) {
    padding-left: 40px;
  }
  & :nth-child(2) {
    padding-right: 40px;
  }
  & :nth-child(9) {
    padding-left: 40px;
  }
  & :nth-child(10) {
    padding-right: 40px;
  }
`

export const Feeling = styled.img`
  margin: 7px;
  opacity: 0.3;
  margin-bottom: 28px;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`
