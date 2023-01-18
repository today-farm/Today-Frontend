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
