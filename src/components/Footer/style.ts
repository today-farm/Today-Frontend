import styled from 'styled-components'
interface Itextbox {
  img: string
}

export const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`

export const IconWrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: var(--light-green);
  display: flex;
  align-items: center;
  z-index: 10;
`

export const Icon = styled.img`
  margin-left: 60px;
`

export const FarmIconWrapper = styled.div`
  position: absolute;
  right: 30px;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 80px;
  border-radius: 0 0 150px 150px;
  background-color: var(--more-light-green);
`

export const FarmIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  margin-bottom: 40px;
  border-radius: 50%;
  background-color: var(--light-green);
`

export const RabbitImg = styled.img`
  margin-bottom: 40px;
`

export const TextWrapper = styled.div`
  position: relative;
`

export const TextBox = styled.div<Itextbox>`
  position: absolute;
  right: 146px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 30px;
  width: 234px;
  height: 40px;
  background-image: url(${(props) => props.img});
`

export const Text = styled.span`
  font-size: var(--mid);
  color: var(--dark-green);
`
