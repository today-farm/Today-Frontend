import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-size: var(--more-big);
`;

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
`;

export const NonActiveSmallButton = styled.button`
  width: 75px;
  height: 28px;
  border-radius: 16px;
  border: 2px solid var(--light-green);
  background-color: transparent;
  color: var(--green);
  font-size: var(--small);
`;

export const SmallLinkButton = styled.div`
  border-bottom: 1px solid var(--mid-green);
  font-size: var(--small);
  color: var(--mid-green);
  margin-top: 24px;
`;
