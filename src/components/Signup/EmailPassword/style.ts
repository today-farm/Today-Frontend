import styled from 'styled-components';
import '../../../style/GlobalStyle';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 50px 20px 45px 20px;
`;

export const BackIcon = styled.img``;

export const EmailInput = styled.div`
  display: flex;
  justify-content: space-between;
  & input {
    width: 74%;
  }
`;

export const EmailAuthInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  & input {
    width: 74%;
  }
`;
