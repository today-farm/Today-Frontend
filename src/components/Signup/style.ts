import styled from 'styled-components';
import '../../style/GlobalStyle';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 50px 20px 45px 20px;
`;

export const BackIcon = styled.img`
  /* margin-right: auto; */
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 215px;
  margin-bottom: 48px;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--light-gray);
  font-size: var(--small);
  line-height: var(--small-lineHeight-2);

  ::placeholder {
    color: var(--light-gray);
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: var(--small);
  color: var(--green);
`;

export const EmailInput = styled.div`
  display: flex;
  justify-content: space-between;
`;
