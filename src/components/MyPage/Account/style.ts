import styled from 'styled-components';
import {
  Input,
  NonActiveButton,
} from '../../../style/CommonStyles';

export const Line = styled.div`
  color: var(--light-gray);
  margin: 5px;
`;

export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 36px;
  margin: 10px 0 20px 0;
  border-radius: 18px;
  border: 2px solid var(--light-green);
  cursor: pointer;
  & img {
    cursor: pointer;
  }
`;
export const DoubleCheckButton = styled(NonActiveButton)`
  width: 186px;
  margin-top: 48px;
`;

export const NickNameInput = styled(Input)`
  width: 70%;
  text-align: center;
`;


