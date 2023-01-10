import React from 'react';
import { HeaderWrapper, BackIcon, Title } from './style';

interface Iprops {
  title: string;
}

export default function Header(props: Iprops) {
  return (
    <HeaderWrapper>
      <BackIcon alt='icon_back' src='/img/icon_back.png' />
      <Title>{props.title}</Title>
    </HeaderWrapper>
  );
}
