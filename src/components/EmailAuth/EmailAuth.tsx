import React from 'react';
import { ModalWrapper } from './style';

interface Iprops {
  emailAuthClose: () => void;
}

function EmailAuth(props: Iprops) {
  const handleEmailAuth = () => {};

  return (
    <ModalWrapper>
      <button onClick={props.emailAuthClose}>X</button>
      <input type='text' placeholder='Email-Auth' />
      <button onClick={handleEmailAuth}>인증하기</button>
    </ModalWrapper>
  );
}

export default EmailAuth;
