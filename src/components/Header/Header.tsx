import React from 'react';
import { HeaderWrapper, BackIcon, Title } from './style';
import { useNavigate } from "react-router-dom";
interface Iprops {
  title: string;
}

export default function Header(props: Iprops) {
  let navigate = useNavigate();
  const handleClick = () =>{
    navigate(-1);
  }
  return (
    <HeaderWrapper>
      <BackIcon alt='icon_back' src='/img/icon_back.png' onClick={handleClick}/>
      <Title>{props.title}</Title>
    </HeaderWrapper>
  );
}
