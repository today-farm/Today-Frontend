import styled from 'styled-components'

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
  /* margin-bottom: 20px;
  margin-left: 20px; */
`

export const TextBox = styled.img`
  position: absolute;
  right: 160px;
  bottom: 30px;
  width: 220px;
`

export const Text = styled.span`
  position: absolute;
  right: 192px;
  bottom: 37px;
  font-size: var(--mid);
  color: var(--dark-green);
`
