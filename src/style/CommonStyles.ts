import styled from 'styled-components'
interface Inputs {
  height?: number
}

export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`

export const GreenComponentWrapper = styled(ComponentWrapper)`
  width: 100vw;
  background-color: var(--more-light-green);
`

export const Title = styled.div`
  font-size: var(--more-big);
  text-align: center;
  margin: 0 20px;
`

export const NonActiveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 342px;
  height: 48px;
  border: 2px solid var(--light-gray);
  border-radius: 24px;
  background-color: transparent;
  font-size: var(--big);
  color: var(--light-gray);
  cursor: pointer;
`

export const ActiveButton = styled(NonActiveButton)`
  border: none;
  background-color: var(--green);
  color: #fff;
`

export const NonActiveSmallButton = styled.button`
  width: 75px;
  height: 36px;
  border-radius: 16px;
  border: 2px solid var(--light-green);
  background-color: transparent;
  color: var(--green);
  font-size: var(--small);
  cursor: pointer;
`

export const ActiveSmallButton = styled.button`
  width: 75px;
  height: 36px;
  border-radius: 16px;
  border: none;
  background-color: var(--green);
  color: #fff;
  font-size: var(--small);
  cursor: pointer;
`

export const BottomButton = styled(NonActiveButton)`
  position: absolute;
  bottom: 50px;
`

export const ActiveBottomButton = styled(ActiveButton)`
  position: absolute;
  bottom: 50px;
`

export const SmallLinkButton = styled.div`
  border-bottom: 1px solid var(--mid-green);
  font-size: var(--small);
  color: var(--mid-green);
  margin: 30px 40px;
`

export const Inputs = styled.div<Inputs>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: ${(props?) => props.height}px;
  margin-bottom: 48px;
`

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  position: relative;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--light-gray);
  font-size: var(--small);
  line-height: 28px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    font-size: var(--mid);
    color: var(--light-gray);
  }
`

export const Label = styled.label`
  font-size: var(--small);
  color: var(--green);
`

export const Error = styled.div`
  color: var(--red);
  font-size: var(--more-small);
  line-height: 28px;
`

export const Success = styled.div`
  color: var(--blue);
  font-size: var(--more-small);
  line-height: 28px;
`
export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(29, 31, 0, 0.8);
`

export const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  padding-bottom: 30px;
  border-radius: 30px;
  background-color: #fff;
`

export const CloseButton = styled.img`
  align-self: flex-end;
  margin-bottom: 10px;
  cursor: pointer;
`

export const ClearButton = styled.img`
  position: absolute;
  top: 20px;
  right: 0;
  cursor: pointer;
`
